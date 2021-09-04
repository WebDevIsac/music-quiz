export const getParamCode = (location) => {
    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.code) {
        window.history.replaceState({}, '', location.pathname);
        return params.code;
    }

    return null;
}
