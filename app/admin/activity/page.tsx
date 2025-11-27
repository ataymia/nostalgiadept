'use client';

import { ClipboardList, Package, ShoppingCart, Tag, User, Settings } from 'lucide-react';

// Mock activity data
const mockActivities = [
  { id: 1, type: 'product_update', user: 'Admin', description: 'Updated product "Retro Pixel Pet"', time: '2 minutes ago', icon: Package },
  { id: 2, type: 'order_status', user: 'Admin', description: 'Order ND-001 marked as shipped', time: '15 minutes ago', icon: ShoppingCart },
  { id: 3, type: 'discount_change', user: 'Admin', description: 'Created discount code NOSTALGIA10', time: '1 hour ago', icon: Tag },
  { id: 4, type: 'settings_change', user: 'Admin', description: 'Updated shipping settings', time: '2 hours ago', icon: Settings },
  { id: 5, type: 'product_update', user: 'Admin', description: 'Added new product "Mystery VHS 5-Pack"', time: '3 hours ago', icon: Package },
  { id: 6, type: 'order_status', user: 'Admin', description: 'Order ND-002 marked as delivered', time: '5 hours ago', icon: ShoppingCart },
  { id: 7, type: 'product_update', user: 'Admin', description: 'Updated inventory for "90s Candy Box"', time: '1 day ago', icon: Package },
  { id: 8, type: 'user_action', user: 'Admin', description: 'Admin logged in', time: '1 day ago', icon: User },
];

const typeColors: Record<string, string> = {
  product_update: 'bg-purple-100 text-purple-600',
  order_status: 'bg-blue-100 text-blue-600',
  discount_change: 'bg-green-100 text-green-600',
  settings_change: 'bg-yellow-100 text-yellow-600',
  user_action: 'bg-gray-100 text-gray-600',
};

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-500 mt-1">Track all admin actions and changes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4">
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Types</option>
          <option value="product_update">Product Updates</option>
          <option value="order_status">Order Changes</option>
          <option value="discount_change">Discount Changes</option>
          <option value="settings_change">Settings Changes</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="">All Users</option>
          <option value="admin">Admin</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {mockActivities.map(activity => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="p-4 hover:bg-gray-50 flex items-start gap-4">
                <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
