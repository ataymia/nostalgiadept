/**
 * Order Model
 * Backend model definition for Nostalgia Dept orders
 */

/**
 * Order status values
 */
export type OrderStatus = 
  | 'new'
  | 'paid'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'refunded'
  | 'cancelled';

/**
 * Payment status values
 */
export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

/**
 * Order line item
 */
export interface OrderLineItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  sku?: string;
}

/**
 * Shipping address
 */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

/**
 * Applied discount
 */
export interface AppliedDiscount {
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  amountSaved: number;
}

/**
 * Order activity timeline entry
 */
export interface OrderActivity {
  timestamp: string;
  action: string;
  userId?: string;
  note?: string;
}

/**
 * Order model interface
 */
export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerId?: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  lineItems: OrderLineItem[];
  discounts: AppliedDiscount[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  carrier?: string;
  internalNotes?: string;
  activityTimeline: OrderActivity[];
  channel?: string;
}

/**
 * Order input for creating orders
 */
export interface OrderInput {
  customerEmail: string;
  customerId?: string;
  shippingAddress: ShippingAddress;
  lineItems: Omit<OrderLineItem, 'subtotal'>[];
  discountCodes?: string[];
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const prefix = 'ND';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
