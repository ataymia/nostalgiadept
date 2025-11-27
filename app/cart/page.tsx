'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getUpsellProducts } from '@/lib/services/upsellService';
import UpsellStrip from '@/components/UpsellStrip';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const [upsellProducts, setUpsellProducts] = useState<Product[]>([]);

  // Fetch upsell products when cart changes
  useEffect(() => {
    const fetchUpsells = async () => {
      if (items.length > 0) {
        const cartProductIds = items.map((item) => item.product.id);
        const products = await getUpsellProducts(cartProductIds, 'cart');
        setUpsellProducts(products);
      } else {
        setUpsellProducts([]);
      }
    };
    
    fetchUpsells();
  }, [items]);

  const handleCheckout = async () => {
    // For static site, we'll show a simple alert
    // In production, this would integrate with Stripe
    alert('Checkout functionality would integrate with Stripe payment processing here!');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-4xl font-black neon-text-pink mb-4">
          Your Cart is Empty!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Time to fill it up with some rad 90s gear!
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-white text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6">
        <h1 className="text-4xl md:text-5xl font-black text-white text-center">
          🛒 YOUR CART 🛒
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            // Use compareAtPrice for sale display
            const hasDiscount = item.product.compareAtPrice && item.product.compareAtPrice > item.product.price;
            const displayPrice = item.product.price;
            const description = item.product.descriptionShort || item.product.description || '';

            return (
              <div
                key={item.product.id}
                className="bg-white rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 bg-gradient-to-br from-pink-300 to-cyan-300 rounded border-2 border-black flex items-center justify-center text-6xl">
                    📦
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-black text-black">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 bg-red-500 text-white rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Price */}
                      <div>
                        {hasDiscount ? (
                          <div>
                            <span className="text-2xl font-black text-pink-600">
                              ${displayPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${item.product.compareAtPrice!.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-black text-purple-600">
                            ${displayPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-10 h-10 bg-purple-500 text-white font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] transition-all flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center text-xl font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-10 h-10 bg-purple-500 text-white font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] transition-all flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 font-bold">Subtotal:</p>
                        <p className="text-2xl font-black text-purple-600">
                          ${(displayPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Upsell Strip - "Grab a little extra nostalgia?" */}
          {upsellProducts.length > 0 && (
            <UpsellStrip
              products={upsellProducts}
              heading="Grab a little extra nostalgia?"
              subtext="Tiny add-ons from Checkout Candy Lane – perfect to throw in the box."
            />
          )}

          <button
            onClick={clearCart}
            className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-bold rounded border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] transition-all"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6 sticky top-24">
            <h2 className="text-2xl font-black text-white mb-6 text-center">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-white">
                <span className="font-bold">Items ({items.reduce((acc, item) => acc + item.quantity, 0)}):</span>
                <span className="font-black">${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span className="font-bold">Shipping:</span>
                <span className="font-black">FREE</span>
              </div>
              <div className="border-t-2 border-white pt-3">
                <div className="flex justify-between text-white">
                  <span className="text-xl font-black">TOTAL:</span>
                  <span className="text-2xl font-black">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={24} />
              CHECKOUT
            </button>

            <p className="text-xs text-white text-center mt-4 opacity-80">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
