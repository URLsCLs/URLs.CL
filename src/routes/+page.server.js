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
        /**
         * @type {FormData}
         */
        let data = await request.formData();
        /**
         * @type {string}
         */
        let url = data.get('url');
        /**
         * @type {bool}
         */
        let protocol = url.match(/^.*:\/\//i);
        if (!protocol) {
            url = 'https://' + url;
        } else if (protocol[0] !== 'http://' && protocol[0] !== 'https://') {
            /**
             * @type {Response}
             */
            return fail('Only HTTP and HTTPS are supported');
        }
        /**
         * @type {bool}
         */
        let urlCheck = await isUrlValid(url);
        if (!urlCheck) {
            /**
             * @type {Response}
             */
            return fail('Invalid URL');
        }

        /**
         * @type {string}
         */
        let slug = await shorten(url);
        /**
         * @type {object}
         */
        let result = await addSlug(slug, url);

        /**
         * @type {Response}
         */
        return {
            'url': url,
            'slug': slug,
        };
    }
};