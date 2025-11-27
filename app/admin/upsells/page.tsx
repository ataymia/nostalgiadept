'use client';

import { useState, useMemo } from 'react';
import { products as productData, getCheckoutAddons } from '@/lib/products';
import { Product, CATEGORIES, getCategoryLabel } from '@/lib/types';
import { defaultUpsellConfig, getUpsellConfig } from '@/lib/config/upsell';
import { getUpsellProducts } from '@/lib/services/upsellService';
import { Gift, Settings, Eye, Check, X, Play, RefreshCw } from 'lucide-react';

export default function UpsellsPage() {
  const [products, setProducts] = useState<Product[]>(productData);
  
  // Upsell configuration state
  const [config, setConfig] = useState({
    maxUpsellCart: defaultUpsellConfig.maxUpsellCart,
    maxUpsellCheckout: defaultUpsellConfig.maxUpsellCheckout,
    cheapBandDelta: defaultUpsellConfig.cheapBandDelta,
    enableUpsells: defaultUpsellConfig.enableUpsells,
    relevanceToggles: { ...defaultUpsellConfig.relevanceToggles },
  });

  // Test cart simulation
  const [testCartCategories, setTestCartCategories] = useState<Set<string>>(new Set());
  const [testResults, setTestResults] = useState<Product[]>([]);
  const [isTestLoading, setIsTestLoading] = useState(false);

  // Get checkout addons
  const checkoutAddons = useMemo(() => {
    return products.filter(p => p.isCheckoutAddon && p.isActive);
  }, [products]);

  // Toggle product as checkout addon
  const toggleAddon = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isCheckoutAddon: !p.isCheckoutAddon } : p
    ));
  };

  // Run test cart simulation
  const runTestCart = async () => {
    setIsTestLoading(true);
    
    // Find products from selected categories to simulate cart
    const testCartProducts = products.filter(p => 
      testCartCategories.has(p.category) && !p.isCheckoutAddon
    ).slice(0, 3);
    
    const cartProductIds = testCartProducts.map(p => p.id);
    
    try {
      const results = await getUpsellProducts(
        cartProductIds,
        'cart',
        config.maxUpsellCart
      );
      setTestResults(results);
    } catch (error) {
      console.error('Test cart error:', error);
      setTestResults([]);
    }
    
    setIsTestLoading(false);
  };

  // Toggle test category
  const toggleTestCategory = (category: string) => {
    const newCategories = new Set(testCartCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setTestCartCategories(newCategories);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upsells & Add-Ons</h1>
        <p className="text-gray-500 mt-1">Configure Checkout Candy Lane upsell behavior</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Settings size={20} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Global Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Enable Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Upsells</p>
                <p className="text-sm text-gray-500">Show upsell suggestions on cart and checkout</p>
              </div>
              <button
                onClick={() => setConfig({ ...config, enableUpsells: !config.enableUpsells })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  config.enableUpsells ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  config.enableUpsells ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Numeric Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Cart Add-Ons
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={config.maxUpsellCart}
                  onChange={(e) => setConfig({ ...config, maxUpsellCart: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Checkout Add-Ons
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.maxUpsellCheckout}
                  onChange={(e) => setConfig({ ...config, maxUpsellCheckout: parseInt(e.target.value) || 3 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cheap Band Delta ($)
              </label>
              <input
                type="number"
                step="0.50"
                min="0"
                max="50"
                value={config.cheapBandDelta}
                onChange={(e) => setConfig({ ...config, cheapBandDelta: parseFloat(e.target.value) || 3 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Products within minPrice + this value are prioritized
              </p>
            </div>

            {/* Relevance Toggles */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Relevance Rules</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.relevanceToggles.biasSnacksWhenCartHasSnacks}
                    onChange={(e) => setConfig({
                      ...config,
                      relevanceToggles: {
                        ...config.relevanceToggles,
                        biasSnacksWhenCartHasSnacks: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer snack add-ons when cart has Candy/Snacks
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.relevanceToggles.biasVhsWhenCartHasVhs}
                    onChange={(e) => setConfig({
                      ...config,
                      relevanceToggles: {
                        ...config.relevanceToggles,
                        biasVhsWhenCartHasVhs: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer movie night add-ons when cart has VHS items
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.relevanceToggles.biasStickersWhenCartHasStationery}
                    onChange={(e) => setConfig({
                      ...config,
                      relevanceToggles: {
                        ...config.relevanceToggles,
                        biasStickersWhenCartHasStationery: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer sticker add-ons when cart has Stationery
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.relevanceToggles.biasToysWhenCartHasToys}
                    onChange={(e) => setConfig({
                      ...config,
                      relevanceToggles: {
                        ...config.relevanceToggles,
                        biasToysWhenCartHasToys: e.target.checked
                      }
                    })}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    Prefer toy add-ons when cart has Toys/Pocket Tech
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cart Preview */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Eye size={20} className="text-cyan-600" />
            <h2 className="text-lg font-bold text-gray-900">Test Cart Preview</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Simulate cart with items from these categories:
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.value !== 'checkout-candy-lane').map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => toggleTestCategory(cat.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      testCartCategories.has(cat.value)
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runTestCart}
              disabled={testCartCategories.size === 0 || isTestLoading}
              className="w-full py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isTestLoading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Play size={16} />
              )}
              Run Test
            </button>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Suggested Add-Ons ({testResults.length}):
                </p>
                <div className="space-y-2">
                  {testResults.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="w-6 h-6 flex items-center justify-center bg-cyan-100 text-cyan-700 text-xs font-bold rounded">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add-On Catalog */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-900">Add-On Catalog</h2>
          </div>
          <p className="text-sm text-gray-500">
            {checkoutAddons.length} checkout add-ons available
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Subcategory</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Price</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Stock</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-600">Is Add-On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products
                .filter(p => p.category === 'checkout-candy-lane' || p.isCheckoutAddon)
                .map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center text-sm">
                          🎁
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-600 capitalize">
                      {product.subcategory?.replace(/-/g, ' ') || 'N/A'}
                    </td>
                    <td className="p-3 font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span className={`font-medium ${
                        product.stock <= 10 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleAddon(product.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          product.isCheckoutAddon
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {product.isCheckoutAddon ? <Check size={18} /> : <X size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
