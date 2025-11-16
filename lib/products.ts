import { Product } from './types';

// Mock product data for the 90s themed store
export const mockProducts: Product[] = [
  // 90s Collections
  {
    id: '1',
    name: 'Retro Walkman',
    description: 'Vintage portable cassette player - the OG portable music experience',
    price: 89.99,
    category: '90s-collections',
    images: ['/products/walkman.jpg'],
    inventory: 15,
    isRegional: false,
    featured: true,
    onSale: false,
  },
  {
    id: '2',
    name: 'Tamagotchi Virtual Pet',
    description: 'Keep your digital pet alive! Classic 90s handheld game',
    price: 24.99,
    category: '90s-collections',
    images: ['/products/tamagotchi.jpg'],
    inventory: 50,
    isRegional: false,
    featured: true,
    onSale: true,
    salePrice: 19.99,
  },
  
  // Regional Snacks
  {
    id: '3',
    name: 'Midwest Cheese Curds',
    description: 'Fresh squeaky cheese curds from Wisconsin',
    price: 12.99,
    category: 'regional-snacks',
    images: ['/products/cheese-curds.jpg'],
    inventory: 30,
    isRegional: true,
    featured: false,
    onSale: false,
  },
  {
    id: '4',
    name: 'Southern Boiled Peanuts',
    description: 'Authentic Southern-style boiled peanuts',
    price: 8.99,
    category: 'regional-snacks',
    images: ['/products/boiled-peanuts.jpg'],
    inventory: 25,
    isRegional: true,
    featured: false,
    onSale: false,
  },
  
  // Snacks
  {
    id: '5',
    name: 'Dunkaroos Pack',
    description: 'The ultimate 90s snack - cookies and frosting!',
    price: 5.99,
    category: 'snacks',
    images: ['/products/dunkaroos.jpg'],
    inventory: 100,
    isRegional: false,
    featured: true,
    onSale: false,
  },
  {
    id: '6',
    name: 'Fruit Roll-Ups',
    description: 'Roll up fun with these fruity treats',
    price: 4.99,
    category: 'snacks',
    images: ['/products/fruit-rollups.jpg'],
    inventory: 80,
    isRegional: false,
    featured: false,
    onSale: true,
    salePrice: 3.99,
  },
  
  // Women's Apparel
  {
    id: '7',
    name: 'Butterfly Clip Set',
    description: 'Classic 90s butterfly hair clips - 12 pack',
    price: 14.99,
    category: 'womens-apparel',
    images: ['/products/butterfly-clips.jpg'],
    inventory: 60,
    isRegional: false,
    featured: true,
    onSale: false,
  },
  {
    id: '8',
    name: 'Choker Necklace',
    description: 'Black velvet choker - the 90s essential',
    price: 9.99,
    category: 'womens-apparel',
    images: ['/products/choker.jpg'],
    inventory: 40,
    isRegional: false,
    featured: false,
    onSale: false,
  },
  
  // Men's Apparel
  {
    id: '9',
    name: 'Windbreaker Jacket',
    description: 'Neon colorblock windbreaker jacket',
    price: 49.99,
    category: 'mens-apparel',
    images: ['/products/windbreaker.jpg'],
    inventory: 20,
    isRegional: false,
    featured: true,
    onSale: true,
    salePrice: 39.99,
  },
  {
    id: '10',
    name: 'Flannel Shirt',
    description: 'Classic grunge flannel shirt',
    price: 34.99,
    category: 'mens-apparel',
    images: ['/products/flannel.jpg'],
    inventory: 35,
    isRegional: false,
    featured: false,
    onSale: false,
  },
  
  // Shoes
  {
    id: '11',
    name: 'Platform Sneakers',
    description: 'Chunky platform sneakers with neon accents',
    price: 79.99,
    category: 'shoes',
    images: ['/products/platform-sneakers.jpg'],
    inventory: 25,
    isRegional: false,
    featured: true,
    onSale: false,
  },
  {
    id: '12',
    name: 'Jelly Sandals',
    description: 'Translucent jelly sandals in bright colors',
    price: 19.99,
    category: 'shoes',
    images: ['/products/jelly-sandals.jpg'],
    inventory: 45,
    isRegional: false,
    featured: false,
    onSale: true,
    salePrice: 14.99,
  },
  
  // Toys
  {
    id: '13',
    name: 'Yo-Yo Pro',
    description: 'Professional grade yo-yo for tricks',
    price: 15.99,
    category: 'toys',
    images: ['/products/yoyo.jpg'],
    inventory: 50,
    isRegional: false,
    featured: false,
    onSale: false,
  },
  {
    id: '14',
    name: 'Slap Bracelet Set',
    description: 'Classic slap bracelets - 6 pack',
    price: 9.99,
    category: 'toys',
    images: ['/products/slap-bracelets.jpg'],
    inventory: 70,
    isRegional: false,
    featured: false,
    onSale: false,
  },
  
  // Accessories
  {
    id: '15',
    name: 'Fanny Pack',
    description: 'Neon fanny pack with multiple compartments',
    price: 24.99,
    category: 'accessories',
    images: ['/products/fanny-pack.jpg'],
    inventory: 40,
    isRegional: false,
    featured: true,
    onSale: false,
  },
  {
    id: '16',
    name: 'Scrunchie Set',
    description: 'Velvet scrunchies in assorted colors - 10 pack',
    price: 12.99,
    category: 'accessories',
    images: ['/products/scrunchies.jpg'],
    inventory: 65,
    isRegional: false,
    featured: false,
    onSale: true,
    salePrice: 9.99,
  },
];

// Utility functions
export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}

export function getOnSaleProducts(): Product[] {
  return mockProducts.filter((p) => p.onSale);
}

export function getRegionalProducts(): Product[] {
  return mockProducts.filter((p) => p.isRegional);
}
