'use client';

import { products } from '@/lib/products';
import { AlertTriangle, Package, TrendingDown, RefreshCw } from 'lucide-react';

export default function InventoryPage() {
  const lowStockProducts = products.filter(p => 
    p.trackInventory && p.stock <= (p.reorderThreshold || 10)
  );

  const outOfStockProducts = products.filter(p => p.trackInventory && p.stock === 0);
  
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500 mt-1">Track and manage your product inventory</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Package size={24} className="text-purple-600 mb-2" />
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <TrendingDown size={24} className="text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Inventory Value</p>
          <p className="text-2xl font-bold text-gray-900">${totalInventoryValue.toFixed(0)}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
          <AlertTriangle size={24} className="text-yellow-600 mb-2" />
          <p className="text-sm text-yellow-700">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-700">{lowStockProducts.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <RefreshCw size={24} className="text-red-600 mb-2" />
          <p className="text-sm text-red-700">Out of Stock</p>
          <p className="text-2xl font-bold text-red-700">{outOfStockProducts.length}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-900">Inventory Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Stock</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Reorder At</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.filter(p => p.trackInventory).slice(0, 20).map(product => {
                const isLow = product.stock <= (product.reorderThreshold || 10);
                const isOut = product.stock === 0;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                    <td className="p-4 text-sm text-gray-600 capitalize">
                      {product.category.replace(/-/g, ' ')}
                    </td>
                    <td className={`p-4 font-bold ${isOut ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </td>
                    <td className="p-4 text-gray-600">{product.reorderThreshold || 10}</td>
                    <td className="p-4">
                      {isOut ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">Out of Stock</span>
                      ) : isLow ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Low Stock</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
