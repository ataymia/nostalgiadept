'use client';

import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { Plus, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface UpsellStripProps {
  products: Product[];
  heading: string;
  subtext?: string;
}

/**
 * Get product description with fallback
 */
function getProductDescription(product: Product): string {
  return product.descriptionShort || product.description || '';
}

export default function UpsellStrip({ products, heading, subtext }: UpsellStripProps) {
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeoutsMap = timeoutsRef.current;
    return () => {
      timeoutsMap.forEach((timeout) => clearTimeout(timeout));
      timeoutsMap.clear();
    };
  }, []);

  // Filter out products already in cart
  const cartProductIds = new Set(cartItems.map((item) => item.product.id));
  const availableProducts = products.filter((p) => !cartProductIds.has(p.id));

  if (availableProducts.length === 0) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setAddedItems((prev) => new Set([...prev, product.id]));
    
    // Clear any existing timeout for this product
    const existingTimeout = timeoutsRef.current.get(product.id);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    
    // Reset the "added" state after 2 seconds
    const timeout = setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
      timeoutsRef.current.delete(product.id);
    }, 2000);
    
    timeoutsRef.current.set(product.id, timeout);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-4 border-black shadow-[5px_5px_0_#000] p-4 md:p-6">
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-black text-black">
          🍬 {heading}
        </h3>
        {subtext && (
          <p className="text-sm text-gray-700 mt-1">{subtext}</p>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {availableProducts.map((product) => {
          const isAdded = addedItems.has(product.id);
          const description = getProductDescription(product);
          
          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-48 bg-white rounded-lg border-3 border-black shadow-[3px_3px_0_#000] overflow-hidden"
            >
              {/* Mini image */}
              <div className="h-24 bg-gradient-to-br from-pink-200 to-cyan-200 flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="font-bold text-sm text-black line-clamp-2 mb-1">
                  {product.name.replace('Add-On: ', '')}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-purple-600">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdded}
                    className={`px-3 py-1.5 font-bold text-sm rounded border-2 border-black shadow-[2px_2px_0_#000] transition-all flex items-center gap-1 ${
                      isAdded
                        ? 'bg-green-400 text-black cursor-default'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:shadow-[3px_3px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
