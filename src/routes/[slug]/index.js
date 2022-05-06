export async function get(request) {
	var slug = request ? request.params.slug : '';

	if (slug.endsWith('*')) {
		return {
			status: 307,
			headers: {
				Location: `/services/define?slug=${slug.replace('*', '')}`
			}
		};
	}

	let req = await fetch(`https://api.urls.cl/slug/${slug}`);
	if (req.status != 200) {
		return {
			status: 404,
			error: new Error('This does Not Exist')
		};
	} else {
		return {
			status: 307,
			headers: { Location: await req.json() }
		};
	}
}
