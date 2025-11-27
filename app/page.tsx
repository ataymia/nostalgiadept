import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
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

// Categories to highlight on the home page quick links
const HIGHLIGHTED_CATEGORY_SLUGS = [
  'pocket-tech-virtual-pets',
  'candy-snacks-drinks',
  'mystery-subscription-boxes',
  'the-vault',
];

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  // Build category list for quick links (only show highlighted ones)
  const highlightedCategories = CATEGORIES
    .filter(cat => HIGHLIGHTED_CATEGORY_SLUGS.includes(cat.value))
    .map(cat => ({
      name: cat.label,
      href: `/category/${cat.value}`,
      emoji: categoryEmojis[cat.value] || '📦',
    }));

  return (
    <div className="container mx-auto px-3 py-3">
      {/* Hero Section - Slim & Professional */}
      <div className="mb-4 relative overflow-hidden rounded-lg border-2 border-black shadow-[3px_3px_0_#000]">
        {/* Graffiti-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10 px-5 py-4 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white drop-shadow-lg" style={{ textShadow: '2px 2px 0 #000' }}>
              TOTALLY RAD 90s VIBES! 🎉
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium" style={{ textShadow: '1px 1px 0 #000' }}>
              Step into the time machine and grab all your favorite retro gear
            </p>
          </div>
          <Link
            href="/category/pocket-tech-virtual-pets"
            className="inline-block px-5 py-2 bg-yellow-400 text-black text-sm font-black rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all whitespace-nowrap"
          >
            SHOP NOW →
          </Link>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-1 right-2 text-4xl opacity-20 transform rotate-12 hidden md:block">🎮</div>
        <div className="absolute bottom-1 right-20 text-2xl opacity-15 transform -rotate-12 hidden md:block">📼</div>
      </div>

      {/* Quick Category Links - Compact pills */}
      <section className="mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {highlightedCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-purple-700/80 hover:bg-purple-600 text-white font-semibold text-xs rounded-full border border-purple-500/50 transition-all"
            >
              <span>{category.emoji}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </Link>
          ))}
          <Link
            href="/sale"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-full border border-yellow-600/50 transition-all"
          >
            <span>🏷️</span>
            <span className="whitespace-nowrap">SALE</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          <h2 className="text-lg md:text-xl font-black text-white px-3" style={{ textShadow: '1px 1px 0 #000' }}>
            🔥 FEATURED 🔥
          </h2>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Browse More CTA */}
      <section className="text-center pb-3">
        <p className="text-gray-400 text-xs mb-2">Want more? Check the menu! 👈</p>
      </section>
    </div>
  );
}
