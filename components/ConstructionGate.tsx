'use client';

import { useState, useEffect } from 'react';

const CONSTRUCTION_PASSWORD = 'neversleep';
const STORAGE_KEY = 'construction_access';

export default function ConstructionGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already authenticated
    const hasAccess = sessionStorage.getItem(STORAGE_KEY) === 'true';
    setIsAuthenticated(hasAccess);
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === CONSTRUCTION_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Try again!');
      setPassword('');
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return null;
  }

  // Show construction gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-4">
        <div className="max-w-md w-full">
          {/* Construction Sign */}
          <div className="bg-yellow-400 border-8 border-black p-8 text-center mb-8 transform -rotate-2 shadow-2xl">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-4xl font-black text-black mb-2" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
              UNDER CONSTRUCTION
            </h1>
            <p className="text-xl font-bold text-black">
              We're not ready yet!
            </p>
          </div>

          {/* Password Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg border-4 border-black shadow-[8px_8px_0_#000] p-6">
            <h2 className="text-2xl font-black text-center mb-4 text-purple-900">
              Enter Password to Continue
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 border-2 border-black rounded-lg font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-pink-500 text-black"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg font-bold text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!password}
                className="w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-black text-lg rounded-lg border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:hover:shadow-[4px_4px_0_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                ENTER SITE
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                🔐 This site is currently under construction
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 text-center space-y-2">
            <div className="text-4xl animate-bounce">⚠️</div>
            <p className="text-yellow-300 font-bold text-lg">
              COMING SOON!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show the actual site if authenticated
  return <>{children}</>;
}
