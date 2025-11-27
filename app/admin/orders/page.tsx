'use client';

import { ShoppingCart, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

// Orders will be populated from real data when available
const orders: Array<{ id: string; date: string; customer: string; email: string; total: number; status: string; items: number }> = [];

const statusConfig: Record<string, { icon: typeof ShoppingCart; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders & Fulfillment</h1>
          <p className="text-gray-500 mt-1">Manage customer orders and shipping</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className={`${config.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2">
                <Icon size={20} className={config.color} />
                <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
              </div>
              <p className={`text-2xl font-bold mt-2 ${config.color}`}>{count > 0 ? count : '--'}</p>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Items</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 ? (
                orders.map(order => {
                  const config = statusConfig[order.status];
                  const Icon = config.icon;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="p-4 font-medium text-purple-600">{order.id}</td>
                      <td className="p-4 text-gray-600">{order.date}</td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </td>
                      <td className="p-4 text-gray-600">{order.items}</td>
                      <td className="p-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                          <Icon size={12} />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders yet. Orders will appear here when customers make purchases.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
