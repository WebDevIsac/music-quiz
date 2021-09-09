import React from 'react';
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
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    return (
        <>
            <Global styles={globalStyle} />
            <Router>
                <Wrapper>
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
