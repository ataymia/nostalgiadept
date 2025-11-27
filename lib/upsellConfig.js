/**
 * Upsell Configuration
 * Configuration for the checkout upsell (Checkout Candy Lane) feature
 */

/**
 * Default relevance rules based on the Nostalgia Dept spec
 */
const defaultRelevanceRules = [
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
  {
    cartCategories: ['grow-kits-room-decor'],
    upsellSubcategories: ['stickers-pins', 'tiny-toys-capsules'],
    weight: 1,
  },
  {
    cartCategories: ['retro-apparel-accessories'],
    upsellSubcategories: ['stickers-pins'],
    weight: 1,
  },
];

/**
 * Default relevance toggles
 */
const defaultRelevanceToggles = {
  biasSnacksWhenCartHasSnacks: true,
  biasVhsWhenCartHasVhs: true,
  biasStickersWhenCartHasStationery: true,
  biasToysWhenCartHasToys: true,
};

/**
 * Parse integer from environment variable with bounds
 * @param {string|undefined} value - Environment variable value
 * @param {number} defaultValue - Default if not set or invalid
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number}
 */
function parseIntEnv(value, defaultValue, min, max) {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(min, Math.min(max, parsed));
}

/**
 * Parse float from environment variable with bounds
 * @param {string|undefined} value - Environment variable value
 * @param {number} defaultValue - Default if not set or invalid
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number}
 */
function parseFloatEnv(value, defaultValue, min, max) {
  if (!value) return defaultValue;
  const parsed = parseFloat(value);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(min, Math.min(max, parsed));
}

/**
 * Default upsell configuration
 * Values can be overridden via environment variables
 */
const defaultUpsellConfig = {
  /** Maximum number of upsell items to show on cart page */
  maxCartAddons: parseIntEnv(process.env.MAX_UPSELL_CART, 5, 1, 20),
  
  /** Maximum number of upsell items to show on checkout page */
  maxCheckoutAddons: parseIntEnv(process.env.MAX_UPSELL_CHECKOUT, 3, 1, 10),
  
  /** Price delta for cheap band (items within minPrice + delta are prioritized) */
  cheapBandDelta: parseFloatEnv(process.env.CHEAP_BAND_DELTA, 3.00, 0, 50),
  
  /** Master switch to enable/disable upsells */
  enableUpsells: process.env.ENABLE_UPSELLS !== 'false',
  
  /** Relevance toggles for admin UI */
  relevanceToggles: defaultRelevanceToggles,
  
  /** Relevance rules for scoring upsell candidates */
  relevanceRules: defaultRelevanceRules,
};

/**
 * Get upsell configuration, optionally merged with overrides
 * @param {Object} overrides - Optional configuration overrides
 * @returns {Object} Complete upsell configuration
 */
function getUpsellConfig(overrides = {}) {
  return {
    ...defaultUpsellConfig,
    ...overrides,
  };
}

export {
  defaultUpsellConfig,
  getUpsellConfig,
  defaultRelevanceRules,
  defaultRelevanceToggles,
};
