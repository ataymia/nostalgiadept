'use client';

import { products } from '@/lib/products';
import { 
  Package, 
  AlertTriangle,
} from 'lucide-react';

// Low stock alert item
function LowStockItem({ product }: { product: typeof products[0] }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">
          📦
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
          <p className="text-xs text-gray-500 capitalize">{product.category.replace(/-/g, ' ')}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${product.stock <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
          {product.stock} left
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // Real stats from products catalog
  const activeProducts = products.filter(p => p.isActive);
  const lowStockProducts = products.filter(p => 
    p.stock <= (p.reorderThreshold || 10) && p.trackInventory
  ).slice(0, 5);
  
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your store inventory and settings.</p>
      </div>

      {/* Quick Stats - Only real data */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeProducts.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">${totalInventoryValue.toFixed(0)}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts - Real data */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-yellow-500" />
          <h2 className="text-lg font-bold text-gray-900">Low Stock Alerts</h2>
        </div>
        {lowStockProducts.length > 0 ? (
          <div>
            {lowStockProducts.map((product) => (
              <LowStockItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">All products are well stocked! 🎉</p>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Getting Started</h3>
        <ul className="space-y-2 text-sm text-purple-100">
          <li>• Use the sidebar to manage products, inventory, and orders</li>
          <li>• Add real product data through the Products section</li>
          <li>• Configure store settings in the Settings page</li>
          <li>• Connect payment processing in Settings</li>
        </ul>
      </div>
    </div>
  );
}
