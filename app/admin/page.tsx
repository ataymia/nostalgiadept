'use client';

import { useState } from 'react';
import { products as productData } from '@/lib/products';
import { Product, CATEGORIES, ProductCategory, ProductSubcategory, getCategoryLabel, getSubcategoriesForCategory } from '@/lib/types';
import { Pencil, Trash2, Plus } from 'lucide-react';

// Default form data for new products
const getDefaultFormData = (): Partial<Product> => ({
  name: '',
  slug: '',
  descriptionShort: '',
  descriptionLong: '',
  price: 0,
  category: 'pocket-tech-virtual-pets' as ProductCategory,
  subcategory: 'virtual-pets' as ProductSubcategory,
  images: [],
  stock: 0,
  trackInventory: true,
  isActive: true,
  isCheckoutAddon: false,
  rarity: 'common',
  bundleEligible: true,
});

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(productData);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>(getDefaultFormData());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    
    if (editingProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData, updatedAt: now } as Product
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct: Product = {
        id: String(Date.now()),
        name: formData.name || '',
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
        descriptionShort: formData.descriptionShort || '',
        descriptionLong: formData.descriptionLong || '',
        price: formData.price || 0,
        category: formData.category as ProductCategory,
        subcategory: formData.subcategory as ProductSubcategory,
        images: formData.images || ['/images/products/placeholder.jpg'],
        stock: formData.stock || 0,
        trackInventory: formData.trackInventory ?? true,
        isActive: formData.isActive ?? true,
        isCheckoutAddon: formData.isCheckoutAddon ?? false,
        rarity: formData.rarity || 'common',
        bundleEligible: formData.bundleEligible ?? true,
        createdAt: now,
        updatedAt: now,
      };
      setProducts([...products, newProduct]);
      setIsAddingProduct(false);
    }
    
    // Reset form
    setFormData(getDefaultFormData());
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddingProduct(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    setFormData(getDefaultFormData());
  };

  const handleCategoryChange = (category: ProductCategory) => {
    const subcategories = getSubcategoriesForCategory(category);
    setFormData({ 
      ...formData, 
      category, 
      subcategory: subcategories[0] 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6">
        <h1 className="text-4xl md:text-5xl font-black text-black text-center">
          🔧 ADMIN PORTAL 🔧
        </h1>
        <p className="text-center text-black font-bold mt-2">
          Manage your rad product inventory
        </p>
      </div>

      {!isAddingProduct && !editingProduct && (
        <button
          onClick={() => setIsAddingProduct(true)}
          className="mb-6 px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex items-center gap-2"
        >
          <Plus size={24} />
          ADD NEW PRODUCT
        </button>
      )}

      {(isAddingProduct || editingProduct) && (
        <div className="mb-8 bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6">
          <h2 className="text-2xl font-black text-black mb-6">
            {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="product-url-slug"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-bold mb-2">
                  Subcategory *
                </label>
                <select
                  required
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value as ProductSubcategory })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                >
                  {CATEGORIES.find(c => c.value === formData.category)?.subcategories.map((sub) => (
                    <option key={sub.value} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-black font-bold mb-2">
                Short Description *
              </label>
              <input
                type="text"
                required
                value={formData.descriptionShort}
                onChange={(e) => setFormData({ ...formData, descriptionShort: e.target.value })}
                className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                placeholder="Brief description for product cards"
              />
            </div>

            <div>
              <label className="block text-black font-bold mb-2">
                Long Description
              </label>
              <textarea
                value={formData.descriptionLong}
                onChange={(e) => setFormData({ ...formData, descriptionLong: e.target.value })}
                className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                rows={3}
                placeholder="Detailed product description"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-black font-bold mb-2">
                  Price * ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-2">
                  Rarity
                </label>
                <select
                  value={formData.rarity}
                  onChange={(e) => setFormData({ ...formData, rarity: e.target.value as 'common' | 'hard_to_find' | 'limited' })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                >
                  <option value="common">Common</option>
                  <option value="hard_to_find">Hard to Find</option>
                  <option value="limited">Limited</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Active</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isCheckoutAddon}
                  onChange={(e) => setFormData({ ...formData, isCheckoutAddon: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Checkout Add-On</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.trackInventory}
                  onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Track Inventory</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.bundleEligible}
                  onChange={(e) => setFormData({ ...formData, bundleEligible: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Bundle Eligible</span>
              </label>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] transition-all"
              >
                {editingProduct ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-400 text-black font-black rounded-lg border-4 border-black shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] transition-all"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] p-6">
        <h2 className="text-2xl font-black text-black mb-6">
          PRODUCT INVENTORY ({products.length})
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left p-3 font-black">NAME</th>
                <th className="text-left p-3 font-black">CATEGORY</th>
                <th className="text-left p-3 font-black">PRICE</th>
                <th className="text-left p-3 font-black">STOCK</th>
                <th className="text-left p-3 font-black">STATUS</th>
                <th className="text-left p-3 font-black">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b-2 border-gray-200">
                  <td className="p-3 font-bold">{product.name}</td>
                  <td className="p-3 text-sm">
                    {getCategoryLabel(product.category)}
                  </td>
                  <td className="p-3 font-bold">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-3 font-bold">{product.stock}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isActive && (
                        <span className="px-2 py-1 bg-green-400 text-black text-xs font-black rounded">
                          ACTIVE
                        </span>
                      )}
                      {product.isCheckoutAddon && (
                        <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-black rounded">
                          ADD-ON
                        </span>
                      )}
                      {product.rarity === 'limited' && (
                        <span className="px-2 py-1 bg-purple-400 text-black text-xs font-black rounded">
                          LIMITED
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 bg-blue-500 text-white rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-500 text-white rounded border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-[3px_3px_0_#000] transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
