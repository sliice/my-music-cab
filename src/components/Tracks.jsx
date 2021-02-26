import { useState, useCallback, useEffect, useContext } from 'react';
import { extractTracks } from '../hooks/tools';
import { AuthContext } from './context/AuthContext';
import './style/index.css';

export const Tracks = props => {

    const { token } = useContext(AuthContext);
    const [tracks, setTracks] = useState([]);
    const [areTracksFetched, setTracksFetched] = useState(false);

    const fetchTracks = useCallback(async() => {
        try {          
        //   const fetchedTracks = await fetch(`https://api.spotify.com/v1/playlists/${props.id}/tracks`, {                                
        //       headers: {
        //         Authorization: `Bearer ${token}`,                    
        //       }
        //   });
    
        //   fetchedTracks.json()
        //     .then(res => {                    
        //         console.log(res);                
        //         console.log(extractTracks(res.items));                
        //         setTracks(extractTracks(res.items));
        //         setTracksFetched(true);
        //     });    
        }
        catch(e) {
          console.log(e)
        }
      }, [ token ]);

    const openTrack = e => {             
        
    }
    
    useEffect(() => {
        if (!areTracksFetched){
            fetchTracks();            
        }
    }, [ areTracksFetched ]);
    
    return(
        <div className="page_container">            
            <div className="tracks_container">heeyy</div>
        </div>
    );
}

export default Tracks;