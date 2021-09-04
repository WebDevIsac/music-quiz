import Cookies from 'js-cookie';
import { getRefreshToken } from './spotify';

export const getParamCode = (location) => {
    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.code) {
        window.history.replaceState({}, '', location.pathname);
        return params.code;
    }

    return null;
}

export const checkForToken = () => {
    const accessToken = Cookies.get('access-token');
    if (accessToken) {
        return accessToken;
    } else {
        const refreshToken = Cookies.get('refresh-token');
        const { newAccessToken, newRefreshToken } = getRefreshToken(refreshToken);

        if (newAccessToken) {
            const in1Hour = 1/24;
            Cookies.set('access-token', accessToken, { expires: in1Hour });
            if (newRefreshToken) {
                Cookies.set('refresh-token', refreshToken, { expires: 5 });
            }

            return newAccessToken;
        }
    }

    window.location.href = `${window.location.origin}/authorize`;
}
