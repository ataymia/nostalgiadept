import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.value === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6 md:p-8">
        <h1 className="text-4xl md:text-5xl font-black text-white text-center drop-shadow-lg">
          {category.label}
        </h1>
        <p className="text-center text-white text-lg mt-2 font-bold">
          {products.length} radical products found!
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">😢</div>
          <p className="text-2xl font-bold text-white neon-text-cyan">
            No products in this category yet!
          </p>
          <p className="text-gray-300 mt-2">
            Check back soon for more rad stuff!
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.value,
  }));
}
