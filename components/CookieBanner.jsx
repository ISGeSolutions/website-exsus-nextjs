import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieBanner = () => {
    return (

        // shashi's code
        <CookieConsent
            location="top"
            buttonText="Accept"
            enableDeclineButton
            declineButtonText="Decline"
            cookieName="myCookieConsent"
        >
            This website uses cookies to enhance the user experience.
        </CookieConsent>




        // Abhilasha's code
        // <CookieConsent
        //     location="bottom"
        //     buttonText="Accept Cookies" // Rename the button
        //     enableDeclineButton
        //     declineButtonText="Close" // Rename the decline button
        //     cookieName="myCookieConsent"
        // >
        //     <div className="cookies_parnt_blk" style={{ display: 'block' }}>
        //         <h6>
        //             <em className="material-symbols-outlined">cookie</em>Cookie policy
        //             <button className="btn cookies_close_btn">
        //                 <em className="material-symbols-outlined">close</em>
        //             </button>
        //         </h6>
        //         <p>Exsus uses cookies to give you the best experience on our website. By continuing, we assume you're OK with this.</p>
        //         <button class="btn prmry_btn">Accept & continue<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 267 512.43"><path fill-rule="nonzero" d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z" /></svg></button>
        //     </div>
        // </CookieConsent>
    );
};

export default CookieBanner;
