/**
 * Customer Model
 * Backend model definition for Nostalgia Dept customers
 */

/**
 * Customer address
 */
export interface CustomerAddress {
  id: string;
  type: 'shipping' | 'billing';
  isDefault: boolean;
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
 * Customer model interface
 */
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: CustomerAddress[];
  tags: string[];
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Customer input for creating/updating customers
 */
export interface CustomerInput {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses?: Omit<CustomerAddress, 'id'>[];
  tags?: string[];
  notes?: string;
}

/**
 * Generate customer ID
 */
export function generateCustomerId(): string {
  return `cust_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 8)}`;
}
