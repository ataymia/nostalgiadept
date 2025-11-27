'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getUpsellProducts } from '@/lib/services/upsellService';
import UpsellStrip from '@/components/UpsellStrip';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [upsellProducts, setUpsellProducts] = useState<Product[]>([]);

  // Fetch upsell products when cart changes (checkout context - max 3)
  useEffect(() => {
    const fetchUpsells = async () => {
      if (items.length > 0) {
        const cartProductIds = items.map((item) => item.product.id);
        const products = await getUpsellProducts(cartProductIds, 'checkout');
        setUpsellProducts(products);
      } else {
        setUpsellProducts([]);
      }
    };

    fetchUpsells();
  }, [items]);

  const handlePlaceOrder = async () => {
    // For static site demo, show alert
    // In production, this would integrate with Stripe
    alert('Order placement would integrate with Stripe payment processing here!');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-4xl font-black neon-text-pink mb-4">
          Nothing to Checkout!
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Add some items to your cart first.
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
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6">
        <h1 className="text-4xl md:text-5xl font-black text-white text-center">
          💳 CHECKOUT 💳
        </h1>
      </div>

      {/* Back to Cart Link */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-400 font-bold mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-6">
            <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
              📦 Shipping Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter last name"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="12345"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-6">
            <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
              <CreditCard size={24} /> Payment Information
            </h2>
            <p className="text-gray-600 mb-4">
              Payment processing is handled securely by Stripe.
            </p>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500 font-bold">
                [Stripe Payment Element would be embedded here]
              </p>
            </div>
          </div>

          {/* Upsell Strip - "Last call for throwback treats" */}
          {upsellProducts.length > 0 && (
            <UpsellStrip
              products={upsellProducts}
              heading="Last call for throwback treats"
              subtext="Quick add-ons that ship with this order."
            />
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6 sticky top-24">
            <h2 className="text-2xl font-black text-white mb-6 text-center">
              ORDER SUMMARY
            </h2>

            {/* Order Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 bg-white/10 rounded-lg p-2"
                >
                  <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      {item.product.name}
                    </p>
                    <p className="text-white/70 text-xs">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-white font-black">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 border-t border-white/20 pt-4">
              <div className="flex justify-between text-white">
                <span className="font-bold">
                  Items ({items.reduce((acc, item) => acc + item.quantity, 0)}):
                </span>
                <span className="font-black">${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white">
                <span className="font-bold">Shipping:</span>
                <span className="font-black">FREE</span>
              </div>
              <div className="flex justify-between text-white">
                <span className="font-bold">Tax:</span>
                <span className="font-black">Calculated at payment</span>
              </div>
              <div className="border-t-2 border-white pt-3">
                <div className="flex justify-between text-white">
                  <span className="text-xl font-black">TOTAL:</span>
                  <span className="text-2xl font-black">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={24} />
              PLACE ORDER
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
