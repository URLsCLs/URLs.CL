export async function get(request) {
	var slug = request.url.searchParams.get('slug') || null;
	if (!slug) {
		return {
			status: 200
		};
	}

	let req = await fetch(`https://api.urls.cl/slug/${slug}`);

	return {
		status: 200,
		body: { url: await req.json() }
	};
}
