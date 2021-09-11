import React, { useEffect } from 'react'
import styled from '@emotion/styled';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getToken } from 'functions/spotify';
import { getParamCode } from 'functions/utils';

const PageWrapper = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Authorized = () => {
    const location = useLocation();
    const history = useHistory();
    
    useEffect(() => {
        const handleCheck = async () => {
            const code = getParamCode(location);

            if (code) {
                const { accessToken, refreshToken } = await getToken(code);

                if (accessToken && refreshToken) {
                    var in1Hour = 1/24;
                    Cookies.set('access-token', accessToken, { expires: in1Hour });
                    Cookies.set('refresh-token', refreshToken, { expires: 5 });

                    history.push('/');
                }
            }

            console.error("Something went wrong");
        }

        handleCheck();
    }, [location]);

    return (
        <PageWrapper>
            LOADING...
        </PageWrapper>
    )
}

Authorized.propTypes = {

}

export default Authorized
