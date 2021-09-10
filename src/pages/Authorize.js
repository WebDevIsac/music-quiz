import React from 'react'
import styled from '@emotion/styled';
import Login from 'components/Login';
import InfoBox from 'components/InfoBox';

const PageWrapper = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const H1 = styled('h1')`
`;

const Authorize = () => {
    return (
        <PageWrapper>
            <H1>Game of artists</H1>
            <InfoBox />
            <Login />
        </PageWrapper>
    )
}

Authorize.propTypes = {

}

export default Authorize
