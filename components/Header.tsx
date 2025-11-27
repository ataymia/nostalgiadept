'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-40 border-b-4 border-black shadow-lg bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900">
      <div className="container mx-auto px-4 py-4 pl-20">
        {/* Top Bar - Clean and simple */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl md:text-5xl font-black neon-text-pink tracking-tight">
              NOSTALGIA
            </h1>
            <span className="text-3xl md:text-5xl font-black neon-text-cyan ml-2">
              DEPT
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative px-4 py-2 bg-pink-500 text-white font-bold rounded border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">CART</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 border-black">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
