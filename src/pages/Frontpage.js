import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import { getPlaylistArtists, getUser, getUserPlaylists, getUserPlaylistsById } from 'functions/spotify';
import Cookies from 'js-cookie';
import { checkForToken } from 'functions/utils';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
    padding: 16px;
`;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-bottom: 16px;
`;

const Row = styled('div')`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Playlist = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
    width: auto;
    
    &:first-of-type {
        border-top: 1px solid grey;
    }
    
    & > img {
        width: 100px;
        height: 100px;
        margin-right: 8px;
    }

    &.is-selected {
        background-color: lightblue;
    }
`;

const Button = styled('button')`
    width: 100%;
    height: 56px;
    min-height: 56px;
    flex: 1 1 auto;

    & + button {
        margin-left: 8px;
    }
`;

const Frontpage = () => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [userPlaylists, setUserPlaylists] = useState();
    const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([]);
    const [artists, setArtists] = useState([]);

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
    }, [user]);

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

    const togglePlaylist = (id, isSelected) => {
        if (isSelected) {
            const filteredPlaylists = selectedPlaylistIds.filter(playlistId => playlistId !== id);
            setSelectedPlaylistIds(filteredPlaylists);
        } else {
            setSelectedPlaylistIds(playlistIds => [...playlistIds, id]);
        }
    }

    const saveSelectedPlaylists = async () => {
        const stringifiedIds = JSON.stringify(selectedPlaylistIds);
        Cookies.set('playlist-ids', stringifiedIds, { expires: 5 });

        const playlistArtists = await getPlaylistArtists(token, selectedPlaylistIds);
        setArtists(playlistArtists);
        window.scrollTo(0, 0);
    }

    return artists.length ? (
        <Wrapper>
            <Column>
                <h3>Below are all your selected artists</h3>
                <Link to={{
                    pathname: '/game',
                    state: { artists }
                }}>LETS GO!</Link>
                {artists.map(artist => <span>{artist}</span>)}
            </Column>
        </Wrapper>
    ) : user?.id ? (
        <Wrapper>
            <h2>WELCOME {user.name}</h2>
            {userPlaylists ? (
                <>
                    <Column>
                        {userPlaylists.items.map(playlist => {
                            const image = playlist.images?.[0]?.url;
                            const isSelected = selectedPlaylistIds.some(id => id === playlist.id)
                            return (
                                <Playlist key={playlist.id} className={isSelected ? 'is-selected' : ''} onClick={() => togglePlaylist(playlist.id, isSelected)}>
                                    <img src={image} alt={playlist.name} />
                                    <span>{playlist.name}</span>
                                </Playlist>
                            )}
                        )}
                    </Column>
                    <Row>
                        {userPlaylists.nextUrl && <Button onClick={loadMore}>LOAD MORE...</Button>}
                        {!!selectedPlaylistIds.length && <Button onClick={saveSelectedPlaylists}>CONTINUE</Button>}
                    </Row>
                </>
            ) : (
                <Button onClick={getPlaylists}>GET MY PLAYLISTS</Button>
            )}
        </Wrapper>
    ) : <div>LOADING...</div>;
}

Frontpage.propTypes = {

}

export default Frontpage
