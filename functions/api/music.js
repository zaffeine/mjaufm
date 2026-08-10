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
  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": "application/json",
    },
  });
}