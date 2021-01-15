import './style/index.css';

export const Album = props => {
    return(
        <div className="album_container">
            <img className="album_cover" src={props.image_url}/>
            <p className="album_name">{props.name}</p>
        </div>
    );
}

export default Album;