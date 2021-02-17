import { useContext, useEffect, useState } from 'react';
import { client_id, credentials, redirect_uri } from '../static/data'
import { useHttp } from '../hooks/http'
import { useClient } from '../client/Client';
import { Context } from './context/Context';
import Album from './Album';
import './style/index.css';
  

export const Albums = () => {
  
  const { request } = useHttp();
  const { token } = useContext(Context);
  const { fetchPlaylists } = useClient();
  const [arePlaylistsFetched, setPlaylistsFetched] = useState(false);
  // const [isTokenFetched, setIsTokenFetched] = useState(false);

  const scopes = 'playlist-read-private';
  const url = 'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + redirect_uri;

  const [playlists, setPlaylists] = useState([]);
  
  useEffect( () => {   
    console.log(token)  
    if (token && !arePlaylistsFetched){      
      console.log('fetching playlists...')   
      fetchPlaylists();      
    }
  }, [token, arePlaylistsFetched]);

  useEffect( () => {
    console.log('playlists', playlists);
  }, [playlists]);


  

  return (
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
  );
}

export default Albums;
