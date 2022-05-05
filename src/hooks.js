import cookie from 'cookie'

export async function handle({ event, resolve }) {
    return await resolve(event);
}


export async function getSession({request}){ 
    const cookies = cookie.parse(request.headers.get('cookie') || '')
    return {
         theme: cookies.theme || 'dark'
    }
} 