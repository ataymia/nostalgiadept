'use client';

import { Box, Gift, Calendar, RefreshCw } from 'lucide-react';

export default function BoxesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Boxes & Subscriptions</h1>
        <p className="text-gray-500 mt-1">Manage mystery boxes and subscription products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Box size={24} className="text-purple-600 mb-2" />
          <p className="text-sm text-gray-500">One-Time Boxes</p>
          <p className="text-2xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RefreshCw size={24} className="text-cyan-600 mb-2" />
          <p className="text-sm text-gray-500">Subscription Boxes</p>
          <p className="text-2xl font-bold text-gray-900">7</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Gift size={24} className="text-pink-600 mb-2" />
          <p className="text-sm text-gray-500">Event Kits</p>
          <p className="text-2xl font-bold text-gray-900">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Box size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Box Management Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Configure mystery box contents, subscription schedules, and event kit bundles from this dashboard.
        </p>
      </div>
    </div>
  );
}
