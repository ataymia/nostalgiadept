'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/types';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  // Build nav items from categories (excluding checkout-candy-lane which is internal)
  const navItems = [
    { label: 'Home', href: '/' },
    ...CATEGORIES
      .filter(cat => cat.value !== 'checkout-candy-lane')
      .map(cat => ({
        label: cat.label,
        href: `/category/${cat.value}`,
      })),
    { label: 'Sale', href: '/sale' },
  ];

  return (
    <header className="brick-wall-bg sticky top-0 z-50 border-b-4 border-black shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-4xl md:text-5xl font-black neon-text-pink tracking-tight">
              NOSTALGIA
            </h1>
            <span className="text-4xl md:text-5xl font-black neon-text-cyan ml-2">
              DEPT
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="hidden md:block px-4 py-2 bg-yellow-400 text-black font-bold rounded border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              ADMIN
            </Link>
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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden px-3 py-2 bg-cyan-400 text-black font-bold rounded border-2 border-black shadow-[3px_3px_0_#000]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block bg-purple-600 border-3 border-black rounded-lg p-4`}
        >
          <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
