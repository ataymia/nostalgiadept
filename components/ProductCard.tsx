'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Use compareAtPrice for sale display, otherwise just price
  const displayPrice = product.price;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  // Get description - use new fields first, fall back to legacy
  const description = product.descriptionShort || product.description || '';

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-black rounded border-2 border-black shadow-[2px_2px_0_#000]">
              SALE!
            </span>
          )}
          {product.featured && (
            <span className="bg-cyan-400 text-black px-3 py-1 text-xs font-black rounded border-2 border-black shadow-[2px_2px_0_#000]">
              HOT!
            </span>
          )}
          {product.regionTag && (
            <span className="bg-green-400 text-black px-3 py-1 text-xs font-black rounded border-2 border-black shadow-[2px_2px_0_#000]">
              REGIONAL
            </span>
          )}
          {product.rarity === 'limited' && (
            <span className="bg-purple-400 text-black px-3 py-1 text-xs font-black rounded border-2 border-black shadow-[2px_2px_0_#000]">
              LIMITED
            </span>
          )}
        </div>

        {/* Image Placeholder */}
        <div className="relative w-full h-48 bg-gradient-to-br from-pink-300 to-cyan-300 flex items-center justify-center border-b-4 border-black">
          <span className="text-6xl">📦</span>
        </div>

        {/* Content */}
        <div className="p-4 bg-white">
          <h3 className="font-black text-lg text-black mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <div>
                  <span className="text-2xl font-black text-pink-600">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.compareAtPrice!.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-black text-purple-600">
                  ${displayPrice.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              ADD
            </button>
          </div>

          {product.trackInventory && product.stock < 10 && (
            <p className="mt-2 text-xs text-red-600 font-bold">
              Only {product.stock} left!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
