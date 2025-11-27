'use client';

import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">View sales and performance metrics</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <DollarSign size={24} className="mb-2" />
          <p className="text-sm opacity-80">Total Revenue</p>
          <p className="text-3xl font-bold">$12,450</p>
          <p className="text-sm mt-2 opacity-80">+12% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
          <ShoppingCart size={24} className="mb-2" />
          <p className="text-sm opacity-80">Total Orders</p>
          <p className="text-3xl font-bold">142</p>
          <p className="text-sm mt-2 opacity-80">+8% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <TrendingUp size={24} className="mb-2" />
          <p className="text-sm opacity-80">Avg. Order Value</p>
          <p className="text-3xl font-bold">$87.67</p>
          <p className="text-sm mt-2 opacity-80">+3% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <BarChart3 size={24} className="mb-2" />
          <p className="text-sm opacity-80">Conversion Rate</p>
          <p className="text-3xl font-bold">3.2%</p>
          <p className="text-sm mt-2 opacity-80">+0.5% from last month</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Available Reports</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Sales by Product</p>
              <p className="text-sm text-gray-500">Revenue and units sold per product</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Sales by Category</p>
              <p className="text-sm text-gray-500">Category performance breakdown</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Sales by Region</p>
              <p className="text-sm text-gray-500">Geographic distribution of orders</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">Subscription Metrics</p>
              <p className="text-sm text-gray-500">MRR, churn, and subscriber counts</p>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Export Options</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3">
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Orders</p>
                <p className="text-sm text-gray-500">All orders with line items</p>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3">
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Products</p>
                <p className="text-sm text-gray-500">Full product catalog</p>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3">
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Customers</p>
                <p className="text-sm text-gray-500">Customer list with stats</p>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3">
              <Download size={18} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Export Inventory</p>
                <p className="text-sm text-gray-500">Current stock levels</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
