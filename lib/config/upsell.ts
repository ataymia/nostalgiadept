/**
 * Upsell feature configuration
 * Configuration for the checkout upsell (Checkout Candy Lane) feature
 */

import type { ProductCategory, ProductSubcategory } from '../types';

/**
 * Relevance rule mapping for upsell scoring.
 * Maps cart product categories to relevant upsell subcategories with weights.
 */
export interface RelevanceRule {
  /** Categories in cart that trigger this rule */
  cartCategories: ProductCategory[];
  /** Subcategories of upsell items that are relevant */
  upsellSubcategories: ProductSubcategory[];
  /** Keywords in product name/description that boost relevance */
  keywords?: string[];
  /** Weight/score boost for matching (higher = more relevant) */
  weight: number;
}

/**
 * Relevance toggles for admin configuration
 */
export interface RelevanceToggles {
  biasSnacksWhenCartHasSnacks: boolean;
  biasVhsWhenCartHasVhs: boolean;
  biasStickersWhenCartHasStationery: boolean;
  biasToysWhenCartHasToys: boolean;
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
  /** Relevance toggles for admin UI */
  relevanceToggles: RelevanceToggles;
  /** Relevance rules for scoring upsell candidates based on cart contents */
  relevanceRules: RelevanceRule[];
}

/**
 * Default relevance rules based on the Nostalgia Dept spec:
 * - VHS & Analog Corner → prefer movie night add-ons
 * - Candy, Snacks & Drinks → prefer Mini Snacks add-ons
 * - Stickers, Stationery & School → prefer Stickers & Pins add-ons
 * - Toys, Games & Fidgets / Pocket Tech → prefer Tiny Toys & Capsules add-ons
 */
const defaultRelevanceRules: RelevanceRule[] = [
  {
    // VHS & Analog Corner - prefer movie night, snack, and capsule add-ons
    cartCategories: ['vhs-analog-corner'],
    upsellSubcategories: ['mini-snacks', 'tiny-toys-capsules'],
    keywords: ['vhs', 'tape', 'movie night', 'rewind'],
    weight: 2,
  },
  {
    // Candy, Snacks & Drinks - prefer Mini Snacks add-ons
    cartCategories: ['candy-snacks-drinks'],
    upsellSubcategories: ['mini-snacks'],
    weight: 2,
  },
  {
    // Stickers, Stationery & School - prefer Stickers & Pins add-ons
    cartCategories: ['stickers-stationery-school'],
    upsellSubcategories: ['stickers-pins'],
    keywords: ['sticker', 'magnet', 'pen', 'eraser'],
    weight: 2,
  },
  {
    // Toys, Games & Fidgets - prefer Tiny Toys & Capsules add-ons
    cartCategories: ['toys-games-fidgets'],
    upsellSubcategories: ['tiny-toys-capsules'],
    weight: 2,
  },
  {
    // Pocket Tech & Virtual Pets - prefer Tiny Toys & Capsules add-ons
    cartCategories: ['pocket-tech-virtual-pets'],
    upsellSubcategories: ['tiny-toys-capsules'],
    weight: 2,
  },
  {
    // Mystery & Subscription Boxes - prefer a mix of everything
    cartCategories: ['mystery-subscription-boxes'],
    upsellSubcategories: ['mini-snacks', 'tiny-toys-capsules', 'stickers-pins'],
    weight: 1,
  },
  {
    // Grow Kits & Room Décor - prefer stickers and small toys
    cartCategories: ['grow-kits-room-decor'],
    upsellSubcategories: ['stickers-pins', 'tiny-toys-capsules'],
    weight: 1,
  },
  {
    // Retro Apparel & Accessories - prefer pins and stickers
    cartCategories: ['retro-apparel-accessories'],
    upsellSubcategories: ['stickers-pins'],
    weight: 1,
  },
];

/**
 * Default relevance toggles
 */
const defaultRelevanceToggles: RelevanceToggles = {
  biasSnacksWhenCartHasSnacks: true,
  biasVhsWhenCartHasVhs: true,
  biasStickersWhenCartHasStationery: true,
  biasToysWhenCartHasToys: true,
};

/**
 * Parse and validate integer environment variable with bounds checking
 */
function parseIntEnv(value: string | undefined, defaultValue: number, min: number, max: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(min, Math.min(max, parsed));
}

/**
 * Parse and validate float environment variable with bounds checking
 */
function parseFloatEnv(value: string | undefined, defaultValue: number, min: number, max: number): number {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(min, Math.min(max, parsed));
}

/**
 * Default upsell configuration
 * Values can be overridden via environment variables with validation
 */
export const defaultUpsellConfig: UpsellConfig = {
  maxUpsellCart: parseIntEnv(process.env.MAX_UPSELL_CART, 5, 1, 20),
  maxUpsellCheckout: parseIntEnv(process.env.MAX_UPSELL_CHECKOUT, 3, 1, 10),
  cheapBandDelta: parseFloatEnv(process.env.CHEAP_BAND_DELTA, 3.00, 0, 50),
  enableUpsells: process.env.ENABLE_UPSELLS !== 'false',
  relevanceToggles: defaultRelevanceToggles,
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
