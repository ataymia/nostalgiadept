import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 relative bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-2xl border-4 border-black shadow-[10px_10px_0_#000] p-8 md:p-12 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            TOTALLY RAD 90s VIBES! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-white font-bold mb-6 drop-shadow">
            Step into the time machine and grab all your favorite retro gear!
          </p>
          <Link
            href="/category/90s-collections"
            className="inline-block px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
          >
            SHOP NOW →
          </Link>
        </div>
        <div className="absolute top-0 right-0 text-[200px] opacity-20">
          🎮
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="mb-6 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-4">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center">
            🔥 FEATURED PRODUCTS 🔥
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <div className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg border-4 border-black shadow-[5px_5px_0_#000] p-4">
          <h2 className="text-3xl md:text-4xl font-black text-black text-center">
            ⚡ SHOP BY CATEGORY ⚡
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: '90s Collections', href: '/category/90s-collections', emoji: '📼' },
            { name: 'Regional Snacks', href: '/category/regional-snacks', emoji: '🌽' },
            { name: 'Snacks', href: '/category/snacks', emoji: '🍬' },
            { name: "Women's Apparel", href: '/category/womens-apparel', emoji: '👗' },
            { name: "Men's Apparel", href: '/category/mens-apparel', emoji: '👔' },
            { name: 'Shoes', href: '/category/shoes', emoji: '👟' },
            { name: 'Toys', href: '/category/toys', emoji: '🎮' },
            { name: 'Accessories', href: '/category/accessories', emoji: '🎒' },
            { name: 'Sale', href: '/sale', emoji: '🏷️' },
          ].map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all p-8 text-center overflow-hidden"
            >
              <div className="text-6xl mb-4">{category.emoji}</div>
              <h3 className="text-2xl font-black text-white drop-shadow-lg">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
