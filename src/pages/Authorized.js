import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getToken } from 'functions/spotify';
import { getParamCode } from 'functions/utils';

const Authorized = props => {
    const location = useLocation();
    
    useEffect(() => {
        const handleCheck = async () => {
            const code = getParamCode(location);

            if (code) {
                const { accessToken, refreshToken } = await getToken(code);

                if (accessToken && refreshToken) {
                    var in1Hour = 1/24;
                    Cookies.set('access-token', accessToken, { expires: in1Hour });
                    Cookies.set('refresh-token', refreshToken, { expires: 5 });

                    window.location.href = window.location.origin;
                }
            }

            console.error("Something went wrong");
        }

        handleCheck();
    }, [location]);

    return (
        <div>
            LOADING...
        </div>
    )
}

Authorized.propTypes = {

}

export default Authorized
