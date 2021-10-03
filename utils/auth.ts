import nookies from 'nookies';
import jwtDecode from 'jwt-decode';

export const checkAuth = (context: any) => {
    const cookies = nookies.get(context)

    if(cookies.authToken) {
        const decodeToken = jwtDecode(cookies.authToken);
        if (decodeToken.exp * 1000 < Date.now()) {
            return null
        } else {
            return cookies.authToken
        }
    }

    return null;
}

export const verifyAuth = () => {
    if(process.browser) {
        if(localStorage.getItem("authToken")) {
            const token = localStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            return decodedToken
        }
    }

    return false
}