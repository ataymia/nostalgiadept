'use client';

import { useState } from 'react';
import { Package, ShoppingCart, Tag, User, Settings, Clock } from 'lucide-react';

type ActivityType = 'product_update' | 'order_status' | 'discount_change' | 'settings_change' | 'user_action';

interface Activity {
  id: number;
  type: ActivityType;
  user: string;
  description: string;
  time: string;
  timestamp: Date;
}

const typeIcons: Record<ActivityType, typeof Package> = {
  product_update: Package,
  order_status: ShoppingCart,
  discount_change: Tag,
  settings_change: Settings,
  user_action: User,
};

const typeColors: Record<ActivityType, string> = {
  product_update: 'bg-purple-100 text-purple-600',
  order_status: 'bg-blue-100 text-blue-600',
  discount_change: 'bg-green-100 text-green-600',
  settings_change: 'bg-yellow-100 text-yellow-600',
  user_action: 'bg-gray-100 text-gray-600',
};

// Helper to format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default function ActivityLogPage() {
  // Start with page load event
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'user_action',
      user: 'Admin',
      description: 'Admin dashboard accessed',
      time: formatRelativeTime(new Date()),
      timestamp: new Date(),
    }
  ]);

  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('7d');

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    if (typeFilter && activity.type !== typeFilter) return false;
    
    const now = new Date();
    const activityDate = activity.timestamp;
    const diffDays = Math.floor((now.getTime() - activityDate.getTime()) / 86400000);
    
    if (dateFilter === '7d' && diffDays > 7) return false;
    if (dateFilter === '30d' && diffDays > 30) return false;
    if (dateFilter === '90d' && diffDays > 90) return false;
    
    return true;
  });

  // Update relative times periodically
  const updateTimes = () => {
    setActivities(activities.map(a => ({
      ...a,
      time: formatRelativeTime(a.timestamp)
    })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-500 mt-1">Track all admin actions and changes</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">All Types</option>
          <option value="product_update">Product Updates</option>
          <option value="order_status">Order Changes</option>
          <option value="discount_change">Discount Changes</option>
          <option value="settings_change">Settings Changes</option>
          <option value="user_action">User Actions</option>
        </select>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
        <button
          onClick={updateTimes}
          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {/* Activity List */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Clock size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Activity Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Activity will be logged here as you make changes in the admin portal.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredActivities.map(activity => {
              const Icon = typeIcons[activity.type];
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
      )}
    </div>
  );
}
