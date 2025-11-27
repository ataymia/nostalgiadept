/**
 * Upsell API Route
 * POST /api/upsells
 *
 * Exposes the upsell service logic as an API endpoint for frontend/client-side fetching.
 *
 * Request body:
 * {
 *   cartItems: string[]  // Array of product IDs in cart
 *   place: 'cart' | 'checkout'  // Context for upsell selection
 * }
 *
 * Response:
 * {
 *   data: Product[]  // Recommended upsell products
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUpsellProducts, type UpsellContext } from '@/lib/services/upsellService';

interface UpsellRequest {
  cartItems: string[];
  place: UpsellContext;
}

export async function POST(request: NextRequest) {
  try {
    const body: UpsellRequest = await request.json();
    const { cartItems = [], place = 'cart' } = body;

    // Validate place parameter
    if (place !== 'cart' && place !== 'checkout') {
      return NextResponse.json(
        { error: 'Invalid place parameter. Must be "cart" or "checkout".' },
        { status: 400 }
      );
    }

    // Validate cartItems is an array
    if (!Array.isArray(cartItems)) {
      return NextResponse.json(
        { error: 'cartItems must be an array of product IDs.' },
        { status: 400 }
      );
    }

    // Get recommended upsell products
    const recommendedProducts = await getUpsellProducts(cartItems, place);

    return NextResponse.json({
      data: recommendedProducts,
    });
  } catch (error) {
    console.error('Upsell API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
