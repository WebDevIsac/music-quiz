import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { authorize, getRefreshToken, getUser, getUserPlaylists, getUserPlaylistsById } from 'functions/spotify';
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
    const [playlists, setPlaylists] = useState();

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
            const { href, items, limit, next, offset, previous, total } = playlistObject;

            setPlaylists(items);
        }
    }

    const hasCookie = Cookies.get('refresh-token');

    return user?.id ? (
        <Wrapper>
            <h2>WELCOME {user.name}</h2>
            {playlists ? (
                <Column>
                    {playlists.map(playlist => {
                        const image = playlist.images?.[0]?.url;
                        return (
                            <Playlist key={playlist.id}>
                                <img src={image} alt={playlists.name} />
                                <span>{playlist.name}</span>
                            </Playlist>
                        )}
                    )}
                </Column>
            ) : (
                <button onClick={getPlaylists}>GET MY PLAYLISTS</button>
            )}
        </Wrapper>
    ) : hasCookie ? <div>LOADING...</div> : (
        <div>
            <div>We need you to authorize with your spotify account</div>
            <button onClick={authorize}>AUTHORIZE</button>
        </div>
    )
}

Frontpage.propTypes = {

}

export default Frontpage
