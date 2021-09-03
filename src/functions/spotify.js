const AUTH_TOKEN = process.env.REACT_APP_SPOTIFY_AUTH_TOKEN;

export const authorize = async () => {
    const { origin } = window.location;
    window.location.href = 'https://accounts.spotify.com/authorize' + 
        '?client_id=d705dbf487824c5893594aaa9279f2fb' + 
        '&response_type=code' + 
        `&redirect_uri=${origin}` + 
        '&scope=user-read-private%20user-read-email';
}

export const getUserPlaylists = async (userId) => {
    let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${AUTH_TOKEN}`
        })
    });

    return await response.json();
}

export const getPlaylistArtists = async (playlistIds) => {
    let artists = await Promise.all(playlistIds.map(async (playlistId) => {
        let response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${AUTH_TOKEN}`
            })
        });


    }))
}
