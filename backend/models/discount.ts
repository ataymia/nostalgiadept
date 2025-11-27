/**
 * Discount Model
 * Backend model definition for Nostalgia Dept discounts/promotions
 */

/**
 * Discount type values
 */
export type DiscountType = 
  | 'percentage'
  | 'fixed_amount'
  | 'free_shipping';

/**
 * What the discount applies to
 */
export type DiscountAppliesTo = 
  | 'entire_order'
  | 'products'
  | 'categories';

/**
 * Discount model interface
 */
export interface Discount {
  id: string;
  code: string;
  description?: string;
  type: DiscountType;
  value: number;
  appliesTo: DiscountAppliesTo;
  /** Product IDs if appliesTo = 'products' */
  productIds?: string[];
  /** Category values if appliesTo = 'categories' */
  categories?: string[];
  minOrderAmount?: number;
  firstTimeOnly: boolean;
  usageLimitTotal?: number;
  usageLimitPerCustomer?: number;
  usageCount: number;
  startsAt: string;
  endsAt?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Discount input for creating/updating discounts
 */
export interface DiscountInput {
  code: string;
  description?: string;
  type: DiscountType;
  value: number;
  appliesTo?: DiscountAppliesTo;
  productIds?: string[];
  categories?: string[];
  minOrderAmount?: number;
  firstTimeOnly?: boolean;
  usageLimitTotal?: number;
  usageLimitPerCustomer?: number;
  startsAt?: string;
  endsAt?: string;
  active?: boolean;
}

/**
 * Generate discount ID
 */
export function generateDiscountId(): string {
  return `disc_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Check if a discount is currently valid
 */
export function isDiscountValid(discount: Discount): boolean {
  if (!discount.active) return false;
  
  const now = new Date();
  const startsAt = new Date(discount.startsAt);
  const endsAt = discount.endsAt ? new Date(discount.endsAt) : null;
  
  if (now < startsAt) return false;
  if (endsAt && now > endsAt) return false;
  
  if (discount.usageLimitTotal && discount.usageCount >= discount.usageLimitTotal) {
    return false;
  }
  
  return true;
}
