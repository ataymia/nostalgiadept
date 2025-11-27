'use client';

import { FileText, Image as ImageIcon, Layout, Link2 } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content & Merchandising</h1>
        <p className="text-gray-500 mt-1">Manage homepage, collections, and site content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <ImageIcon size={32} className="text-pink-600 mb-3" />
          <h3 className="font-bold text-gray-900">Hero Banners</h3>
          <p className="text-sm text-gray-500 mt-1">Manage homepage hero images</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Layout size={32} className="text-purple-600 mb-3" />
          <h3 className="font-bold text-gray-900">Collections</h3>
          <p className="text-sm text-gray-500 mt-1">Create product collections</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <Link2 size={32} className="text-cyan-600 mb-3" />
          <h3 className="font-bold text-gray-900">Navigation</h3>
          <p className="text-sm text-gray-500 mt-1">Configure menu links</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <FileText size={32} className="text-green-600 mb-3" />
          <h3 className="font-bold text-gray-900">Legal Pages</h3>
          <p className="text-sm text-gray-500 mt-1">Terms, privacy, returns</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <FileText size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Content Editor Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Edit homepage banners, create collections, and manage site content from this dashboard.
        </p>
      </div>
    </div>
  );
}
