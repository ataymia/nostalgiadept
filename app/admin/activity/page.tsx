'use client';

import { Package, Clock } from 'lucide-react';

// Activities will be populated from real data when available
const activities: Array<{ id: number; type: string; user: string; description: string; time: string; icon: typeof Package }> = [];

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
          {activities.length > 0 ? (
            activities.map(activity => {
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
            })
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Clock size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No activity yet. Actions will be logged here as you manage your store.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
