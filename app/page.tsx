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
    <div className="container mx-auto px-4 py-4">
      {/* Hero Section - More Fresh Prince/Graffiti style */}
      <div className="mb-6 relative overflow-hidden rounded-xl border-3 border-black shadow-[6px_6px_0_#000]">
        {/* Graffiti-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10 p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow-lg" style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #ff00ff' }}>
            TOTALLY RAD 90s VIBES! 🎉
          </h1>
          <p className="text-lg md:text-xl text-white font-bold mb-4 drop-shadow" style={{ textShadow: '2px 2px 0 #000' }}>
            Step into the time machine and grab all your favorite retro gear!
          </p>
          <Link
            href="/category/pocket-tech-virtual-pets"
            className="inline-block px-6 py-3 bg-yellow-400 text-black text-lg font-black rounded-lg border-3 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            SHOP NOW →
          </Link>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-2 right-2 text-[80px] opacity-30 transform rotate-12">🎮</div>
        <div className="absolute bottom-2 right-16 text-[50px] opacity-20 transform -rotate-12">📼</div>
        <div className="absolute top-1/2 right-4 w-10 h-10 bg-cyan-400 rounded-full opacity-40" />
        <div className="absolute bottom-4 right-32 w-8 h-8 bg-yellow-400 transform rotate-45 opacity-40" />
      </div>

      {/* Quick Category Links - Sleek horizontal scroll */}
      <section className="mb-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {highlightedCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-full border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <span className="text-lg">{category.emoji}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </Link>
          ))}
          <Link
            href="/sale"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-sm rounded-full border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
          >
            <span className="text-lg">🏷️</span>
            <span className="whitespace-nowrap">SALE</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-8">
        <div className="mb-4 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg border-3 border-black shadow-[4px_4px_0_#000] p-3">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center" style={{ textShadow: '2px 2px 0 #000' }}>
            🔥 FEATURED PRODUCTS 🔥
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Browse More CTA */}
      <section className="text-center pb-4">
        <p className="text-gray-400 text-sm mb-3">Want to see more? Check out all our categories in the menu! 👈</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800 text-purple-300 rounded-lg border border-purple-600 text-sm">
          <span>←</span>
          <span className="font-bold">Hover over the side menu to explore</span>
        </div>
      </section>
    </div>
  );
}
