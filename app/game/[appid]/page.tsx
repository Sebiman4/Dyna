/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
interface GameDetailProps {
  params: Promise<{ appid: string }>;
}

async function fetchSteamGame(appid: string) {
  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        },
      },
    );

    if (!response.ok) return null;

    const payload = await response.json();
    const entry = payload?.[appid];
    return entry?.success ? entry.data : null;
  } catch (error) {
    console.error("Fallback Steam fetch error:", error);
    return null;
  }
}

async function getGame(appid: string) {
  // Directly fetch from Steam API instead of using internal API
  return fetchSteamGame(appid);
}

export default async function GameDetail({ params }: GameDetailProps) {
  const { appid } = await params;
  const game = await getGame(appid);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-400">Game data not found.</p>
          <a href="/" className="mt-4 inline-block text-blue-400 hover:text-blue-300 underline">← Back to search</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section with Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 opacity-20 blur-xl" 
          style={{
            backgroundImage: `url(${game.header_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative bg-gradient-to-b from-transparent to-gray-900 py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to search
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12 -mt-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="flex flex-col lg:flex-row">
            {/* Game Image */}
            <div className="lg:w-2/5 bg-gray-900">
              <img
                src={game.header_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Game Info */}
            <div className="flex-1 p-8">
              <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {game.name}
              </h1>
              
              {!!game.type && (
                <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {game.type.toUpperCase()}
                </span>
              )}
              
              {game.short_description && (
                <p className="text-gray-300 mb-6 leading-relaxed">{game.short_description}</p>
              )}

              {/* Game Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {game.developers?.length ? (
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Developer</p>
                    <p className="font-semibold text-white">{game.developers.join(", ")}</p>
                  </div>
                ) : null}
                
                {game.publishers?.length ? (
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Publisher</p>
                    <p className="font-semibold text-white">{game.publishers.join(", ")}</p>
                  </div>
                ) : null}
                
                {game.release_date?.date ? (
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Release Date</p>
                    <p className="font-semibold text-white">{game.release_date.date}</p>
                  </div>
                ) : null}

                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-sm mb-1">Price</p>
                  {game.price_overview ? (
                    <p className="text-green-400 font-bold text-xl">
                      {game.price_overview.final_formatted}
                    </p>
                  ) : (
                    <p className="text-yellow-400 font-bold text-xl">Free to Play</p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`https://store.steampowered.com/app/${appid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-5.161 5.161c-.292.292-.677.439-1.061.439s-.769-.147-1.061-.439l-2.561-2.561c-.586-.586-.586-1.535 0-2.121s1.535-.586 2.121 0l1.5 1.5 4.1-4.1c.586-.586 1.535-.586 2.121 0s.586 1.535.002 2.121z"/>
                </svg>
                View on Steam Store
              </a>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        {game.screenshots && game.screenshots.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-2xl">📸</span>
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {game.screenshots.slice(0, 6).map((s: any, i: number) => (
                <div 
                  key={i} 
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500"
                >
                  <img 
                    src={s.path_full || s.path_thumbnail} 
                    alt={`screenshot-${i}`} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info Section */}
        {game.detailed_description && (
          <div className="mt-12 bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">About This Game</h2>
            <div 
              className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: game.detailed_description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}