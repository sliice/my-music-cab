import { useCallback } from 'react'

export const useHttp = () => {

    const request = useCallback( async(url, method = 'GET', body = null, headers = {}) => {
        try {
            // if body of the request is not empty
            if (body){
                body = JSON.stringify(body);                
                headers['Content-type'] = 'application/json';
            }
            
            const response = await fetch(url, { method, body, headers });
            const data = response.json();

            return data;
        }
        catch(e){
            console.log(e);
        }
    }, []);

    return { request }
}