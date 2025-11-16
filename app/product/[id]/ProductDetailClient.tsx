'use client';

import { Product, CATEGORIES } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductDetailClientProps {
  product: Product;
  category: typeof CATEGORIES[0] | undefined;
}

export default function ProductDetailClient({ product, category }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const displayPrice = product.onSale && product.salePrice
    ? product.salePrice
    : product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-bold rounded border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative bg-gradient-to-br from-pink-300 to-cyan-300 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] aspect-square flex items-center justify-center overflow-hidden">
          <div className="text-[200px]">📦</div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.onSale && (
              <span className="bg-yellow-400 text-black px-4 py-2 text-sm font-black rounded border-2 border-black shadow-[3px_3px_0_#000]">
                SALE!
              </span>
            )}
            {product.featured && (
              <span className="bg-cyan-400 text-black px-4 py-2 text-sm font-black rounded border-2 border-black shadow-[3px_3px_0_#000]">
                HOT!
              </span>
            )}
            {product.isRegional && (
              <span className="bg-green-400 text-black px-4 py-2 text-sm font-black rounded border-2 border-black shadow-[3px_3px_0_#000]">
                REGIONAL
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6 md:p-8">
            {category && (
              <p className="text-sm font-bold text-purple-600 mb-2">
                {category.label}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
              {product.name}
            </h1>

            <p className="text-gray-700 text-lg mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              {product.onSale && product.salePrice ? (
                <div>
                  <span className="text-5xl font-black text-pink-600">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-2xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <p className="text-yellow-600 font-bold mt-2">
                    Save ${(product.price - displayPrice).toFixed(2)}!
                  </p>
                </div>
              ) : (
                <span className="text-5xl font-black text-purple-600">
                  ${displayPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Inventory */}
            <div className="mb-6">
              {product.inventory > 0 ? (
                <div>
                  <p className="text-green-600 font-bold mb-2">
                    ✓ In Stock
                  </p>
                  {product.inventory < 10 && (
                    <p className="text-red-600 font-bold">
                      Only {product.inventory} left!
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-red-600 font-bold">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inventory > 0 && (
              <div className="mb-6">
                <label className="block text-black font-bold mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-purple-500 text-white text-2xl font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] transition-all"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.inventory}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.inventory, parseInt(e.target.value) || 1)))}
                    className="w-20 h-12 text-center text-2xl font-black border-4 border-black rounded"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="w-12 h-12 bg-purple-500 text-white text-2xl font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            {product.inventory > 0 && (
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} />
                {addedToCart ? 'ADDED TO CART! ✓' : 'ADD TO CART'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
