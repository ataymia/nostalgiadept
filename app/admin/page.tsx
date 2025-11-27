'use client';

import { products } from '@/lib/products';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Dashboard summary card component
function SummaryCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  color 
}: { 
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              changeType === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}

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
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${product.stock <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
          {product.stock} left
        </p>
        <p className="text-xs text-gray-500">
          Reorder at {product.reorderThreshold || 10}
        </p>
      </div>
    </div>
  );
}

// Top product item
function TopProductItem({ 
  product, 
  rank,
  stat 
}: { 
  product: typeof products[0];
  rank: number;
  stat: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-700 text-sm font-bold rounded">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
        <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <span className="text-sm font-semibold text-gray-700">{stat}</span>
    </div>
  );
}

export default function AdminDashboard() {
  // Calculate mock stats from products
  const activeProducts = products.filter(p => p.isActive);
  const lowStockProducts = products.filter(p => 
    p.stock <= (p.reorderThreshold || 10) && p.trackInventory
  ).slice(0, 5);
  
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  
  // Mock top products (just use first 5 for now)
  const topProducts = products.filter(p => p.isActive && !p.isCheckoutAddon).slice(0, 5);
  
  // Mock category stats
  const categoryStats = products.reduce((acc, p) => {
    const cat = p.category;
    if (!acc[cat]) {
      acc[cat] = { count: 0, value: 0 };
    }
    acc[cat].count++;
    acc[cat].value += p.price * p.stock;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  const topCategories = Object.entries(categoryStats)
    .filter(([cat]) => cat !== 'checkout-candy-lane')
    .sort((a, b) => b[1].value - a[1].value)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Revenue (This Month)"
          value="$12,450.00"
          change="+12.5% from last month"
          changeType="up"
          icon={DollarSign}
          color="bg-green-500"
        />
        <SummaryCard
          title="Orders (This Month)"
          value="142"
          change="+8.2% from last month"
          changeType="up"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Avg. Order Value"
          value={`$${avgPrice.toFixed(2)}`}
          change="-2.1% from last month"
          changeType="down"
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <SummaryCard
          title="Active Products"
          value={activeProducts.length.toString()}
          icon={Package}
          color="bg-orange-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-1">
            {topProducts.map((product, index) => (
              <TopProductItem
                key={product.id}
                product={product}
                rank={index + 1}
                stat={`${Math.floor((product.stock % 50) + 10)} sold`}
              />
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Categories</h2>
          <div className="space-y-3">
            {topCategories.map(([category, stats], index) => (
              <div key={category} className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-cyan-100 text-cyan-700 text-sm font-bold rounded">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate capitalize">
                    {category.replace(/-/g, ' ')}
                  </p>
                  <p className="text-xs text-gray-500">{stats.count} products</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  ${stats.value.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
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
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Total Inventory Value</h3>
          <p className="text-3xl font-black">${totalInventoryValue.toFixed(2)}</p>
          <p className="text-purple-200 text-sm mt-2">{products.length} products in catalog</p>
        </div>
        
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Checkout Add-Ons</h3>
          <p className="text-3xl font-black">{products.filter(p => p.isCheckoutAddon).length}</p>
          <p className="text-cyan-200 text-sm mt-2">Impulse items available</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Active Subscriptions</h3>
          <p className="text-3xl font-black">0</p>
          <p className="text-orange-200 text-sm mt-2">$0.00 MRR</p>
        </div>
      </div>
    </div>
  );
}
