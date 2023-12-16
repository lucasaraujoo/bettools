
export const GET = async ({ request, url }) => {

  const standings = await fetch(import.meta.env.KV_REST_API_URL+"/get/standings", {
    headers: {
      Authorization: "Bearer "+import.meta.env.KV_REST_API_TOKEN,
    },
  })
		.then((response) => response.json())
		.then((data) => JSON.parse(data.result))
		.catch(() => []);

  return new Response(
    JSON.stringify(standings)
  )
}