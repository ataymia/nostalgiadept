'use client';

import { useState } from 'react';
import { Store, Truck, CreditCard, Mail, Bell, Users, Globe, Check, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Nostalgia Dept',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    contactEmail: 'hello@nostalgiadept.com',
    freeShippingThreshold: '50',
    taxEnabled: true,
    taxRate: '8.25',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
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
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Shipping Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Orders above this amount qualify for free shipping</p>
          </div>
        </div>
      </div>

      {/* Tax Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Tax Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.taxEnabled}
                onChange={(e) => setSettings({ ...settings, taxEnabled: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Enable Tax Collection</span>
            </label>
          </div>
          {settings.taxEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          <Save size={18} />
          Save Changes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
            <Check size={18} />
            Settings saved!
          </span>
        )}
      </div>
    </div>
  );
}
