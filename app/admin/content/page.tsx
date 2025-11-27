'use client';

import { useState } from 'react';
import { FileText, Image as ImageIcon, Layout, Link2, X, Trash2 } from 'lucide-react';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  productCount: number;
  active: boolean;
}

export default function ContentPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([
    {
      id: '1',
      title: 'TOTALLY RAD 90s VIBES!',
      subtitle: 'Step into the time machine and grab all your favorite retro gear!',
      buttonText: 'SHOP NOW',
      buttonLink: '/category/pocket-tech-virtual-pets',
      active: true,
    }
  ]);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [bannerForm, setBannerForm] = useState({ title: '', subtitle: '', buttonText: '', buttonLink: '' });
  const [collectionForm, setCollectionForm] = useState({ name: '', description: '' });

  const addBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const newBanner: HeroBanner = {
      id: Date.now().toString(),
      ...bannerForm,
      active: true,
    };
    setBanners([...banners, newBanner]);
    setBannerForm({ title: '', subtitle: '', buttonText: '', buttonLink: '' });
    setShowBannerForm(false);
  };

  const addCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const newCollection: Collection = {
      id: Date.now().toString(),
      ...collectionForm,
      productCount: 0,
      active: true,
    };
    setCollections([...collections, newCollection]);
    setCollectionForm({ name: '', description: '' });
    setShowCollectionForm(false);
  };

  const toggleBannerActive = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const deleteBanner = (id: string) => {
    if (confirm('Delete this banner?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  const deleteCollection = (id: string) => {
    if (confirm('Delete this collection?')) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content & Merchandising</h1>
        <p className="text-gray-500 mt-1">Manage homepage, collections, and site content</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setShowBannerForm(true)}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
        >
          <ImageIcon size={32} className="text-pink-600 mb-3" />
          <h3 className="font-bold text-gray-900">Hero Banners</h3>
          <p className="text-sm text-gray-500 mt-1">{banners.length} banner{banners.length !== 1 ? 's' : ''}</p>
        </button>
        <button
          onClick={() => setShowCollectionForm(true)}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow text-left"
        >
          <Layout size={32} className="text-purple-600 mb-3" />
          <h3 className="font-bold text-gray-900">Collections</h3>
          <p className="text-sm text-gray-500 mt-1">{collections.length} collection{collections.length !== 1 ? 's' : ''}</p>
        </button>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Link2 size={32} className="text-cyan-600 mb-3" />
          <h3 className="font-bold text-gray-900">Navigation</h3>
          <p className="text-sm text-gray-500 mt-1">Managed via sidebar</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <FileText size={32} className="text-green-600 mb-3" />
          <h3 className="font-bold text-gray-900">Legal Pages</h3>
          <p className="text-sm text-gray-500 mt-1">Terms, privacy, returns</p>
        </div>
      </div>

      {/* Add Banner Form */}
      {showBannerForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Add Hero Banner</h2>
            <button onClick={() => setShowBannerForm(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={addBanner} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Banner headline"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Supporting text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={bannerForm.buttonText}
                  onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="SHOP NOW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input
                  type="text"
                  value={bannerForm.buttonLink}
                  onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="/category/featured"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Add Banner
              </button>
              <button type="button" onClick={() => setShowBannerForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Collection Form */}
      {showCollectionForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Create Collection</h2>
            <button onClick={() => setShowCollectionForm(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={addCollection} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name</label>
                <input
                  type="text"
                  required
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Staff Picks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({ ...collectionForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Our team's favorites"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Create Collection
              </button>
              <button type="button" onClick={() => setShowCollectionForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banners List */}
      {banners.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Hero Banners</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {banners.map(banner => (
              <div key={banner.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{banner.title}</p>
                  <p className="text-sm text-gray-500">{banner.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBannerActive(banner.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {banner.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => deleteBanner(banner.id)}
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

      {/* Collections List */}
      {collections.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Collections</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {collections.map(collection => (
              <div key={collection.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{collection.name}</p>
                  <p className="text-sm text-gray-500">{collection.description || 'No description'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{collection.productCount} products</span>
                  <button
                    onClick={() => deleteCollection(collection.id)}
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
    </div>
  );
}
