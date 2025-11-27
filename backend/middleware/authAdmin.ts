/**
 * Admin Authentication Middleware
 * Express-style middleware for protecting admin endpoints
 * 
 * This is a placeholder implementation. In production, integrate with
 * the project's existing authentication system (e.g., NextAuth, Clerk, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Admin roles
 */
export type AdminRole = 'owner' | 'manager' | 'staff' | 'fulfillment';

/**
 * Admin user interface
 */
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

/**
 * Role permissions matrix
 */
const rolePermissions: Record<AdminRole, string[]> = {
  owner: ['*'], // Full access
  manager: [
    'dashboard',
    'products',
    'orders',
    'customers',
    'inventory',
    'discounts',
    'upsells',
    'content',
    'reports',
    'boxes',
  ],
  staff: [
    'dashboard',
    'products',
    'orders',
    'customers',
    'inventory',
  ],
  fulfillment: [
    'dashboard',
    'orders',
    'inventory',
  ],
};

/**
 * Check if a role has permission for a section
 */
export function hasPermission(role: AdminRole, section: string): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes('*') || permissions.includes(section);
}

/**
 * Placeholder: Get admin user from request
 * In production, this would:
 * - Check session/JWT token
 * - Validate against auth provider
 * - Return user data or null
 */
export async function getAdminUser(_request: NextRequest): Promise<AdminUser | null> {
  // Placeholder: Always return a demo admin user
  // In production, validate session token here
  return {
    id: 'admin_demo',
    email: 'admin@nostalgiadept.com',
    name: 'Demo Admin',
    role: 'owner',
  };
}

/**
 * Admin authentication middleware for API routes
 * Use this to protect admin API endpoints
 * 
 * Example usage:
 * ```ts
 * import { withAdminAuth } from '@/backend/middleware/authAdmin';
 * 
 * async function handler(request: NextRequest) {
 *   const authResult = await withAdminAuth(request);
 *   if (authResult.error) {
 *     return authResult.error;
 *   }
 *   const user = authResult.user;
 *   // ... handle request
 * }
 * ```
 */
export async function withAdminAuth(
  request: NextRequest,
  requiredSection?: string
): Promise<{ user: AdminUser; error?: never } | { user?: never; error: NextResponse }> {
  const user = await getAdminUser(request);
  
  if (!user) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      ),
    };
  }
  
  if (requiredSection && !hasPermission(user.role, requiredSection)) {
    return {
      error: NextResponse.json(
        { error: 'Forbidden. You do not have permission to access this resource.' },
        { status: 403 }
      ),
    };
  }
  
  return { user };
}

/**
 * Express-style middleware for legacy compatibility
 * This is for use with Express.js-style handlers if needed
 */
export function authAdminMiddleware(requiredSection?: string) {
  return async (
    req: { headers: { authorization?: string } },
    res: { status: (code: number) => { json: (data: unknown) => void } },
    next: () => void
  ) => {
    // Placeholder: Check auth header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Placeholder: Validate token
    // In production, validate JWT or session token here
    const _token = authHeader.substring(7);
    
    // Demo: Allow all requests
    if (requiredSection) {
      // Placeholder: Check permissions
    }
    
    next();
  };
}
