export const client_id = '';
export const client_secret = ''
export const credentials = btoa(client_id + ':' + client_secret);
export const redirect_uri = encodeURIComponent('http://localhost:3000/playlists');
