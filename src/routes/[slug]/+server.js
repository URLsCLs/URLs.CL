import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db'


export async function GET({ params }) {
    /**
     * @type {string}
     */
    let slug = params.slug
    /**
     * @type {Array}
     */
    let uri = (await db.query('select * from slugs where slug = ? limit 1', [slug]))[0]



    if (uri.length > 0) {
        uri = uri[0]
        throw redirect(307, uri.url)
    }else{
        throw redirect(307, `/?msg={"type":"error", "msg":"Slug /${params.slug} Does Not Exist"}`)
    }
}