/**
 * Activity Log Model
 * Backend model definition for Nostalgia Dept admin activity logging
 */

/**
 * Activity log action types
 */
export type ActivityType =
  | 'product_create'
  | 'product_update'
  | 'product_delete'
  | 'order_create'
  | 'order_status_change'
  | 'order_refund'
  | 'inventory_adjustment'
  | 'discount_create'
  | 'discount_update'
  | 'discount_delete'
  | 'subscription_create'
  | 'subscription_pause'
  | 'subscription_resume'
  | 'subscription_cancel'
  | 'customer_create'
  | 'customer_update'
  | 'settings_change'
  | 'content_update'
  | 'user_login'
  | 'user_logout';

/**
 * Entity types that can be logged
 */
export type EntityType =
  | 'product'
  | 'order'
  | 'customer'
  | 'subscription'
  | 'discount'
  | 'settings'
  | 'content'
  | 'user';

/**
 * Activity log entry
 */
export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName?: string;
  type: ActivityType;
  entityType: EntityType;
  entityId?: string;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

/**
 * Activity log input
 */
export interface ActivityLogInput {
  userId: string;
  userName?: string;
  type: ActivityType;
  entityType: EntityType;
  entityId?: string;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Generate activity log ID
 */
export function generateActivityLogId(): string {
  return `log_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Create an activity log entry
 */
export function createActivityLogEntry(input: ActivityLogInput): ActivityLogEntry {
  return {
    id: generateActivityLogId(),
    ...input,
    createdAt: new Date().toISOString(),
  };
}
