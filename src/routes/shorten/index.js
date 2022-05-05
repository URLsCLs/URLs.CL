import {key} from '$lib/_apikey.json';

export async function get({request}) {
    return {
        status: 307,
        headers: {Location: '/'}
    }
}



export async function post({request}){
    let shrt, body = await request.json()
    
    if (!body.url) {
        return{
            status: 400,
            body: 'I am watching you...'
        }
    }

    var resp = await fetch('https://api.urls.cl/slug',{
        method: 'POST',
        mode : 'no-cors',
        headers: {
            "appkey": key,
            "mode": 'no-cors',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: body.url
        })
    })
    console.log(resp)
    if (resp.status != 200) {
        return{
            status: 500,
            body:{ message: 'Something went wrong .. terrible wrong'}
        }
    }else{
        return{
            status: 200,
            body: await resp.json()
        }
    }
    // console.log(await resp.json())





    return{
        status: 200
    }
}