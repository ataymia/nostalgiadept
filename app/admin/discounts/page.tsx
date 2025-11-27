'use client';

import { Plus, Percent, Truck, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function DiscountsPage() {
  const [discounts] = useState([
    { id: '1', code: 'NOSTALGIA10', type: 'percentage', value: 10, active: true, uses: 45, minOrder: 25 },
    { id: '2', code: 'FREESHIP', type: 'free_shipping', value: 0, active: true, uses: 123, minOrder: 50 },
    { id: '3', code: 'WELCOME5', type: 'fixed', value: 5, active: false, uses: 89, minOrder: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts & Promotions</h1>
          <p className="text-gray-500 mt-1">Create and manage discount codes</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">
          <Plus size={20} />
          Create Discount
        </button>
      </div>

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
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    discount.active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {discount.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
