import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { authorize, getRefreshToken, getUser } from 'functions/spotify';
import Cookies from 'js-cookie';

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const Frontpage = props => {
    const [user, setUser] = useState();
    useEffect(() => {
        const handleAuth = async (token) => {
            console.log(token);
            if (token) {
                const fetchedUser = await getUser(token);
                
                setUser(fetchedUser);
            }
        };

        const checkAuth = async () => {
            const accessToken = Cookies.get('access-token');
            const refreshToken = Cookies.get('refresh-token');

            if (accessToken) {
                handleAuth(accessToken);
            } else if (refreshToken) {
                const { newAccessToken, newRefreshToken, ...rest } = await getRefreshToken(refreshToken);
                console.log(rest);

                var in1Hour = 1/24;
                Cookies.set('access-token', newAccessToken, { expires: in1Hour });
                if (newRefreshToken) {
                    Cookies.set('refresh-token', newRefreshToken, { expires: 5 });
                }

                handleAuth(newAccessToken);
            }
        }

        checkAuth();
    }, []);

    return user ? (
        <div>WELCOME</div>
    ) : (
        <div>
            <div>We need you to authorize with your spotify account</div>
            <button onClick={authorize}>AUTHORIZE</button>
        </div>
    )
}

Frontpage.propTypes = {

}

export default Frontpage
