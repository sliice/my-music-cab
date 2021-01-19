import { useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http'
import { client_id, credentials, redirect_uri } from '../static/data'
import { extractCode } from '../hooks/tools';
import { Context } from './context/Context';
import './style/index.css';

import Album from './Album';
  

export const Albums = () => {
  
  const { request } = useHttp();
  const [arePlaylistsFetched, setPlaylistsFetched] = useState(false);
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  const scopes = 'playlist-read-private';
  const url = 'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + redirect_uri;

  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState([]);
          
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
          setToken(res.access_token);
          setIsTokenFetched(true);        
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
          setPlaylists(res.items);
          setPlaylistsFetched(true);
        });         
    }
    catch(e) {
      console.log(e)
    }
  }, [token]);
  
  useEffect( () => {
    if (!isTokenFetched){
      fetchToken();   
      console.log('fetching token...')   
    }
  }, [isTokenFetched]);
  
  useEffect( () => {
    if (isTokenFetched && token && !arePlaylistsFetched){      
      fetchPlaylists();      
      console.log('fetching playlists...')   
    }
  }, [isTokenFetched, arePlaylistsFetched]);

  useEffect( () => {
    console.log('playlists', playlists);
  }, [playlists]);


  

  return (
    <Context.Provider value={ { token } }>
      <div className='page_container'>
        <a href={url}>GO FOR IT GURL!!</a>
        <div className='albums_container'>
        {
          playlists.map((playlist, i) => {
            return (
              <Album 
                key={ i }                
                id={ playlist.id } 
                name={ playlist.name } 
                image_url={playlist.images[0].url}/>
            );
          })
        }
        </div>
      </div>
    </Context.Provider>
  );
}

export default Albums;
