/**
 * Upsell feature configuration
 * Configuration for the checkout upsell (Checkout Candy Lane) feature
 */

import type { ProductCategory } from '../types';

/**
 * Relevance rule mapping for upsell scoring.
 * Maps cart product categories to relevant upsell categories with weights.
 */
export interface RelevanceRule {
  /** Categories in cart that trigger this rule */
  cartCategories: ProductCategory[];
  /** Categories of upsell items that are relevant */
  upsellCategories: ProductCategory[];
  /** Weight/score boost for matching (higher = more relevant) */
  weight: number;
}

/**
 * Complete upsell configuration interface
 */
export interface UpsellConfig {
  /** Maximum number of upsell items to show on cart page */
  maxUpsellCart: number;
  /** Maximum number of upsell items to show on checkout page */
  maxUpsellCheckout: number;
  /** Price delta for cheap band (items within minPrice + delta are in cheap band) */
  cheapBandDelta: number;
  /** Master switch to enable/disable upsells */
  enableUpsells: boolean;
  /** Category filter for upsell-eligible products (if set, only these categories are considered) */
  upsellCategory?: string;
  /** Relevance rules for scoring upsell candidates based on cart contents */
  relevanceRules: RelevanceRule[];
}

/**
 * Default relevance rules based on product spec:
 * - VHS & Analog Corner items pair with 90s-collections
 * - Candy/snacks pair with regional-snacks
 * - Stickers pair with accessories
 * - Toys/Pocket Tech pair with toys
 */
const defaultRelevanceRules: RelevanceRule[] = [
  {
    // VHS & Analog Corner - relevant for 90s collections
    cartCategories: ['90s-collections'],
    upsellCategories: ['90s-collections', 'toys'],
    weight: 2,
  },
  {
    // Candy pairs with snacks and regional snacks
    cartCategories: ['snacks', 'regional-snacks'],
    upsellCategories: ['snacks', 'regional-snacks'],
    weight: 2,
  },
  {
    // Stickers pair with accessories
    cartCategories: ['accessories'],
    upsellCategories: ['accessories', 'toys'],
    weight: 2,
  },
  {
    // Toys/Pocket Tech pair with toys and 90s collections
    cartCategories: ['toys'],
    upsellCategories: ['toys', '90s-collections'],
    weight: 2,
  },
  {
    // Apparel cross-sell
    cartCategories: ['womens-apparel', 'mens-apparel'],
    upsellCategories: ['accessories', 'shoes'],
    weight: 1,
  },
  {
    // Shoes cross-sell with apparel
    cartCategories: ['shoes'],
    upsellCategories: ['accessories', 'womens-apparel', 'mens-apparel'],
    weight: 1,
  },
];

/**
 * Default upsell configuration
 * Values can be overridden via environment variables
 */
export const defaultUpsellConfig: UpsellConfig = {
  maxUpsellCart: parseInt(process.env.MAX_UPSELL_CART || '5', 10),
  maxUpsellCheckout: parseInt(process.env.MAX_UPSELL_CHECKOUT || '3', 10),
  cheapBandDelta: parseFloat(process.env.CHEAP_BAND_DELTA || '3.00'),
  enableUpsells: process.env.ENABLE_UPSELLS !== 'false',
  upsellCategory: process.env.UPSELL_CATEGORY || 'Checkout Candy Lane',
  relevanceRules: defaultRelevanceRules,
};

/**
 * Get upsell configuration, optionally merged with overrides
 */
export function getUpsellConfig(overrides?: Partial<UpsellConfig>): UpsellConfig {
  return {
    ...defaultUpsellConfig,
    ...overrides,
  };
}
