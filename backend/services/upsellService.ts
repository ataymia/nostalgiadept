/**
 * Upsell Service (Backend)
 * Backend service implementing the checkout upsell selection algorithm
 */

import type { Product, ProductCategory, ProductSubcategory } from '../models/product';
import { getAllProducts, getCheckoutAddons as getCheckoutAddonProducts } from './productService';

/**
 * Upsell context - determines which limit to use
 */
export type UpsellContext = 'cart' | 'checkout';

/**
 * Relevance rule for scoring upsell candidates
 */
export interface RelevanceRule {
  cartCategories: ProductCategory[];
  upsellSubcategories: ProductSubcategory[];
  keywords?: string[];
  weight: number;
}

/**
 * Upsell configuration
 */
export interface UpsellConfig {
  maxUpsellCart: number;
  maxUpsellCheckout: number;
  cheapBandDelta: number;
  enableUpsells: boolean;
  relevanceRules: RelevanceRule[];
}

/**
 * Upsell candidate with scoring
 */
export interface UpsellCandidate {
  product: Product;
  relevanceScore: number;
  effectivePrice: number;
}

/**
 * Default relevance rules based on the Nostalgia Dept spec
 */
const defaultRelevanceRules: RelevanceRule[] = [
  {
    cartCategories: ['vhs-analog-corner'],
    upsellSubcategories: ['mini-snacks', 'tiny-toys-capsules'],
    keywords: ['vhs', 'tape', 'movie night', 'rewind'],
    weight: 2,
  },
  {
    cartCategories: ['candy-snacks-drinks'],
    upsellSubcategories: ['mini-snacks'],
    weight: 2,
  },
  {
    cartCategories: ['stickers-stationery-school'],
    upsellSubcategories: ['stickers-pins'],
    keywords: ['sticker', 'magnet', 'pen', 'eraser'],
    weight: 2,
  },
  {
    cartCategories: ['toys-games-fidgets'],
    upsellSubcategories: ['tiny-toys-capsules'],
    weight: 2,
  },
  {
    cartCategories: ['pocket-tech-virtual-pets'],
    upsellSubcategories: ['tiny-toys-capsules'],
    weight: 2,
  },
  {
    cartCategories: ['mystery-subscription-boxes'],
    upsellSubcategories: ['mini-snacks', 'tiny-toys-capsules', 'stickers-pins'],
    weight: 1,
  },
];

/**
 * Default upsell configuration
 */
const defaultConfig: UpsellConfig = {
  maxUpsellCart: parseInt(process.env.MAX_UPSELL_CART || '5', 10),
  maxUpsellCheckout: parseInt(process.env.MAX_UPSELL_CHECKOUT || '3', 10),
  cheapBandDelta: parseFloat(process.env.CHEAP_BAND_DELTA || '3.00'),
  enableUpsells: process.env.ENABLE_UPSELLS !== 'false',
  relevanceRules: defaultRelevanceRules,
};

/**
 * Check if a product matches any keywords
 */
function matchesKeywords(product: Product, keywords?: string[]): boolean {
  if (!keywords || keywords.length === 0) return false;
  
  const searchText = `${product.name} ${product.descriptionShort || ''} ${product.descriptionLong || ''}`.toLowerCase();
  return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
}

/**
 * Calculate relevance score for a candidate product
 */
function calculateRelevanceScore(
  candidate: Product,
  cartCategories: Set<ProductCategory>,
  rules: RelevanceRule[]
): number {
  let score = 0;

  for (const rule of rules) {
    const cartMatches = rule.cartCategories.some(cat => cartCategories.has(cat));
    
    if (cartMatches) {
      if (rule.upsellSubcategories.includes(candidate.subcategory)) {
        score += rule.weight;
      }
      
      if (matchesKeywords(candidate, rule.keywords)) {
        score += 1;
      }
    }
  }

  return score;
}

/**
 * Fisher-Yates shuffle
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
 * Get upsell candidates for cart/checkout
 * 
 * Algorithm:
 * 1. Get all products where isCheckoutAddon = true and isActive = true
 * 2. Exclude items already in cart
 * 3. Calculate relevance scores based on cart categories
 * 4. Sort by price ascending to find minimum
 * 5. Define cheap band (price <= minPrice + cheapBandDelta)
 * 6. Select from cheap band first using relevance, then fill from rest
 * 7. Return up to N items based on context
 */
export function getCheckoutAddons(
  cartItems: Array<{ productId: string; category?: ProductCategory }>,
  context: UpsellContext,
  config: Partial<UpsellConfig> = {}
): Product[] {
  const cfg: UpsellConfig = { ...defaultConfig, ...config };
  
  if (!cfg.enableUpsells) {
    return [];
  }
  
  const allProducts = getAllProducts();
  const cartProductIds = new Set(cartItems.map(item => item.productId));
  
  // Get cart categories
  const cartCategories = new Set<ProductCategory>();
  for (const item of cartItems) {
    if (item.category) {
      cartCategories.add(item.category);
    } else {
      const product = allProducts.find(p => p.id === item.productId);
      if (product) {
        cartCategories.add(product.category);
      }
    }
  }
  
  // Filter to eligible candidates
  const eligible = getCheckoutAddonProducts().filter(p => !cartProductIds.has(p.id));
  
  if (eligible.length === 0) {
    return [];
  }
  
  // Create candidates with scores
  const candidates: UpsellCandidate[] = eligible.map(product => ({
    product,
    relevanceScore: calculateRelevanceScore(product, cartCategories, cfg.relevanceRules),
    effectivePrice: product.price,
  }));
  
  // Determine limit
  const limit = context === 'cart' ? cfg.maxUpsellCart : cfg.maxUpsellCheckout;
  
  // Find minimum price and cheap band
  const sortedByPrice = [...candidates].sort((a, b) => a.effectivePrice - b.effectivePrice);
  const minPrice = sortedByPrice[0].effectivePrice;
  const cheapBandThreshold = minPrice + cfg.cheapBandDelta;
  
  // Split into cheap band and rest
  const cheapBand = candidates.filter(c => c.effectivePrice <= cheapBandThreshold);
  const rest = candidates.filter(c => c.effectivePrice > cheapBandThreshold);
  
  // Sort cheap band by relevance (desc), then shuffle for variety
  cheapBand.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Select results
  const results: UpsellCandidate[] = [];
  
  if (cheapBand.length >= limit) {
    // Group by relevance and pick randomly within groups
    const byRelevance = new Map<number, UpsellCandidate[]>();
    for (const c of cheapBand) {
      const existing = byRelevance.get(c.relevanceScore) || [];
      existing.push(c);
      byRelevance.set(c.relevanceScore, existing);
    }
    
    const scores = Array.from(byRelevance.keys()).sort((a, b) => b - a);
    for (const score of scores) {
      const group = shuffleArray(byRelevance.get(score)!);
      for (const candidate of group) {
        if (results.length >= limit) break;
        results.push(candidate);
      }
      if (results.length >= limit) break;
    }
  } else {
    // Take all from cheap band, fill from rest
    results.push(...cheapBand);
    
    rest.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return a.effectivePrice - b.effectivePrice;
    });
    
    for (const candidate of rest) {
      if (results.length >= limit) break;
      results.push(candidate);
    }
  }
  
  return results.map(c => c.product);
}

/**
 * Get checkout addons for both cart and checkout pages
 */
export function getCheckoutAddonsForCart(
  cartItems: Array<{ productId: string; category?: ProductCategory }>,
  config: Partial<UpsellConfig> = {}
): { cartAddons: Product[]; checkoutAddons: Product[] } {
  return {
    cartAddons: getCheckoutAddons(cartItems, 'cart', config),
    checkoutAddons: getCheckoutAddons(cartItems, 'checkout', config),
  };
}
