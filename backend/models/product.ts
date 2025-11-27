/**
 * Product Model
 * Backend model definition for Nostalgia Dept products
 */

/**
 * Product rarity levels
 */
export type ProductRarity = 'common' | 'hard_to_find' | 'limited';

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

/**
 * Product model interface
 * Complete schema for all Nostalgia Dept products
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
 * Product input for creating/updating products
 */
export interface ProductInput {
  name: string;
  slug?: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  descriptionShort: string;
  descriptionLong?: string;
  images?: string[];
  price: number;
  cost?: number;
  compareAtPrice?: number;
  trackInventory?: boolean;
  stock?: number;
  reorderThreshold?: number;
  isActive?: boolean;
  isCheckoutAddon?: boolean;
  rarity?: ProductRarity;
  vendorName?: string;
  vendorUrl?: string;
  regionTag?: string;
  bundleEligible?: boolean;
}

/**
 * Default values for product fields
 */
export const PRODUCT_DEFAULTS = {
  STOCK: 50,
  REORDER_THRESHOLD: 10,
  PLACEHOLDER_IMAGE: '/images/products/placeholder.jpg',
} as const;

/**
 * Helper to generate a slug from a name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Helper to migrate legacy product data to the new schema
 */
export function migrateToProduct(data: Record<string, unknown>): Partial<Product> {
  const now = new Date().toISOString();
  
  return {
    id: data.id as string,
    name: data.name as string,
    slug: (data.slug as string) || generateSlug(data.name as string || ''),
    category: (data.category as ProductCategory) || 'toys-games-fidgets',
    subcategory: (data.subcategory as ProductSubcategory) || 'arcade-prizes-party-toys',
    descriptionShort: (data.descriptionShort as string) || (data.shortDescription as string) || (data.description as string) || '',
    descriptionLong: (data.descriptionLong as string) || (data.description as string) || '',
    images: (data.images as string[]) || [PRODUCT_DEFAULTS.PLACEHOLDER_IMAGE],
    price: (data.price as number) || 0,
    cost: data.cost as number | undefined,
    compareAtPrice: (data.compareAtPrice as number) || (data.originalPrice as number) || undefined,
    trackInventory: (data.trackInventory as boolean) ?? true,
    stock: (data.stock as number) ?? (data.inventory as number) ?? PRODUCT_DEFAULTS.STOCK,
    reorderThreshold: (data.reorderThreshold as number) || PRODUCT_DEFAULTS.REORDER_THRESHOLD,
    isActive: (data.isActive as boolean) ?? (data.inStock as boolean) ?? true,
    isCheckoutAddon: (data.isCheckoutAddon as boolean) ?? false,
    rarity: (data.rarity as ProductRarity) || 'common',
    vendorName: data.vendorName as string | undefined,
    vendorUrl: data.vendorUrl as string | undefined,
    regionTag: data.regionTag as string | undefined,
    bundleEligible: (data.bundleEligible as boolean) ?? true,
    createdAt: (data.createdAt as string) || now,
    updatedAt: (data.updatedAt as string) || now,
    // Legacy fields
    featured: data.featured as boolean | undefined,
    onSale: data.onSale as boolean | undefined,
    salePrice: data.salePrice as number | undefined,
  };
}
