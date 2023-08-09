import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// import { NavLink } from './../components/NavLink';
import { Layout } from './../components/common';

import 'styles/globals.css';
import 'public/assets/stylesheets/css/bootstrap.css';
import 'public/assets/stylesheets/css/bootstrap-select.min.css';

import 'public/assets/font-awesome/fontawesome.css';
import 'public/assets/google-icon-fonts/MaterialSymbolsOutlined/MaterialSymbolsOutlined.css';

import 'public/assets/stylesheets/css/master.css';
import 'public/assets/stylesheets/css/style.css';
import 'public/assets/stylesheets/css/responsive.css';
import Script from 'next/script';

import { userService } from 'services';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        const identifier = "vidya@isgesolutions.com";
        const password = "vpIsg@2023";

        userService.login(identifier, password).then(x => {
            console.log('x', x);
        });

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        // setUser(userService.userValue);
        // const publicPaths = ['/account/login', '/account/register'];
        // const path = url.split('?')[0];
        // if (!userService.userValue && !publicPaths.includes(path)) {
        //     setAuthorized(false);
        //     router.push({
        //         pathname: '/account/login',
        //         query: { returnUrl: router.asPath }
        //     });
        // } else {
        //     setAuthorized(true);
        // }
        setAuthorized(true);
    }

    return (
        <Layout>
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Luxury Holiday Destinations</title>
                <link rel="icon" type="images/png" href="/images/fav-icon.png" />


                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script>
                <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script> */}


                {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> */}

            </Head>
            
            {authorized &&
                <Component {...pageProps} />
            }
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&family=Slabo+27px&display=swap" rel="stylesheet" />
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css' />

            <script type="text/javascript" src="/assets/javascripts/popper.min.js"></script>
            <script type="text/javascript" src="/assets/javascripts/bootstrap.min.js"></script>
            <Script id="card-slider" type="text/javascript" src="/assets/javascripts/card-slider.js"></Script>
            <Script id="card-slider-height" type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></Script>

            {/* <script type="text/javascript" src="/assets/javascripts/card-slider.js"></script> */}
            {/* <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script> */}
            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
            <script type="text/javascript" src="/assets/javascripts/bootstrap-select.min.js"></script>
            <script type="text/javascript" src="/assets/javascripts/navigation.js"></script>

            {/* credits */}

        </Layout>
    );
}
