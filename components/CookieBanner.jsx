import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
    return (
        <CookieConsent
            location="top"
            buttonText="Accept"
            enableDeclineButton
            declineButtonText="Decline"
            cookieName="myCookieConsent"
        >
            This website uses cookies to enhance the user experience.
        </CookieConsent>
    );
};

export default CookieBanner;
