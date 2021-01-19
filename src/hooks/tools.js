export const extractCode = search => {
    if (search){         
        let code = search.split('code=')[1];       
        return code
    } 
    else return 'no code...';
}

export const extractTracks = playlistContent => {
    let tracks = [];
    console.log(playlistContent)
    playlistContent.forEach(element => {
        tracks.push(element.track)
    });
    return tracks;
}