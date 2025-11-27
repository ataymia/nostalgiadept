/**
 * Nostalgia Dept Categories
 * Hard-coded category/subcategory tree for the storefront and admin
 */

/**
 * Complete Nostalgia Dept category structure
 */
export const CATEGORIES = [
  {
    value: 'pocket-tech-virtual-pets',
    label: 'Pocket Tech & Virtual Pets',
    subcategories: [
      { value: 'virtual-pets', label: 'Virtual Pets' },
      { value: 'pocket-games-keychains', label: 'Pocket Games & Keychains' },
    ],
  },
  {
    value: 'grow-kits-room-decor',
    label: 'Grow Kits & Room Décor',
    subcategories: [
      { value: 'chia-pets-planters', label: 'Chia Pets & Planters' },
      { value: 'room-decor-desk-toys', label: 'Room Décor & Desk Toys' },
    ],
  },
  {
    value: 'toys-games-fidgets',
    label: 'Toys, Games & Fidgets',
    subcategories: [
      { value: 'playground-classics', label: 'Playground Classics' },
      { value: 'arcade-prizes-party-toys', label: 'Arcade Prizes & Party Toys' },
      { value: 'vending-capsules-refills', label: 'Vending Capsules & Refills' },
    ],
  },
  {
    value: 'stickers-stationery-school',
    label: 'Stickers, Stationery & School',
    subcategories: [
      { value: 'stickers-tattoos', label: 'Stickers & Tattoos' },
      { value: 'notebooks-writing', label: 'Notebooks & Writing' },
      { value: 'locker-accessories', label: 'Locker Accessories' },
    ],
  },
  {
    value: 'vhs-analog-corner',
    label: 'VHS & Analog Corner',
    subcategories: [
      { value: 'blank-tapes', label: 'Blank Tapes' },
      { value: 'mystery-vhs-bundles', label: 'Mystery VHS Bundles' },
      { value: 'analog-accessories', label: 'Analog Accessories' },
    ],
  },
  {
    value: 'candy-snacks-drinks',
    label: 'Candy, Snacks & Drinks',
    subcategories: [
      { value: '90s-candy-mixes', label: '90s Candy Mixes' },
      { value: 'regional-snacks', label: 'Regional Snacks' },
      { value: 'single-snacks-drinks', label: 'Single Snacks & Drinks' },
    ],
  },
  {
    value: 'mystery-subscription-boxes',
    label: 'Mystery & Subscription Boxes',
    subcategories: [
      { value: 'monthly-subscriptions', label: 'Monthly Subscriptions' },
      { value: 'one-time-mystery-boxes', label: 'One-Time Mystery Boxes' },
      { value: 'event-kits-party-boxes', label: 'Event Kits & Party Boxes' },
    ],
  },
  {
    value: 'retro-apparel-accessories',
    label: 'Retro Apparel & Accessories',
    subcategories: [
      { value: 'graphic-tees-tops', label: 'Graphic Tees & Tops' },
      { value: 'hats-socks-bags', label: 'Hats, Socks & Bags' },
      { value: 'pins-jewelry', label: 'Pins & Jewelry' },
    ],
  },
  {
    value: 'the-vault',
    label: 'The Vault (Discontinued & Rare)',
    subcategories: [
      { value: 'vintage-toys-collectibles', label: 'Vintage Toys & Collectibles' },
      { value: 'limited-run-finds', label: 'Limited-Run Finds' },
      { value: 'closeout-treasure-packs', label: 'Closeout Treasure Packs' },
    ],
  },
  {
    value: 'checkout-candy-lane',
    label: 'Checkout Candy Lane',
    subcategories: [
      { value: 'mini-snacks', label: 'Mini Snacks' },
      { value: 'tiny-toys-capsules', label: 'Tiny Toys & Capsules' },
      { value: 'stickers-pins', label: 'Stickers & Pins' },
    ],
  },
];

/**
 * Get all category values
 * @returns {string[]} Array of category value strings
 */
export function getAllCategories() {
  return CATEGORIES.map((c) => c.value);
}

/**
 * Get all subcategory values for a category
 * @param {string} category - The category value
 * @returns {string[]} Array of subcategory value strings
 */
export function getSubcategoriesForCategory(category) {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.subcategories.map((s) => s.value) : [];
}

/**
 * Validate that a category exists
 * @param {string} category - The category value to check
 * @returns {boolean} True if valid
 */
export function isValidCategory(category) {
  return CATEGORIES.some((c) => c.value === category);
}

/**
 * Validate that a subcategory exists for a given category
 * @param {string} category - The parent category value
 * @param {string} subcategory - The subcategory value to check
 * @returns {boolean} True if valid
 */
export function isValidCategorySubcategory(category, subcategory) {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.subcategories.some((s) => s.value === subcategory) : false;
}

/**
 * Get category label from value
 * @param {string} category - The category value
 * @returns {string} The category label
 */
export function getCategoryLabel(category) {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.label : category;
}

/**
 * Get subcategory label from value
 * @param {string} category - The parent category value
 * @param {string} subcategory - The subcategory value
 * @returns {string} The subcategory label
 */
export function getSubcategoryLabel(category, subcategory) {
  const cat = CATEGORIES.find((c) => c.value === category);
  if (!cat) return subcategory;
  const sub = cat.subcategories.find((s) => s.value === subcategory);
  return sub ? sub.label : subcategory;
}
