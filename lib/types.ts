export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  inventory: number;
  isRegional: boolean;
  featured: boolean;
  onSale: boolean;
  salePrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategory =
  | '90s-collections'
  | 'regional-snacks'
  | 'snacks'
  | 'womens-apparel'
  | 'mens-apparel'
  | 'shoes'
  | 'toys'
  | 'accessories';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: '90s-collections', label: '90s Collections' },
  { value: 'regional-snacks', label: 'Regional Snacks' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'womens-apparel', label: "Women's Apparel" },
  { value: 'mens-apparel', label: "Men's Apparel" },
  { value: 'shoes', label: 'Shoes' },
  { value: 'toys', label: 'Toys' },
  { value: 'accessories', label: 'Accessories' },
];
