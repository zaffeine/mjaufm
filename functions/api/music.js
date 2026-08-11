export async function onRequest(context) {
    const apiKey = context.env.LASTFM_API_KEY;

    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.searchParams.set("method", "user.getinfo");
    url.searchParams.set("user", "zaffeine");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("format", "json");

    const res = await fetch(url);
    const text = await res.text();

    return new Response(text, {
        status: res.status,
        headers: {
            "content-type": "application/json"
        }
    });
}