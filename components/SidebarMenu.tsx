'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';

// Map of category values to emojis
const categoryEmojis: Record<string, string> = {
  'pocket-tech-virtual-pets': '🎮',
  'grow-kits-room-decor': '🌱',
  'toys-games-fidgets': '🧸',
  'stickers-stationery-school': '📝',
  'vhs-analog-corner': '📼',
  'candy-snacks-drinks': '🍬',
  'mystery-subscription-boxes': '📦',
  'retro-apparel-accessories': '👕',
  'the-vault': '🔐',
};

export default function SidebarMenu() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Build nav items from categories (excluding checkout-candy-lane which is internal)
  const categoryItems = CATEGORIES
    .filter(cat => cat.value !== 'checkout-candy-lane')
    .map(cat => ({
      label: cat.label,
      href: `/category/${cat.value}`,
      emoji: categoryEmojis[cat.value] || '📦',
    }));

  return (
    <div 
      className={`sidebar-menu ${isExpanded ? 'expanded' : 'collapsed'} bg-gradient-to-b from-purple-900 via-purple-800 to-pink-900 border-r-4 border-black shadow-[5px_0_20px_rgba(255,0,255,0.3)]`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 px-4 flex items-center justify-center border-b-2 border-purple-700 bg-purple-950 hover:bg-purple-800 transition-colors"
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        {isExpanded ? (
          <ChevronLeft size={24} className="text-cyan-400" />
        ) : (
          <ChevronRight size={24} className="text-cyan-400" />
        )}
        {isExpanded && (
          <span className="ml-2 text-white font-bold text-sm neon-text-cyan">MENU</span>
        )}
      </button>

      {/* Navigation Items */}
      <nav className="py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
        {/* Home Link */}
        <Link href="/" className="sidebar-menu-btn text-white hover:bg-pink-600/50 group">
          <span className="text-2xl flex-shrink-0">🏠</span>
          <span className="sidebar-menu-text font-bold text-sm group-hover:text-cyan-300 transition-colors">
            Home
          </span>
        </Link>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-purple-600" />

        {/* Category Links */}
        {categoryItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className="sidebar-menu-btn text-white hover:bg-pink-600/50 group"
          >
            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
            <span className="sidebar-menu-text font-bold text-sm group-hover:text-cyan-300 transition-colors">
              {item.label}
            </span>
          </Link>
        ))}

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-purple-600" />

        {/* Sale Link */}
        <Link href="/sale" className="sidebar-menu-btn text-yellow-400 hover:bg-yellow-600/30 group">
          <span className="text-2xl flex-shrink-0">🏷️</span>
          <span className="sidebar-menu-text font-black text-sm group-hover:text-yellow-200 transition-colors">
            SALE
          </span>
        </Link>
      </nav>

      {/* Expand Hint */}
      {!isExpanded && (
        <div className="absolute bottom-4 left-0 w-full text-center">
          <span className="text-purple-400 text-xs">More</span>
        </div>
      )}
    </div>
  );
}
