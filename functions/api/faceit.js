export async function onRequest(context) {
  const apiKey = context.env.FACEIT_API_KEY;

  const url = new URL("https://open.faceit.com/data/v4/players");
  url.searchParams.set("nickname", "mjau");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "text/plain",
    },
  });
}