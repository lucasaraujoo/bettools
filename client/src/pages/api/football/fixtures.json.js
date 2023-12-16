
export const GET = async ({ request, url }) => {

  const fixtures = await fetch(import.meta.env.KV_REST_API_URL+"/get/fixtures", {
    headers: {
      Authorization: "Bearer "+import.meta.env.KV_REST_API_TOKEN,
    },
  })
		.then((response) => response.json())
		.then((data) => JSON.parse(data.result))
		.catch(() => []);


  return new Response(
    JSON.stringify(fixtures)
  )
}