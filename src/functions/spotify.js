const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const authorize = async () => {
    const { origin } = window.location;
    window.location.href = 'https://accounts.spotify.com/authorize' + 
        `?client_id=${CLIENT_ID}` + 
        '&response_type=code' + 
        `&redirect_uri=${origin}/authorized` + 
        '&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative' + 
        '&state=profile%2Factivity';
}

export const getToken = async (code) => {
    const { origin } = window.location;
    var encodedData = window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

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
    const encodedData = window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Basic ${encodedData}`,
        }),
        body: new URLSearchParams({
            'grant_type': 'refresh_token',
            'refresh_token': token,
        }),
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

    const { id, display_name: name } = await response.json();

    return { id, name };
}

export const getUserPlaylists = async (token, url = 'https://api.spotify.com/v1/me/playlists') => {
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
    });

    const data = await response.json();
    return data;
}

export const getUserPlaylistsById = async (token, userId) => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    const data = await response.json();
    return data;
}

export const getPlaylistArtists = async (token, playlistIds) => {
    const artists = await Promise.all(playlistIds.map(async (playlistId) => {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });

        const { items } = await response.json();

        const artists = items
            .map(item => item.track?.artists?.[0]?.name)
            .reduce((acc, cur) => {
                if (acc.every(a => a !== cur)) {
                    return [...acc, cur];
                }

                return acc;
            }, []);
        
        return artists;
    }));

    const combined = artists.reduce((acc, cur) => {
        const filtered = cur.filter(c => !acc.includes(c));
        return [...acc, ...filtered];
    }, []);

    return combined;
}
