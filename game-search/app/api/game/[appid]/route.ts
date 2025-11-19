type SteamAppDetailsResponse = Record<
  string,
  {
    success: boolean;
    data?: unknown;
  }
>;

export async function GET(
  _request: Request,
  { params }: { params: { appid: string } },
) {
  const { appid } = params;

  if (!appid) {
    return new Response(
      JSON.stringify({ error: "Parameter 'appid' wajib diisi." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${encodeURIComponent(appid)}`,
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

    const payload = (await response.json()) as SteamAppDetailsResponse;
    const entry = payload?.[appid];

    if (!entry?.success || !entry.data) {
      return new Response(
        JSON.stringify({ error: "Data game tidak ditemukan." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify(entry.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Game detail API error:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan tak terduga." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}


