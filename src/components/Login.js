import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { authorize } from 'functions/spotify';

const Column = styled('div')`
    flex: 1 1 60%;
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
    width: 320px;
    font-size: 16px;
    cursor: pointer;
`;

const Login = () => {
    return (
        <Column>
            <Span>Login with your Spotify account</Span>
            <Button onClick={authorize}>LOGIN</Button>
            <Span>Or...</Span>
            <Link to="/custom-selection">
                <Button>SELECT ARTISTS</Button>
            </Link>
        </Column>
    );
};

Login.propTypes = {

};

export default Login;
