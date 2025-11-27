'use client';

import { useState } from 'react';
import { Plus, Percent, Truck, DollarSign, Trash2 } from 'lucide-react';

type DiscountType = 'percentage' | 'fixed' | 'free_shipping';

interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  active: boolean;
  uses: number;
  minOrder: number;
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as DiscountType,
    value: '',
    minOrder: '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount: Discount = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: parseFloat(formData.value) || 0,
      active: true,
      uses: 0,
      minOrder: parseFloat(formData.minOrder) || 0,
    };
    setDiscounts([...discounts, newDiscount]);
    setFormData({ code: '', type: 'percentage', value: '', minOrder: '0' });
    setShowAddForm(false);
  };

  const toggleActive = (id: string) => {
    setDiscounts(discounts.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ));
  };

  const deleteDiscount = (id: string) => {
    if (confirm('Are you sure you want to delete this discount code?')) {
      setDiscounts(discounts.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts & Promotions</h1>
          <p className="text-gray-500 mt-1">Create and manage discount codes</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          Create Discount
        </button>
      </div>

      {/* Add Discount Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Discount</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg uppercase"
                placeholder="SAVE10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as DiscountType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="percentage">Percentage Off</option>
                <option value="fixed">Fixed Amount</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'percentage' ? 'Percentage (%)' : formData.type === 'fixed' ? 'Amount ($)' : 'N/A'}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={formData.type === 'percentage' ? '100' : undefined}
                disabled={formData.type === 'free_shipping'}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                placeholder={formData.type === 'free_shipping' ? '-' : '10'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min. Order ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Create Discount
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Discounts Table or Empty State */}
      {discounts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Percent size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Discount Codes Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            Create your first discount code to offer promotions to customers.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            <Plus size={20} />
            Create First Discount
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Code</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Value</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Min Order</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Uses</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {discounts.map(discount => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono text-purple-600">
                      {discount.code}
                    </code>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      {discount.type === 'percentage' && <><Percent size={14} /> Percentage</>}
                      {discount.type === 'fixed' && <><DollarSign size={14} /> Fixed Amount</>}
                      {discount.type === 'free_shipping' && <><Truck size={14} /> Free Shipping</>}
                    </span>
                  </td>
                  <td className="p-4 font-medium">
                    {discount.type === 'percentage' && `${discount.value}%`}
                    {discount.type === 'fixed' && `$${discount.value}`}
                    {discount.type === 'free_shipping' && '-'}
                  </td>
                  <td className="p-4 text-gray-600">
                    {discount.minOrder > 0 ? `$${discount.minOrder}` : 'None'}
                  </td>
                  <td className="p-4 text-gray-600">{discount.uses}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(discount.id)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        discount.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {discount.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteDiscount(discount.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
