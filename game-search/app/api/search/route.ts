import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Parameter 'query' wajib diisi." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await fetch(
      `https://steamcommunity.com/actions/SearchApps/${encodeURIComponent(query)}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        },
      },
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Gagal mengambil data dari Steam." }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const results = await response.json();
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search API error:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan tak terduga." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}


