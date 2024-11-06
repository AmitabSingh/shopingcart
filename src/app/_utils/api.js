const { headers } = require("next/headers")
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api = async(endPoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers:{
            'Content-Type': 'application/json',
        },
    };

    if(body){
        options.body = JSON.stringify(body);
        console.log('bababab',options)
    }

    try{
        const response = await fetch(`${BASE_URL}${endPoint}`, options);
        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        return await response.json();
    }catch(error){
        console.error('API call error:', error);
        throw error;
    }
}

export const get = (endPoint) => api(endPoint, "GET");
export const post = (endPoint, body) => api(endPoint, 'POST', body);