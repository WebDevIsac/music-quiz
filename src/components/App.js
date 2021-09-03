import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { authorize, getUserPlaylists} from '../functions/spotify';

const Wrapper = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    const [state, setState] = useState({
        userId: '',
    });
    // Save user id as cookie
    // Save selected playlist ids as cookie
    // Ask user if we should load earlier given information

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPlaylists = await getUserPlaylists(state.userId);

        if (userPlaylists) {
            setState({ ...state, playlists: userPlaylists });
        }

    };

    const handleAuth = () => {
        authorize();
    }

    return (
        <>
            <Global styles={css`body { margin: 0; }`} />
            <Wrapper>
                <form onSubmit={handleSubmit}>
                    <input value={state.userId} onChange={(e) => setState({ ...state, userId: e.target.value })} />
                    <button type="submit">OK!</button>
                </form>
                <div onClick={handleAuth}>AUTHORIZE!</div>
            </Wrapper>
        </>
    );
};

export default App;
