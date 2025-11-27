/**
 * Upsell Logic
 * Implements getCheckoutAddons for selecting upsell items
 */

import * as fs from 'fs';
import * as path from 'path';
import { getUpsellConfig } from './upsellConfig.js';

/**
 * Load products from products.json
 * @returns {Array} Array of product objects
 */
function loadProducts() {
  try {
    const productsPath = path.join(process.cwd(), 'products.json');
    const data = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading products.json:', error);
    return [];
  }
}

/**
 * Check if a product matches any keywords
 * @param {Object} product - Product object
 * @param {string[]} keywords - Keywords to match
 * @returns {boolean}
 */
function matchesKeywords(product, keywords) {
  if (!keywords || keywords.length === 0) return false;
  
  const searchText = `${product.name || ''} ${product.descriptionShort || ''} ${product.descriptionLong || ''}`.toLowerCase();
  return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()));
}

/**
 * Calculate relevance score for a candidate product
 * @param {Object} candidate - Product object
 * @param {Set} cartCategories - Set of categories in cart
 * @param {Array} rules - Relevance rules
 * @returns {number} Relevance score
 */
function calculateRelevanceScore(candidate, cartCategories, rules) {
  let score = 0;

  for (const rule of rules) {
    const cartMatches = rule.cartCategories.some((cat) => cartCategories.has(cat));
    
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
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled copy
 */
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get checkout addon recommendations
 * 
 * Algorithm:
 * 1. Load products.json
 * 2. Filter to isActive && isCheckoutAddon
 * 3. Exclude products already in cart
 * 4. Score relevance based on cart categories
 * 5. Sort by relevance then price
 * 6. Compute cheap band (minPrice + cheapBandDelta)
 * 7. Select up to maxCartAddons (or maxCheckoutAddons) preferring cheap band
 * 8. Return selected product objects
 * 
 * @param {Array} cartItems - Array of cart items with product info or IDs
 * @param {string} place - 'cart' or 'checkout'
 * @param {Object} configOverrides - Optional config overrides
 * @returns {Array} Selected upsell products
 */
function getCheckoutAddons(cartItems = [], place = 'cart', configOverrides = {}) {
  const config = getUpsellConfig(configOverrides);
  
  if (!config.enableUpsells) {
    return [];
  }
  
  const products = loadProducts();
  
  // Get cart product IDs
  const cartProductIds = new Set(
    cartItems.map((item) => item.productId || item.id || item.product?.id)
  );
  
  // Get cart categories
  const cartCategories = new Set();
  for (const item of cartItems) {
    const category = item.category || item.product?.category;
    if (category) {
      cartCategories.add(category);
    } else if (item.productId || item.id) {
      const product = products.find((p) => p.id === (item.productId || item.id));
      if (product) {
        cartCategories.add(product.category);
      }
    }
  }
  
  // Filter to eligible candidates
  const eligible = products.filter((product) => {
    if (!product.isCheckoutAddon) return false;
    if (!product.isActive && product.isActive !== undefined) return false;
    if (cartProductIds.has(product.id)) return false;
    if (product.stock !== undefined && product.stock <= 0) return false;
    return true;
  });
  
  if (eligible.length === 0) {
    return [];
  }
  
  // Create candidates with scores
  const candidates = eligible.map((product) => ({
    product,
    relevanceScore: calculateRelevanceScore(product, cartCategories, config.relevanceRules),
    effectivePrice: product.price || 0,
  }));
  
  // Determine limit
  const limit = place === 'cart' ? config.maxCartAddons : config.maxCheckoutAddons;
  
  // Find minimum price and cheap band
  const sortedByPrice = [...candidates].sort((a, b) => a.effectivePrice - b.effectivePrice);
  const minPrice = sortedByPrice[0].effectivePrice;
  const cheapBandThreshold = minPrice + config.cheapBandDelta;
  
  // Split into cheap band and rest
  const cheapBand = candidates.filter((c) => c.effectivePrice <= cheapBandThreshold);
  const rest = candidates.filter((c) => c.effectivePrice > cheapBandThreshold);
  
  // Sort cheap band by relevance (desc)
  cheapBand.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Select results
  const results = [];
  
  if (cheapBand.length >= limit) {
    // Group by relevance and pick randomly within groups
    const byRelevance = new Map();
    for (const c of cheapBand) {
      const existing = byRelevance.get(c.relevanceScore) || [];
      existing.push(c);
      byRelevance.set(c.relevanceScore, existing);
    }
    
    const scores = Array.from(byRelevance.keys()).sort((a, b) => b - a);
    for (const score of scores) {
      const group = shuffleArray(byRelevance.get(score));
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
  
  return results.map((c) => c.product);
}

export { getCheckoutAddons, loadProducts };
