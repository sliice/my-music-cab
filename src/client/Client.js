import { useCallback, useContext } from 'react';
import { credentials, redirect_uri } from '../static/data'
import { extractCode } from '../hooks/tools';
import { Context } from '../components/context/Context';

export const useClient = () => {

    const { login, token } = useContext(Context);

    const fetchToken = useCallback(async() => {
        try {                  
          const fetchedToken = await fetch('https://accounts.spotify.com/api/token', {
            body: `grant_type=authorization_code&code=${ extractCode(window.location.search) }&redirect_uri=${ redirect_uri }`,
            headers: {
              Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
          });
          
    
          fetchedToken.json()
            .then(res => {
              console.log(res)        
              login(res.access_token, res.refresh_token);      
            });                      
        }
        catch (e) {
          console.log(e)
        }
      }, []);
    
    
      const fetchPlaylists = useCallback(async() => {
        try {
          console.log('token: ', token)
          const fetchedPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {                                
              headers: {
                Authorization: `Bearer ${token}`,                    
              }
          });
    
          fetchedPlaylists.json()
            .then(res => {   
              console.log(res);                 
            //   setPlaylists(res.items);
            //   setPlaylistsFetched(true);
            });         
        }
        catch(e) {
          console.log(e)
        }
      }, [token]);

      return { fetchToken, fetchPlaylists };

}