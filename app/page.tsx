/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchGames = async () => {
    if (!query.trim()) {
      setError('Masukkan nama game terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

      if (!res.ok) {
        const { error: message } = await res.json();
        throw new Error(message ?? 'Permintaan gagal.');
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('Tidak dapat mengambil data. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchGames();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-8 shadow-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-3 text-white drop-shadow-lg">
            🎮 Steam Game Finder
          </h1>
          <p className="text-blue-100 text-lg">Discover your next favorite game</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto px-6 -mt-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 bg-gray-700 border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 p-3 rounded-lg text-white placeholder-gray-400 transition-all outline-none"
              placeholder="Search for any game..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={searchGames}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading
                </span>
              ) : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-6 py-4 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-400 text-xl">Start searching to discover amazing games!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((game) => (
            <Link
              key={game.appid}
              href={`/game/${game.appid}`}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-blue-500"
            >
              <div className="relative overflow-hidden bg-gray-900">
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                  alt={game.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {game.name}
                </h2>
                <span className="text-blue-400 text-sm font-medium flex items-center gap-1">
                  View Details 
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
