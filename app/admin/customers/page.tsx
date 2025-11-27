'use client';

import { Users, ShoppingBag, DollarSign, Star } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View and manage customer information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Users size={24} className="text-purple-600 mb-2" />
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ShoppingBag size={24} className="text-blue-600 mb-2" />
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <DollarSign size={24} className="text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Avg. Lifetime Value</p>
          <p className="text-2xl font-bold text-gray-900">$0.00</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Star size={24} className="text-yellow-600 mb-2" />
          <p className="text-sm text-gray-500">Active Subscribers</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Users size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Customers Yet</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Customer data will appear here once orders start coming in.
        </p>
      </div>
    </div>
  );
}
