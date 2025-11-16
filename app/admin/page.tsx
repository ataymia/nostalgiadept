'use client';

import { useState } from 'react';
import { mockProducts } from '@/lib/products';
import { Product, CATEGORIES, ProductCategory } from '@/lib/types';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '90s-collections',
    images: [],
    inventory: 0,
    isRegional: false,
    featured: false,
    onSale: false,
    salePrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData } as Product
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct: Product = {
        id: String(Date.now()),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        category: formData.category as ProductCategory || '90s-collections',
        images: formData.images || [],
        inventory: formData.inventory || 0,
        isRegional: formData.isRegional || false,
        featured: formData.featured || false,
        onSale: formData.onSale || false,
        salePrice: formData.salePrice,
      };
      setProducts([...products, newProduct]);
      setIsAddingProduct(false);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '90s-collections',
      images: [],
      inventory: 0,
      isRegional: false,
      featured: false,
      onSale: false,
      salePrice: 0,
    });
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
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '90s-collections',
      images: [],
      inventory: 0,
      isRegional: false,
      featured: false,
      onSale: false,
      salePrice: 0,
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
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-black font-bold mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                rows={3}
                placeholder="Enter product description"
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
                  Inventory *
                </label>
                <input
                  type="number"
                  required
                  value={formData.inventory}
                  onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-2">
                  Sale Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.salePrice || ''}
                  onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || undefined })}
                  className="w-full px-4 py-2 border-4 border-black rounded font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.onSale}
                  onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">On Sale</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isRegional}
                  onChange={(e) => setFormData({ ...formData, isRegional: e.target.checked })}
                  className="w-6 h-6 border-2 border-black"
                />
                <span className="font-bold">Regional Product</span>
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
                <th className="text-left p-3 font-black">INVENTORY</th>
                <th className="text-left p-3 font-black">STATUS</th>
                <th className="text-left p-3 font-black">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b-2 border-gray-200">
                  <td className="p-3 font-bold">{product.name}</td>
                  <td className="p-3">
                    {CATEGORIES.find(c => c.value === product.category)?.label}
                  </td>
                  <td className="p-3 font-bold">
                    ${product.price.toFixed(2)}
                    {product.onSale && product.salePrice && (
                      <span className="ml-2 text-pink-600">
                        (${product.salePrice.toFixed(2)})
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-bold">{product.inventory}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {product.featured && (
                        <span className="px-2 py-1 bg-cyan-400 text-black text-xs font-black rounded">
                          HOT
                        </span>
                      )}
                      {product.onSale && (
                        <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-black rounded">
                          SALE
                        </span>
                      )}
                      {product.isRegional && (
                        <span className="px-2 py-1 bg-green-400 text-black text-xs font-black rounded">
                          REGIONAL
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
