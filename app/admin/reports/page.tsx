'use client';

import { products } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download, Package } from 'lucide-react';

export default function ReportsPage() {
  // Calculate real stats from products
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;
  const avgProductPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
  
  // Calculate category distribution
  const categoryStats = CATEGORIES.filter(c => c.value !== 'checkout-candy-lane').map(cat => {
    const categoryProducts = products.filter(p => p.category === cat.value);
    const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
    return {
      name: cat.label,
      count: categoryProducts.length,
      value: categoryValue,
    };
  }).sort((a, b) => b.value - a.value);

  // Export products as CSV
  const exportProductsCSV = () => {
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Active'];
    const rows = products.map(p => [
      p.id,
      p.name,
      p.category,
      p.price.toString(),
      p.stock.toString(),
      p.isActive ? 'Yes' : 'No'
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export inventory as CSV
  const exportInventoryCSV = () => {
    const headers = ['ID', 'Name', 'Stock', 'Reorder At', 'Value'];
    const rows = products.filter(p => p.trackInventory).map(p => [
      p.id,
      p.name,
      p.stock.toString(),
      (p.reorderThreshold || 10).toString(),
      (p.price * p.stock).toFixed(2)
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">View real-time inventory and product metrics</p>
        </div>
      </div>

      {/* Real Stats from Product Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <DollarSign size={24} className="mb-2" />
          <p className="text-sm opacity-80">Inventory Value</p>
          <p className="text-3xl font-bold">${totalInventoryValue.toLocaleString()}</p>
          <p className="text-sm mt-2 opacity-80">Based on current stock</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
          <Package size={24} className="mb-2" />
          <p className="text-sm opacity-80">Total Products</p>
          <p className="text-3xl font-bold">{totalProducts}</p>
          <p className="text-sm mt-2 opacity-80">{activeProducts} active</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <TrendingUp size={24} className="mb-2" />
          <p className="text-sm opacity-80">Avg. Product Price</p>
          <p className="text-3xl font-bold">${avgProductPrice.toFixed(2)}</p>
          <p className="text-sm mt-2 opacity-80">Across all products</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <BarChart3 size={24} className="mb-2" />
          <p className="text-sm opacity-80">Categories</p>
          <p className="text-3xl font-bold">{CATEGORIES.length - 1}</p>
          <p className="text-sm mt-2 opacity-80">Product categories</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Inventory by Category</h3>
          <div className="space-y-3">
            {categoryStats.slice(0, 6).map((cat, index) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 text-xs font-bold rounded">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} products</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  ${cat.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Export Data</h3>
          <div className="space-y-3">
            <button 
              onClick={exportProductsCSV}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Products</p>
                <p className="text-sm text-gray-500">Full product catalog as CSV</p>
              </div>
            </button>
            <button 
              onClick={exportInventoryCSV}
              className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Inventory</p>
                <p className="text-sm text-gray-500">Current stock levels as CSV</p>
              </div>
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <ShoppingCart size={14} className="inline mr-1" />
              Order and customer reports will be available once order data is collected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
