'use client';

import { Store, Truck, CreditCard, Mail, Bell, Users, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your store settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Store size={32} className="text-purple-600 mb-3" />
          <h3 className="font-bold text-gray-900">Store Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Name, logo, currency, timezone</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Truck size={32} className="text-blue-600 mb-3" />
          <h3 className="font-bold text-gray-900">Shipping</h3>
          <p className="text-sm text-gray-500 mt-1">Zones, rates, free shipping</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Globe size={32} className="text-green-600 mb-3" />
          <h3 className="font-bold text-gray-900">Tax</h3>
          <p className="text-sm text-gray-500 mt-1">Tax rates and settings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <CreditCard size={32} className="text-pink-600 mb-3" />
          <h3 className="font-bold text-gray-900">Payments</h3>
          <p className="text-sm text-gray-500 mt-1">Payment processor settings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Mail size={32} className="text-cyan-600 mb-3" />
          <h3 className="font-bold text-gray-900">Emails</h3>
          <p className="text-sm text-gray-500 mt-1">Email templates and settings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Bell size={32} className="text-yellow-600 mb-3" />
          <h3 className="font-bold text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-500 mt-1">Admin alerts and webhooks</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Users size={32} className="text-orange-600 mb-3" />
          <h3 className="font-bold text-gray-900">Users & Roles</h3>
          <p className="text-sm text-gray-500 mt-1">Admin users and permissions</p>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Store Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input
              type="text"
              defaultValue="Nostalgia Dept"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              defaultValue="hello@nostalgiadept.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
