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

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  // Build category list for quick links (only show a few highlighted ones)
  const highlightedCategories = CATEGORIES
    .filter(cat => ['pocket-tech-virtual-pets', 'candy-snacks-drinks', 'mystery-subscription-boxes', 'the-vault'].includes(cat.value))
    .map(cat => ({
      name: cat.label,
      href: `/category/${cat.value}`,
      emoji: categoryEmojis[cat.value] || '📦',
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - More Fresh Prince/Graffiti style */}
      <div className="mb-12 relative overflow-hidden rounded-2xl border-4 border-black shadow-[10px_10px_0_#000]">
        {/* Graffiti-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg" style={{ textShadow: '4px 4px 0 #000, -2px -2px 0 #ff00ff' }}>
            TOTALLY RAD 90s VIBES! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-white font-bold mb-6 drop-shadow" style={{ textShadow: '2px 2px 0 #000' }}>
            Step into the time machine and grab all your favorite retro gear!
          </p>
          <Link
            href="/category/pocket-tech-virtual-pets"
            className="inline-block px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
          >
            SHOP NOW →
          </Link>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-4 right-4 text-[120px] opacity-30 transform rotate-12">🎮</div>
        <div className="absolute bottom-4 right-24 text-[80px] opacity-20 transform -rotate-12">📼</div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-cyan-400 rounded-full opacity-40" />
        <div className="absolute bottom-8 right-48 w-12 h-12 bg-yellow-400 transform rotate-45 opacity-40" />
      </div>

      {/* Quick Category Links - Sleek horizontal scroll */}
      <section className="mb-10">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {highlightedCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full border-3 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </Link>
          ))}
          <Link
            href="/sale"
            className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black rounded-full border-3 border-black shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <span className="text-2xl">🏷️</span>
            <span className="whitespace-nowrap">SALE</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-4">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center" style={{ textShadow: '2px 2px 0 #000' }}>
            🔥 FEATURED PRODUCTS 🔥
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Browse More CTA */}
      <section className="text-center">
        <p className="text-gray-400 mb-4">Want to see more? Check out all our categories in the menu! 👈</p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-800 text-purple-300 rounded-lg border-2 border-purple-600">
          <span>←</span>
          <span className="font-bold">Hover over the side menu to explore</span>
        </div>
      </section>
    </div>
  );
}
