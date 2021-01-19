import { NavLink } from 'react-router-dom';
import './style/index.css';

export const Album = props => {
    return(
        <NavLink to='/tracks' className="album_container">
            <img className="album_cover" src={ props.image_url }/>
            <p className="album_name">{ props.name }</p>
        </NavLink>
    );
}

export default Album;