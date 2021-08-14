import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';

const Wrapper = styled('div')`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    // Save user id as cookie
    // Save selected playlist ids as cookie
    // Ask user if we should load earlier given information

    return (
        <>
            <Global styles={css`body { margin: 0; }`} />
            <Wrapper>
                
            </Wrapper>
        </>
    );
};

export default App;
