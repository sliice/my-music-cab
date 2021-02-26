import { useCallback, useContext } from 'react';
import { credentials, redirect_uri } from '../static/data'
import { extractCode } from '../hooks/tools';
import { AuthContext } from '../components/context/AuthContext';

export const useClient = () => {

  const { login, token } = useContext(AuthContext);
  
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
              login(res.access_token, res.refresh_token);          
            });                      
        }
        catch (e) {
          console.log(e)
        }
      }, [login]);
    
    
      const fetchPlaylists = useCallback(async() => {
        try {
          const fetchedPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {                                
              headers: {
                Authorization: `Bearer ${token}`,                    
              }
          });
    
          fetchedPlaylists.json()
            .then(res => {   
              console.log("playlists: ", res.items);
              // think about pagination of playlists later   
              // think about resolving promise      
              // return Promise.resolve(res.items);
              // return res.items;
            });         
        }
        catch(e) {
          console.log(e)
        }
      }, [token]);

      return { fetchToken, fetchPlaylists };
}