import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { getUser, getUserPlaylists, getUserPlaylistsById } from 'functions/spotify';
import Cookies from 'js-cookie';
import { checkForToken } from 'functions/utils';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 16px;
`;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    font-size: 20px;
`;

const Playlist = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;

    & > img {
        width: 100px;
        height: 100px;
        margin-right: 8px;
    }
`;

const Frontpage = () => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [userPlaylists, setUserPlaylists] = useState();

    useEffect(() => {
        const handleAuth = async (token) => {
            if (token) {
                const fetchedUser = await getUser(token);
                
                setUser(fetchedUser);
            }
        };

        const checkAuth = async () => {
            const accessToken = checkForToken();
            setToken(accessToken);

            if (accessToken) {
                handleAuth(accessToken);
            }
        }

        if (!user) {
            checkAuth();
        }
    }, []);

    const getPlaylists = async (userId) => {
        let playlistObject;
        if (userId && typeof userId === 'string') {
            playlistObject = await getUserPlaylistsById(token, userId);
        } else {
            playlistObject = await getUserPlaylists(token);
        }

        if (playlistObject) {
            const { href, items, limit, next: nextUrl, offset, previous, total } = playlistObject;
            const current = limit + offset;
            
            setUserPlaylists({items, nextUrl, current, total});
        }
    }

    const loadMore = async (userId) => {
        let playlistObject;
        if (userId && typeof userId === 'string') {
            playlistObject = await getUserPlaylistsById(token, userId, userPlaylists.nextUrl);
        } else {
            playlistObject = await getUserPlaylists(token, userPlaylists.nextUrl);
        }

        if (playlistObject) {
            const { href, items, limit, next: nextUrl, offset, previous, total } = playlistObject;
            const current = limit + offset;
            const playlistItems = [...userPlaylists.items, ...items];
            
            setUserPlaylists({items: playlistItems, nextUrl, current, total});
        }
    }

    const hasCookie = Cookies.get('refresh-token');

    return user?.id ? (
        <Wrapper>
            <h2>WELCOME {user.name}</h2>
            {userPlaylists ? (
                <>
                    <Column>
                        {userPlaylists.items.map(playlist => {
                            const image = playlist.images?.[0]?.url;
                            return (
                                <Playlist key={playlist.id}>
                                    <img src={image} alt={playlist.name} />
                                    <span>{playlist.name}</span>
                                </Playlist>
                            )}
                        )}
                    </Column>
                    {userPlaylists.nextUrl && <button onClick={loadMore}>LOAD MORE...</button>}
                </>
            ) : (
                <button onClick={getPlaylists}>GET MY PLAYLISTS</button>
            )}
        </Wrapper>
    ) : <div>LOADING...</div>;
}

Frontpage.propTypes = {

}

export default Frontpage
