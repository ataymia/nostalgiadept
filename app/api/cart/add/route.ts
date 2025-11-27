/**
 * Cart Add API Route
 * POST /api/cart/add
 *
 * Placeholder demo endpoint to add an item to cart.
 * In a full implementation, this would integrate with a backend cart service.
 *
 * Request body:
 * {
 *   productId: string  // Product ID to add
 *   quantity?: number  // Quantity to add (default: 1)
 * }
 *
 * Response:
 * {
 *   success: boolean
 *   message: string
 *   cart: { items: CartItem[] }  // Mock cart state
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
// Using lib/products which provides the shared product catalog
// For server-only code, use backend/services/productService instead
import { getProductById } from '@/lib/products';

interface CartAddRequest {
  productId: string;
  quantity?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CartAddRequest = await request.json();
    const { productId, quantity = 1 } = body;

    // Validate productId
    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'productId is required and must be a string.' },
        { status: 400 }
      );
    }

    // Validate quantity
    if (quantity < 1 || !Number.isInteger(quantity)) {
      return NextResponse.json(
        { error: 'quantity must be a positive integer.' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    // Check if product is active and in stock
    if (!product.isActive) {
      return NextResponse.json(
        { error: 'Product is not available.' },
        { status: 400 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock.' },
        { status: 400 }
      );
    }

    // In a real implementation, this would:
    // 1. Get/create user session
    // 2. Add item to cart in database/session
    // 3. Return updated cart state

    // Mock response for demo purposes
    return NextResponse.json({
      success: true,
      message: `Added ${quantity}x "${product.name}" to cart.`,
      cart: {
        items: [
          {
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images,
            },
            quantity,
          },
        ],
      },
    });
  } catch (error) {
    console.error('Cart add API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
