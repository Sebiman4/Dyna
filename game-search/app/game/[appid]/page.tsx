/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
interface GameDetailProps {
  params: { appid: string };
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  try {
    const res = await fetch(`${baseUrl}/api/game/${appid}`, {
      cache: "no-store",
    });

    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error("Internal API fetch error:", error);
  }

  return fetchSteamGame(appid);
}

export default async function GameDetail({ params }: GameDetailProps) {
  const { appid } = params;
  const game = await getGame(appid);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Game data not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="text-blue-400 hover:underline">← Back to search</a>

        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <img
            src={game.header_image}
            alt={game.name}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
            {!!game.type && (
              <p className="text-gray-400 mb-2">{game.type.toUpperCase()}</p>
            )}
            {game.short_description && (
              <p className="text-gray-300 mb-4">{game.short_description}</p>
            )}

            <div className="mb-4">
              {game.developers?.length ? (
                <p><span className="font-semibold">Developer:</span> {game.developers.join(", ")}</p>
              ) : null}
              {game.publishers?.length ? (
                <p><span className="font-semibold">Publisher:</span> {game.publishers.join(", ")}</p>
              ) : null}
              {game.release_date?.date ? (
                <p><span className="font-semibold">Release Date:</span> {game.release_date.date}</p>
              ) : null}
            </div>

            {game.price_overview ? (
              <p className="text-green-400 font-bold mb-4">
                Price: {game.price_overview.final_formatted}
              </p>
            ) : (
              <p className="text-yellow-400 font-bold mb-4">Free to Play</p>
            )}

            <a
              href={`https://store.steampowered.com/app/${appid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              View on Steam
            </a>
          </div>
        </div>

        {game.screenshots && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {game.screenshots.slice(0, 6).map((s: any, i: number) => (
                <img key={i} src={s.path_thumbnail} alt={`screenshot-${i}`} className="rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}