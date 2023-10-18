import Cookies from 'js-cookie';

// Function to set a cookie when the user consents
export const setCookie = () => {
    Cookies.set('myCookie', 'cookieValue', { expires: 365 });
};

// Function to check if the user has previously consented
export const hasConsented = () => {
    return Cookies.get('myCookieConsent') === 'true';
};
