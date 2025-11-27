/**
 * Shared Relevance Rules Configuration
 * Single source of truth for upsell relevance rules used across
 * both frontend (lib/config/upsell.ts) and backend (backend/services/upsellService.ts)
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
 * Default relevance rules based on the Nostalgia Dept spec:
 * - VHS & Analog Corner → prefer movie night add-ons
 * - Candy, Snacks & Drinks → prefer Mini Snacks add-ons
 * - Stickers, Stationery & School → prefer Stickers & Pins add-ons
 * - Toys, Games & Fidgets / Pocket Tech → prefer Tiny Toys & Capsules add-ons
 */
export const DEFAULT_RELEVANCE_RULES: RelevanceRule[] = [
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
 * Default upsell configuration values
 */
export const UPSELL_DEFAULTS = {
  MAX_CART_ADDONS: 5,
  MAX_CHECKOUT_ADDONS: 3,
  CHEAP_BAND_DELTA: 3.00,
} as const;

/**
 * Relevance toggle keys for admin configuration
 */
export interface RelevanceToggles {
  biasSnacksWhenCartHasSnacks: boolean;
  biasVhsWhenCartHasVhs: boolean;
  biasStickersWhenCartHasStationery: boolean;
  biasToysWhenCartHasToys: boolean;
}

/**
 * Default relevance toggles (all enabled)
 */
export const DEFAULT_RELEVANCE_TOGGLES: RelevanceToggles = {
  biasSnacksWhenCartHasSnacks: true,
  biasVhsWhenCartHasVhs: true,
  biasStickersWhenCartHasStationery: true,
  biasToysWhenCartHasToys: true,
};
