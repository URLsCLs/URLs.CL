import { fail } from '@sveltejs/kit';
import { isUrlValid, shorten, addSlug } from '$lib/url';


export function load({ url }) {
    let msgs = []

    let msg = url.searchParams.get('msg')
    try {
        msg = JSON.parse(msg)
    } catch (e) {
        msg = null
    }
    if (msg) {
        msgs.push(msg)
    }

    return {
        msgs
    }
}


export const actions = {
    shorten: async ({ request }) => {
        let data = await request.formData();
        let url = data.get('url');
        let protocol = url.match(/^.*:\/\//i);
        if (!protocol) {
            url = 'https://' + url;
        } else if (protocol[0] !== 'http://' && protocol[0] !== 'https://') {
            return fail('Only HTTP and HTTPS are supported');
        }
        let urlCheck = await isUrlValid(url);
        if (!urlCheck) {
            return fail('Invalid URL');
        }


        let slug = await shorten(url);
        let result = await addSlug(slug, url);


        return {
            'url': url,
            'slug': slug,
        };
    }
};