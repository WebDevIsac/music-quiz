import React from 'react';
import styled from '@emotion/styled';
import { authorize } from 'functions/spotify';

const Column = styled('div')`
    height: 100vh;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
        margin-bottom: 16px;
    }
`;

const Span = styled('span')`
`;

const Button = styled('button')`
    color: white;
    background-color: darkseagreen;
    border: none;
    border-radius: 25px;
    height: 56px;
    width: 80%;
    max-width: 320px;
    font-size: 16px;
`;

const Login = () => {
    return (
        <Column>
            <Span>Login with your Spotify account</Span>
            <Button onClick={authorize}>LOGIN</Button>
            <Span>Or...</Span>
            <Button onClick={authorize}>SELECT ARTISTS</Button>
        </Column>
    );
};

Login.propTypes = {

};

export default Login;
