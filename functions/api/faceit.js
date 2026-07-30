export async function onRequest(context) {
  const apiKey = context.env.FACEIT_API_KEY;

  const res = await fetch("https://open.faceit.com/data/v4/players/mjau", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    return new Response("FACEIT request failed", { status: 500 });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}