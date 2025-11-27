/**
 * Upsell Service
 * Implements the selection algorithm for checkout upsell items (Checkout Candy Lane)
 */

import type { Product, ProductCategory, UpsellCandidate } from '../types';
import { products } from '../products';
import { getUpsellConfig, type UpsellConfig, type RelevanceRule } from '../config/upsell';

/**
 * Context for upsell requests - determines which limit to use
 */
export type UpsellContext = 'cart' | 'checkout';

/**
 * Get the effective price for a product (compareAtPrice logic or regular price)
 */
function getEffectivePrice(product: Product): number {
  return product.price;
}

/**
 * Check if a product matches any keywords in its name or description
 */
function matchesKeywords(product: Product, keywords?: string[]): boolean {
  if (!keywords || keywords.length === 0) return false;
  
  const searchText = `${product.name} ${product.descriptionShort} ${product.descriptionLong}`.toLowerCase();
  return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()));
}

/**
 * Calculate relevance score for a candidate product based on cart contents
 * Higher score = more relevant to cart items
 */
function calculateRelevanceScore(
  candidate: Product,
  cartCategories: Set<ProductCategory>,
  relevanceRules: RelevanceRule[]
): number {
  let score = 0;

  for (const rule of relevanceRules) {
    // Check if any cart category matches this rule's cart categories
    const cartMatches = rule.cartCategories.some((cat) => cartCategories.has(cat));
    
    if (cartMatches) {
      // Check if candidate's subcategory is in the upsell subcategories for this rule
      if (rule.upsellSubcategories.includes(candidate.subcategory)) {
        score += rule.weight;
      }
      
      // Check for keyword matches (bonus points)
      if (matchesKeywords(candidate, rule.keywords)) {
        score += 1;
      }
    }
  }

  return score;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * Used for randomizing selection within same-priority items
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Filter products to get upsell-eligible candidates
 * Only products with isCheckoutAddon = true and isActive = true are eligible
 */
function filterUpsellCandidates(
  productList: Product[],
  cartProductIds: string[]
): Product[] {
  const cartIdSet = new Set(cartProductIds);

  return productList.filter((product) => {
    // Must be a checkout addon
    if (!product.isCheckoutAddon) {
      return false;
    }
    
    // Must be active
    if (!product.isActive) {
      return false;
    }

    // Exclude items already in cart
    if (cartIdSet.has(product.id)) {
      return false;
    }

    // Must be in stock
    if (product.stock <= 0) {
      return false;
    }

    return true;
  });
}

/**
 * Sort candidates by relevance score (desc), then price (asc), with random tiebreaker
 */
function sortCandidates(candidates: UpsellCandidate[]): UpsellCandidate[] {
  // First shuffle to create random tiebreaker
  const shuffled = shuffleArray(candidates);

  // Then stable sort by relevance (desc) and price (asc)
  return shuffled.sort((a, b) => {
    // First compare by relevance score (descending)
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    // Then by effective price (ascending)
    return a.effectivePrice - b.effectivePrice;
  });
}

/**
 * Apply cheap band logic to select items
 * Items within minPrice + cheapBandDelta are prioritized, with relevance-first selection
 */
function selectFromCandidates(
  candidates: UpsellCandidate[],
  limit: number,
  cheapBandDelta: number
): UpsellCandidate[] {
  if (candidates.length === 0 || limit <= 0) {
    return [];
  }

  // Sort all candidates by price first to find the minimum
  const sortedByPrice = [...candidates].sort((a, b) => a.effectivePrice - b.effectivePrice);
  
  // Find minimum price
  const minPrice = sortedByPrice[0].effectivePrice;
  const cheapBandThreshold = minPrice + cheapBandDelta;

  // Split into cheap band and rest
  const cheapBand = candidates.filter((c) => c.effectivePrice <= cheapBandThreshold);
  const rest = candidates.filter((c) => c.effectivePrice > cheapBandThreshold);

  // Sort cheap band by relevance (desc), price (asc), random tiebreaker
  const sortedCheapBand = sortCandidates(cheapBand);
  
  // If cheap band has enough items, select from it using relevance ordering
  if (sortedCheapBand.length >= limit) {
    // Group by relevance score
    const byRelevance = new Map<number, UpsellCandidate[]>();
    for (const c of sortedCheapBand) {
      const existing = byRelevance.get(c.relevanceScore) || [];
      existing.push(c);
      byRelevance.set(c.relevanceScore, existing);
    }

    // Select by highest relevance first, then random within same relevance
    const result: UpsellCandidate[] = [];
    const scores = Array.from(byRelevance.keys()).sort((a, b) => b - a);

    for (const score of scores) {
      const group = shuffleArray(byRelevance.get(score)!);
      for (const candidate of group) {
        if (result.length >= limit) break;
        result.push(candidate);
      }
      if (result.length >= limit) break;
    }

    return result;
  }

  // Otherwise, take all from cheap band and continue with rest
  const result = [...sortedCheapBand];
  const sortedRest = sortCandidates(rest);

  for (const candidate of sortedRest) {
    if (result.length >= limit) break;
    result.push(candidate);
  }

  return result;
}

/**
 * Get upsell candidates for cart/checkout display
 * 
 * Algorithm:
 * 1. Start with all products where isCheckoutAddon = true and isActive = true
 * 2. Exclude items already in cart
 * 3. Calculate relevance scores based on cart categories
 * 4. Sort by price ascending
 * 5. Define cheap band (price <= minPrice + cheapBandDelta)
 * 6. Select from cheap band first using relevance, then fill from rest
 * 7. Return up to N items based on context (5 for cart, 3 for checkout)
 * 
 * @param cartProductIds - IDs of products currently in cart
 * @param context - 'cart' or 'checkout' (affects limit)
 * @param limit - Optional override for number of items to return
 * @param productList - Optional product list (defaults to products)
 * @param configOverrides - Optional config overrides
 * @returns Promise resolving to array of upsell candidates
 */
export async function getUpsellCandidates(
  cartProductIds: string[],
  context: UpsellContext,
  limit?: number,
  productList?: Product[],
  configOverrides?: Partial<UpsellConfig>
): Promise<UpsellCandidate[]> {
  const config = getUpsellConfig(configOverrides);

  // Check if upsells are enabled
  if (!config.enableUpsells) {
    return [];
  }

  // Get product list (use provided or default)
  const allProducts = productList ?? products;

  // Determine limit based on context
  const effectiveLimit = limit ?? (context === 'cart' 
    ? config.maxUpsellCart 
    : config.maxUpsellCheckout);

  // Get categories from cart for relevance scoring
  const cartProducts = allProducts.filter((p) => cartProductIds.includes(p.id));
  const cartCategories = new Set<ProductCategory>(
    cartProducts.map((p) => p.category)
  );

  // Filter to eligible candidates (isCheckoutAddon = true, isActive = true, in stock, not in cart)
  const eligibleProducts = filterUpsellCandidates(allProducts, cartProductIds);

  // Create candidates with relevance scores
  const candidates: UpsellCandidate[] = eligibleProducts.map((product) => ({
    product,
    relevanceScore: calculateRelevanceScore(product, cartCategories, config.relevanceRules),
    effectivePrice: getEffectivePrice(product),
  }));

  // Apply selection algorithm with cheap band logic
  const selected = selectFromCandidates(candidates, effectiveLimit, config.cheapBandDelta);

  return selected;
}

/**
 * Get upsell candidates as plain products (without scoring metadata)
 * Convenience wrapper for simpler use cases
 */
export async function getUpsellProducts(
  cartProductIds: string[],
  context: UpsellContext,
  limit?: number
): Promise<Product[]> {
  const candidates = await getUpsellCandidates(cartProductIds, context, limit);
  return candidates.map((c) => c.product);
}

/**
 * Get checkout addons for both cart and checkout pages
 * Returns two arrays for convenience
 */
export async function getCheckoutAddonsForCart(
  cartProductIds: string[],
  configOverrides?: Partial<UpsellConfig>
): Promise<{ cartAddons: Product[]; checkoutAddons: Product[] }> {
  const config = getUpsellConfig(configOverrides);
  
  const cartCandidates = await getUpsellCandidates(
    cartProductIds, 
    'cart', 
    config.maxUpsellCart,
    undefined,
    configOverrides
  );
  
  const checkoutCandidates = await getUpsellCandidates(
    cartProductIds, 
    'checkout', 
    config.maxUpsellCheckout,
    undefined,
    configOverrides
  );
  
  return {
    cartAddons: cartCandidates.map((c) => c.product),
    checkoutAddons: checkoutCandidates.map((c) => c.product),
  };
}
