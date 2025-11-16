import { getProductById, mockProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.value === product.category);

  return <ProductDetailClient product={product} category={category} />;
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}
