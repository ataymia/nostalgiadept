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
      <div className="group relative bg-[#1e1e2e] rounded-md border border-purple-800/50 hover:border-pink-500/70 shadow-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all overflow-hidden">
        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-yellow-400 text-black px-1.5 py-0.5 text-[10px] font-bold rounded">
              SALE
            </span>
          )}
          {product.featured && (
            <span className="bg-pink-500 text-white px-1.5 py-0.5 text-[10px] font-bold rounded">
              HOT
            </span>
          )}
          {product.regionTag && (
            <span className="bg-green-500 text-white px-1.5 py-0.5 text-[10px] font-bold rounded">
              REGIONAL
            </span>
          )}
          {product.rarity === 'limited' && (
            <span className="bg-purple-500 text-white px-1.5 py-0.5 text-[10px] font-bold rounded">
              LIMITED
            </span>
          )}
        </div>

        {/* Image Placeholder */}
        <div className="relative w-full aspect-[5/4] bg-gradient-to-br from-purple-900/50 to-pink-900/30 flex items-center justify-center">
          <span className="text-xl opacity-60">📦</span>
        </div>

        {/* Content */}
        <div className="p-2.5">
          <h3 className="font-bold text-sm text-white mb-1 line-clamp-1 group-hover:text-pink-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs mb-2 line-clamp-1">
            {description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div>
              {hasDiscount ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black text-pink-400">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-500 line-through">
                    ${product.compareAtPrice!.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-base font-black text-cyan-400">
                  ${displayPrice.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="p-1.5 bg-purple-600 hover:bg-pink-500 text-white rounded transition-colors"
              title="Add to cart"
            >
              <ShoppingCart size={14} />
            </button>
          </div>

          {product.trackInventory && product.stock < 10 && (
            <p className="mt-1 text-[10px] text-orange-400 font-medium">
              Only {product.stock} left
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
