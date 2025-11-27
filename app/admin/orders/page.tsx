'use client';

import { useState } from 'react';
import { ShoppingCart, Package, Truck, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  items: number;
}

const statusConfig: Record<OrderStatus, { icon: typeof ShoppingCart; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    total: '',
    items: '1',
    status: 'pending' as OrderStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ND-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      customer: formData.customer,
      email: formData.email,
      total: parseFloat(formData.total) || 0,
      items: parseInt(formData.items) || 1,
      status: formData.status,
    };
    setOrders([newOrder, ...orders]);
    setFormData({ customer: '', email: '', total: '', items: '1', status: 'pending' });
    setShowAddForm(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders & Fulfillment</h1>
          <p className="text-gray-500 mt-1">Manage customer orders and shipping</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          Add Order
        </button>
      </div>

      {/* Add Order Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Order</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
              <input
                type="number"
                min="1"
                required
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {Object.keys(statusConfig).map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Create Order
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(Object.entries(statusConfig) as [OrderStatus, typeof statusConfig[OrderStatus]][]).map(([status, config]) => {
          const Icon = config.icon;
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} className={`${config.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2">
                <Icon size={20} className={config.color} />
                <span className="text-sm font-medium text-gray-700 capitalize">{status}</span>
              </div>
              <p className={`text-2xl font-bold mt-2 ${config.color}`}>{count}</p>
            </div>
          );
        })}
      </div>

      {/* Orders Table or Empty State */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            Orders will appear here when customers make purchases. Add your first order to get started.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            <Plus size={20} />
            Add First Order
          </button>
        </div>
      ) : (
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
                {orders.map(order => {
                  const config = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-purple-600">{order.id}</td>
                      <td className="p-4 text-gray-600">{order.date}</td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </td>
                      <td className="p-4 text-gray-600">{order.items}</td>
                      <td className="p-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${config.bg} ${config.color}`}
                        >
                          {Object.keys(statusConfig).map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
