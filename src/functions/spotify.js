const AUTH_TOKEN = process.env.REACT_APP_SPOTIFY_AUTH_TOKEN;

export const authorize = async () => {
    const { origin } = window.location;
    window.location.href = 'https://accounts.spotify.com/authorize' + 
        '?client_id=d705dbf487824c5893594aaa9279f2fb' + 
        '&response_type=code' + 
        `&redirect_uri=${origin}/authorized` + 
        '&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative' + 
        '&state=profile%2Factivity';
}

export const getToken = async (code) => {
    const { origin } = window.location;
    const clientId = 'd705dbf487824c5893594aaa9279f2fb';
    const clientSecret = 'af84b02c225242468992d977660084e1';
    var encodedData = window.btoa(clientId + ':' + clientSecret);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Basic ${encodedData}`,
        }),
        body: new URLSearchParams({
            'grant_type': 'authorization_code',
            code,
            'redirect_uri': `${origin}/authorized`
        })
    });

    const data = await response.json();
    
    const { access_token: accessToken, refresh_token: refreshToken } = data;
    return { accessToken, refreshToken };
};

export const getRefreshToken = async (token) => {
    const clientId = 'd705dbf487824c5893594aaa9279f2fb';
    const clientSecret = 'af84b02c225242468992d977660084e1';
    const encodedData = window.btoa(clientId + ':' + clientSecret);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Basic ${encodedData}`,
        }),
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': token,
        })
    });

    const data = await response.json();

    const { access_token: accessToken, refresh_token: refreshToken } = data;
    return { accessToken, refreshToken };
};

export const getUser = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: new Headers({ 
            'Authorization': `Bearer ${token}`,
        }),
    });

    const { id } = await response.json();

    return id;
}

export const getUserPlaylists = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
    });
}

export const getUserPlaylistsById = async (userId) => {
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
