const AUTH_TOKEN = process.env.REACT_APP_SPOTIFY_AUTH_TOKEN;

export const getUserPlaylists = async (userId) => {
    let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${AUTH_TOKEN}`
        })
    });
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
