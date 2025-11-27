'use client';

import { useState, useMemo } from 'react';
import { products } from '@/lib/products';
import { Box, Gift, RefreshCw, Plus, Trash2, X } from 'lucide-react';

interface BoxConfig {
  id: string;
  name: string;
  type: 'one-time' | 'subscription' | 'event';
  productIds: string[];
  price: number;
  active: boolean;
}

export default function BoxesPage() {
  // Get real product counts from catalog
  const subscriptionProducts = useMemo(() => 
    products.filter(p => p.category === 'mystery-subscription-boxes' && p.subcategory === 'monthly-subscriptions'),
    []
  );
  const oneTimeBoxes = useMemo(() => 
    products.filter(p => p.category === 'mystery-subscription-boxes' && p.subcategory === 'one-time-mystery-boxes'),
    []
  );
  const eventKits = useMemo(() => 
    products.filter(p => p.category === 'mystery-subscription-boxes' && p.subcategory === 'event-kits-party-boxes'),
    []
  );

  const [boxConfigs, setBoxConfigs] = useState<BoxConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'one-time' as 'one-time' | 'subscription' | 'event',
    price: '',
    productIds: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBox: BoxConfig = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      price: parseFloat(formData.price) || 0,
      productIds: formData.productIds,
      active: true,
    };
    setBoxConfigs([...boxConfigs, newBox]);
    setFormData({ name: '', type: 'one-time', price: '', productIds: [] });
    setShowAddForm(false);
  };

  const toggleActive = (id: string) => {
    setBoxConfigs(boxConfigs.map(b => 
      b.id === id ? { ...b, active: !b.active } : b
    ));
  };

  const deleteBox = (id: string) => {
    if (confirm('Are you sure you want to delete this box configuration?')) {
      setBoxConfigs(boxConfigs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Boxes & Subscriptions</h1>
          <p className="text-gray-500 mt-1">Manage mystery boxes and subscription products</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          Create Box
        </button>
      </div>

      {/* Stats from real catalog */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Box size={24} className="text-purple-600 mb-2" />
          <p className="text-sm text-gray-500">One-Time Boxes</p>
          <p className="text-2xl font-bold text-gray-900">{oneTimeBoxes.length}</p>
          <p className="text-xs text-gray-400 mt-1">In product catalog</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RefreshCw size={24} className="text-cyan-600 mb-2" />
          <p className="text-sm text-gray-500">Subscription Boxes</p>
          <p className="text-2xl font-bold text-gray-900">{subscriptionProducts.length}</p>
          <p className="text-xs text-gray-400 mt-1">In product catalog</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Gift size={24} className="text-pink-600 mb-2" />
          <p className="text-sm text-gray-500">Event Kits</p>
          <p className="text-2xl font-bold text-gray-900">{eventKits.length}</p>
          <p className="text-xs text-gray-400 mt-1">In product catalog</p>
        </div>
      </div>

      {/* Add Box Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Create Box Configuration</h2>
            <button onClick={() => setShowAddForm(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Box Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="90s Ultimate Box"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as BoxConfig['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="one-time">One-Time Box</option>
                  <option value="subscription">Subscription</option>
                  <option value="event">Event Kit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="29.99"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Create Box
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Box Configurations */}
      {boxConfigs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Custom Box Configurations</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {boxConfigs.map(box => (
              <div key={box.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    box.type === 'subscription' ? 'bg-cyan-100' : 
                    box.type === 'event' ? 'bg-pink-100' : 'bg-purple-100'
                  }`}>
                    {box.type === 'subscription' ? <RefreshCw size={20} className="text-cyan-600" /> :
                     box.type === 'event' ? <Gift size={20} className="text-pink-600" /> :
                     <Box size={20} className="text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{box.name}</p>
                    <p className="text-sm text-gray-500">${box.price.toFixed(2)} • {box.type.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(box.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      box.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {box.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => deleteBox(box.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Products from Catalog */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Existing Box Products in Catalog</h3>
          <p className="text-sm text-gray-500">These products are already in your product catalog</p>
        </div>
        <div className="divide-y divide-gray-100">
          {[...subscriptionProducts, ...oneTimeBoxes, ...eventKits].map(product => (
            <div key={product.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">📦</div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.subcategory?.replace(/-/g, ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{product.stock} in stock</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
