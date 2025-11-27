/**
 * Product rarity levels
 */
export type ProductRarity = 'common' | 'hard_to_find' | 'limited';

/**
 * Nostalgia Dept Product Model
 * Complete schema for all store products
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  descriptionShort: string;
  descriptionLong: string;
  images: string[];
  price: number;
  cost?: number;
  compareAtPrice?: number;
  trackInventory: boolean;
  stock: number;
  reorderThreshold?: number;
  isActive: boolean;
  /** Whether this product is eligible for checkout upsell (Checkout Candy Lane) */
  isCheckoutAddon: boolean;
  rarity: ProductRarity;
  vendorName?: string;
  vendorUrl?: string;
  /** Regional tag for snacks (e.g., "AZ", "South", "Midwest") */
  regionTag?: string;
  bundleEligible: boolean;
  createdAt: string;
  updatedAt: string;
  // Legacy fields for backward compatibility
  /** @deprecated Use descriptionShort or descriptionLong */
  description?: string;
  /** @deprecated Use stock */
  inventory?: number;
  /** @deprecated Use regionTag */
  isRegional?: boolean;
  featured?: boolean;
  onSale?: boolean;
  salePrice?: number;
}

/**
 * Upsell candidate with relevance scoring
 */
export interface UpsellCandidate {
  product: Product;
  relevanceScore: number;
  effectivePrice: number;
}

/**
 * Nostalgia Dept Product Categories
 */
export type ProductCategory =
  | 'pocket-tech-virtual-pets'
  | 'grow-kits-room-decor'
  | 'toys-games-fidgets'
  | 'stickers-stationery-school'
  | 'vhs-analog-corner'
  | 'candy-snacks-drinks'
  | 'mystery-subscription-boxes'
  | 'retro-apparel-accessories'
  | 'the-vault'
  | 'checkout-candy-lane';

/**
 * Product subcategories mapped to their parent categories
 */
export type ProductSubcategory =
  // Pocket Tech & Virtual Pets
  | 'virtual-pets'
  | 'pocket-games-keychains'
  // Grow Kits & Room Décor
  | 'chia-pets-planters'
  | 'room-decor-desk-toys'
  // Toys, Games & Fidgets
  | 'playground-classics'
  | 'arcade-prizes-party-toys'
  | 'vending-capsules-refills'
  // Stickers, Stationery & School
  | 'stickers-tattoos'
  | 'notebooks-writing'
  | 'locker-accessories'
  // VHS & Analog Corner
  | 'blank-tapes'
  | 'mystery-vhs-bundles'
  | 'analog-accessories'
  // Candy, Snacks & Drinks
  | '90s-candy-mixes'
  | 'regional-snacks'
  | 'single-snacks-drinks'
  // Mystery & Subscription Boxes
  | 'monthly-subscriptions'
  | 'one-time-mystery-boxes'
  | 'event-kits-party-boxes'
  // Retro Apparel & Accessories
  | 'graphic-tees-tops'
  | 'hats-socks-bags'
  | 'pins-jewelry'
  // The Vault
  | 'vintage-toys-collectibles'
  | 'limited-run-finds'
  | 'closeout-treasure-packs'
  // Checkout Candy Lane
  | 'mini-snacks'
  | 'tiny-toys-capsules'
  | 'stickers-pins';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

/**
 * Category definition with subcategories
 */
export interface CategoryDefinition {
  value: ProductCategory;
  label: string;
  subcategories: { value: ProductSubcategory; label: string }[];
}

/**
 * Complete Nostalgia Dept category structure
 */
export const CATEGORIES: CategoryDefinition[] = [
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
    label: 'The Vault',
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
 */
export function getAllCategories(): ProductCategory[] {
  return CATEGORIES.map((c) => c.value);
}

/**
 * Get all subcategory values for a category
 */
export function getSubcategoriesForCategory(category: ProductCategory): ProductSubcategory[] {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.subcategories.map((s) => s.value) : [];
}

/**
 * Validate that a category exists
 */
export function isValidCategory(category: string): category is ProductCategory {
  return CATEGORIES.some((c) => c.value === category);
}

/**
 * Validate that a subcategory exists for a given category
 */
export function isValidSubcategory(
  category: ProductCategory,
  subcategory: string
): subcategory is ProductSubcategory {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.subcategories.some((s) => s.value === subcategory) : false;
}

/**
 * Get category label from value
 */
export function getCategoryLabel(category: ProductCategory): string {
  const cat = CATEGORIES.find((c) => c.value === category);
  return cat ? cat.label : category;
}

/**
 * Get subcategory label from value
 */
export function getSubcategoryLabel(
  category: ProductCategory,
  subcategory: ProductSubcategory
): string {
  const cat = CATEGORIES.find((c) => c.value === category);
  if (!cat) return subcategory;
  const sub = cat.subcategories.find((s) => s.value === subcategory);
  return sub ? sub.label : subcategory;
}
