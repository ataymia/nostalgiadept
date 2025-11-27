/**
 * Product Service
 * Backend service for managing Nostalgia Dept products
 */

import { Product, ProductInput, migrateToProduct, generateSlug } from '../models/product';
import * as fs from 'fs';
import * as path from 'path';

// In-memory product cache
let productCache: Product[] | null = null;

/**
 * Path to products.json
 */
const PRODUCTS_JSON_PATH = path.join(process.cwd(), 'products.json');

/**
 * Load products from JSON file
 */
function loadProductsFromFile(): Product[] {
  try {
    const data = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
    const rawProducts = JSON.parse(data);
    
    // Migrate each product to ensure it has all required fields
    return rawProducts.map((raw: Record<string, unknown>) => {
      const migrated = migrateToProduct(raw);
      return migrated as Product;
    });
  } catch {
    console.error('Error loading products.json, returning empty array');
    return [];
  }
}

/**
 * Get all products (with caching)
 */
export function getAllProducts(): Product[] {
  if (!productCache) {
    productCache = loadProductsFromFile();
  }
  return productCache;
}

/**
 * Clear the product cache (call after updates)
 */
export function clearProductCache(): void {
  productCache = null;
}

/**
 * Get a product by ID
 */
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

/**
 * Get a product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(p => p.slug === slug);
}

/**
 * Get active products only
 */
export function getActiveProducts(): Product[] {
  return getAllProducts().filter(p => p.isActive);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter(p => p.category === category && p.isActive);
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return getAllProducts().filter(p => p.subcategory === subcategory && p.isActive);
}

/**
 * Get checkout addon products (for upsell)
 */
export function getCheckoutAddons(): Product[] {
  return getAllProducts().filter(p => p.isCheckoutAddon && p.isActive && p.stock > 0);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(p => p.featured && p.isActive);
}

/**
 * Get products on sale
 */
export function getOnSaleProducts(): Product[] {
  return getAllProducts().filter(
    p => p.compareAtPrice && p.compareAtPrice > p.price && p.isActive
  );
}

/**
 * Get low stock products (stock <= reorderThreshold)
 */
export function getLowStockProducts(): Product[] {
  return getAllProducts().filter(
    p => p.trackInventory && p.reorderThreshold && p.stock <= p.reorderThreshold
  );
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return getAllProducts().filter(
    p =>
      p.isActive &&
      (p.name.toLowerCase().includes(lowerQuery) ||
        p.descriptionShort?.toLowerCase().includes(lowerQuery) ||
        p.descriptionLong?.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Create a new product (in-memory only for demo)
 * NOTE: This does not persist to disk. A real implementation would save to DB.
 */
export function createProduct(input: ProductInput): Product {
  const now = new Date().toISOString();
  const products = getAllProducts();
  
  const newProduct: Product = {
    id: `prod_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`,
    name: input.name,
    slug: input.slug || generateSlug(input.name),
    category: input.category,
    subcategory: input.subcategory,
    descriptionShort: input.descriptionShort,
    descriptionLong: input.descriptionLong || '',
    images: input.images || ['/images/products/placeholder.jpg'],
    price: input.price,
    cost: input.cost,
    compareAtPrice: input.compareAtPrice,
    trackInventory: input.trackInventory ?? true,
    stock: input.stock ?? 0,
    reorderThreshold: input.reorderThreshold ?? 10,
    isActive: input.isActive ?? true,
    isCheckoutAddon: input.isCheckoutAddon ?? false,
    rarity: input.rarity || 'common',
    vendorName: input.vendorName,
    vendorUrl: input.vendorUrl,
    regionTag: input.regionTag,
    bundleEligible: input.bundleEligible ?? true,
    createdAt: now,
    updatedAt: now,
  };
  
  products.push(newProduct);
  productCache = products;
  
  return newProduct;
}

/**
 * Update a product (in-memory only for demo)
 * NOTE: This does not persist to disk. A real implementation would save to DB.
 */
export function updateProduct(id: string, updates: Partial<ProductInput>): Product | null {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updated: Product = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  products[index] = updated;
  productCache = products;
  
  return updated;
}

/**
 * Delete a product (in-memory only for demo)
 * NOTE: This does not persist to disk. A real implementation would save to DB.
 */
export function deleteProduct(id: string): boolean {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return false;
  }
  
  products.splice(index, 1);
  productCache = products;
  
  return true;
}

/**
 * Update stock for a product
 */
export function updateStock(id: string, quantity: number, adjustment: 'set' | 'add' | 'subtract' = 'set'): Product | null {
  const product = getProductById(id);
  if (!product) return null;
  
  let newStock: number;
  switch (adjustment) {
    case 'add':
      newStock = product.stock + quantity;
      break;
    case 'subtract':
      newStock = Math.max(0, product.stock - quantity);
      break;
    default:
      newStock = quantity;
  }
  
  return updateProduct(id, { stock: newStock });
}
