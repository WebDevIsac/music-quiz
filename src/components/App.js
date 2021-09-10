import React, { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import Frontpage from 'pages/Frontpage';
import Game from 'pages/Game';
import Authorize from 'pages/Authorize';
import Authorized from 'pages/Authorized';
import NotFound from 'pages/NotFound';
import { globalStyle } from 'utils/styles';

const Wrapper = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
`;

const App = () => {
    const wrapperRef = useRef();

    useLayoutEffect(() => {
        const setWrapperHeight = () => {
            const customViewHeight = window.innerHeight * 0.01;
            
            if (wrapperRef.current) {
                wrapperRef.current.style.setProperty('--vh', `${customViewHeight}px`);
            }
        }

        setWrapperHeight();
        window.addEventListener('resize', setWrapperHeight);

        return () => window.removeEventListener('resize', setWrapperHeight);
    }, []);

    return (
        <>
            <Global styles={globalStyle} />
            <Router>
                <Wrapper ref={wrapperRef}>
                    <Switch>
                        <Route exact path="/">
                            <Frontpage />
                        </Route>
                        <Route exact path="/game">
                            <Game />
                        </Route>
                        <Route exact path="/authorize">
                            <Authorize />
                        </Route>
                        <Route path="/authorized">
                            <Authorized />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Wrapper>
            </Router>
        </>
    );
};

export default App;
