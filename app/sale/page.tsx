import ProductCard from '@/components/ProductCard';
import { getOnSaleProducts } from '@/lib/products';

export default function SalePage() {
  const saleProducts = getOnSaleProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6 md:p-8 animate-pulse">
        <h1 className="text-4xl md:text-6xl font-black text-black text-center drop-shadow-lg">
          🔥 MEGA SALE! 🔥
        </h1>
        <p className="text-center text-black text-xl mt-2 font-bold">
          Don&apos;t miss these RADICAL deals!
        </p>
      </div>

      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">🛍️</div>
          <p className="text-2xl font-bold text-white neon-text-yellow">
            No items on sale right now!
          </p>
          <p className="text-gray-300 mt-2">
            Check back soon for amazing deals!
          </p>
        </div>
      )}
    </div>
  );
}
