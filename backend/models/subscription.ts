/**
 * Subscription Model
 * Backend model definition for Nostalgia Dept subscriptions
 */

/**
 * Subscription status values
 */
export type SubscriptionStatus = 
  | 'active'
  | 'paused'
  | 'cancelled'
  | 'expired';

/**
 * Subscription frequency options
 */
export type SubscriptionFrequency = 
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'annually';

/**
 * Subscription renewal history entry
 */
export interface SubscriptionRenewal {
  date: string;
  orderId: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
}

/**
 * Subscription model interface
 */
export interface Subscription {
  id: string;
  customerId: string;
  boxProductId: string;
  status: SubscriptionStatus;
  frequency: SubscriptionFrequency;
  price: number;
  nextRenewalDate: string;
  startedAt: string;
  pausedAt?: string;
  cancelledAt?: string;
  renewalHistory: SubscriptionRenewal[];
  metadata?: Record<string, unknown>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Subscription input for creating subscriptions
 */
export interface SubscriptionInput {
  customerId: string;
  boxProductId: string;
  frequency: SubscriptionFrequency;
  price: number;
  startDate?: string;
  metadata?: Record<string, unknown>;
  notes?: string;
}

/**
 * Generate subscription ID
 */
export function generateSubscriptionId(): string {
  return `sub_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Calculate next renewal date based on frequency
 */
export function calculateNextRenewalDate(
  fromDate: Date,
  frequency: SubscriptionFrequency
): Date {
  const result = new Date(fromDate);
  
  switch (frequency) {
    case 'weekly':
      result.setDate(result.getDate() + 7);
      break;
    case 'biweekly':
      result.setDate(result.getDate() + 14);
      break;
    case 'monthly':
      result.setMonth(result.getMonth() + 1);
      break;
    case 'quarterly':
      result.setMonth(result.getMonth() + 3);
      break;
    case 'annually':
      result.setFullYear(result.getFullYear() + 1);
      break;
  }
  
  return result;
}
