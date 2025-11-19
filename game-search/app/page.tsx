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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">🎮 Steam Game Finder</h1>
      <div className="flex gap-2 justify-center mb-8">
        <input
          type="text"
          className="border p-2 rounded w-80 text-black"
          placeholder="Search game name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchGames}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-center mb-6">{error}</p>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="text-gray-400 text-center">Belum ada hasil. Cari game favoritmu di sini.</p>
      )}

      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {results.map((game) => (
          <div key={game.appid} className="bg-gray-800 p-4 rounded">
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
              alt={game.name}
              className="rounded mb-2"
            />
            <h2 className="font-semibold">{game.name}</h2>
            <Link href={`/game/${game.appid}`}
            className="text-blue-400 hover:underline text-sm"
            >
                View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
