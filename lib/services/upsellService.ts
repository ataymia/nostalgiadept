/**
 * Upsell Service
 * Implements the selection algorithm for checkout upsell items (Checkout Candy Lane)
 */

import type { Product, ProductCategory, UpsellCandidate } from '../types';
import { mockProducts } from '../products';
import { getUpsellConfig, type UpsellConfig, type RelevanceRule } from '../config/upsell';

/**
 * Context for upsell requests - determines which limit to use
 */
export type UpsellContext = 'cart' | 'checkout';

/**
 * Get the effective price for a product (sale price if on sale, otherwise regular price)
 */
function getEffectivePrice(product: Product): number {
  return product.onSale && product.salePrice !== undefined
    ? product.salePrice
    : product.price;
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
      // Check if candidate's category is in the upsell categories for this rule
      if (rule.upsellCategories.includes(candidate.category)) {
        score += rule.weight;
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
 */
function filterUpsellCandidates(
  products: Product[],
  cartProductIds: string[],
  config: UpsellConfig
): Product[] {
  const cartIdSet = new Set(cartProductIds);

  return products.filter((product) => {
    // Exclude items already in cart
    if (cartIdSet.has(product.id)) {
      return false;
    }

    // Check if product is marked as checkout addon
    // If isCheckoutAddon is explicitly false, exclude it
    // If isCheckoutAddon is undefined or true, include it (backward compatibility)
    if (product.isCheckoutAddon === false) {
      return false;
    }

    // Must be in stock
    if (product.inventory <= 0) {
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

  // Find minimum price
  const minPrice = Math.min(...candidates.map((c) => c.effectivePrice));
  const cheapBandThreshold = minPrice + cheapBandDelta;

  // Split into cheap band and rest
  const cheapBand = candidates.filter((c) => c.effectivePrice <= cheapBandThreshold);
  const rest = candidates.filter((c) => c.effectivePrice > cheapBandThreshold);

  // Sort cheap band by relevance (desc), price (asc), random tiebreaker
  const sortedCheapBand = sortCandidates(cheapBand);
  
  // If cheap band has enough items, randomly pick N from it (considering relevance)
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
 * 1. Start with full product list
 * 2. Filter by is_checkout_addon and optionally category
 * 3. Exclude items already in cart
 * 4. Calculate relevance scores based on cart categories
 * 5. Sort by relevance (desc), price (asc), random tiebreaker
 * 6. Apply cheap band logic (items within minPrice + delta are prioritized)
 * 7. Return up to N items based on context
 * 
 * @param cartProductIds - IDs of products currently in cart
 * @param context - 'cart' or 'checkout' (affects limit)
 * @param limit - Optional override for number of items to return
 * @param products - Optional product list (defaults to mockProducts)
 * @param configOverrides - Optional config overrides
 * @returns Promise resolving to array of upsell candidates
 */
export async function getUpsellCandidates(
  cartProductIds: string[],
  context: UpsellContext,
  limit?: number,
  products?: Product[],
  configOverrides?: Partial<UpsellConfig>
): Promise<UpsellCandidate[]> {
  const config = getUpsellConfig(configOverrides);

  // Check if upsells are enabled
  if (!config.enableUpsells) {
    return [];
  }

  // Get product list (use provided or default to mock)
  const productList = products ?? mockProducts;

  // Determine limit based on context
  const effectiveLimit = limit ?? (context === 'cart' 
    ? config.maxUpsellCart 
    : config.maxUpsellCheckout);

  // Get categories from cart for relevance scoring
  const cartProducts = productList.filter((p) => cartProductIds.includes(p.id));
  const cartCategories = new Set<ProductCategory>(
    cartProducts.map((p) => p.category)
  );

  // Filter to eligible candidates
  const eligibleProducts = filterUpsellCandidates(productList, cartProductIds, config);

  // Create candidates with relevance scores
  const candidates: UpsellCandidate[] = eligibleProducts.map((product) => ({
    product,
    relevanceScore: calculateRelevanceScore(product, cartCategories, config.relevanceRules),
    effectivePrice: getEffectivePrice(product),
  }));

  // Apply selection algorithm
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
