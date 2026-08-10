export async function onRequest(context) {
  const apiKey = context.env.LASTFM_API_KEY;
  const username = context.env.LASTFM_USERNAME;

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const res = await fetch(url);

  if (!res.ok) {
    return new Response("Last.fm request failed", {
      status: res.status,
    });
  }

  const data = await res.json();
  const track = data.recenttracks?.track?.[0];

  if (!track) {
    return Response.json({
      playing: false,
      track: null,
    });
  }

  const image = track.image?.find(
    (img) => img.size === "extralarge" && img["#text"]
  )?.["#text"] || "";

  return Response.json({
    playing: track["@attr"]?.nowplaying === "true",
    artist: track.artist?.["#text"] || "",
    track: track.name || "",
    album: track.album?.["#text"] || "",
    image,
    url: track.url || "",
  });
}