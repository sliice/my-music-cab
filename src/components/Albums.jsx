import { useContext, useEffect, useState } from 'react';
import { client_id, credentials, redirect_uri } from '../static/data'
import { useHttp } from '../hooks/http'
import { useClient } from '../client/Client';
import { AuthContext } from './context/AuthContext';
import Album from './Album';
import './style/index.css';
  

export const Albums = () => {
  
  // const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const { fetchPlaylists } = useClient();
  const [arePlaylistsFetched, setPlaylistsFetched] = useState(false);
  const { fetchToken } = useClient();

  // authorization
  useEffect( () => {
    if (!token){
      fetchToken();      
    }
  }, [token]);

  const scopes = 'playlist-read-private';
  const url = 'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + redirect_uri;

  const [playlists, setPlaylists] = useState([]);

  useEffect( () => {   
    if (token && !arePlaylistsFetched){  
      fetchPlaylists();
      // setPlaylists(fetchPlaylists());
      // console.log(fetchPlaylists())
      // fetchPlaylists().then((res) => console.log(res))
      // setPlaylistsFetched(true);  
    }
  }, [token, arePlaylistsFetched]);

  useEffect( () => {
    console.log('playlists', playlists);
  }, [playlists]);


  

  return (
      <div className='page_container'>
        <a href={url} id='login_btn'>GO FOR IT GURL!!</a>
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
