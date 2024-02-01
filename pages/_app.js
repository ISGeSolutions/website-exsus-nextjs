import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
// import React from 'react';

// import { NavLink } from './../components/NavLink';
import { Layout } from "./../components/common";

// import 'styles/globals.css';
import "./../components/CustomModal.css"; // Import your custom styles
import "public/assets/stylesheets/css/bootstrap.css";
import "public/assets/stylesheets/css/bootstrap-select.min.css";
import "styles/globals.css";
// import 'styles/Alert.module.css';
// import './CustomModal.css'; // Import your custom styles
import "public/assets/stylesheets/css/bootstrap.css";
import "public/assets/stylesheets/css/bootstrap-select.min.css";

import "public/assets/font-awesome/fontawesome.css";
import "public/assets/google-icon-fonts/MaterialSymbolsOutlined/MaterialSymbolsOutlined.css";

import "public/assets/stylesheets/css/master.css";
import "public/assets/stylesheets/css/style.css";
import "public/assets/stylesheets/css/responsive.css";
import Script from "next/script";
import { userService } from "services";

import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ukTranslation from "./../data/i18n/uk.json";
import usTranslation from "./../data/i18n/us.json";
import asiaTranslation from "./../data/i18n/asia.json";
import inTranslation from "./../data/i18n/in.json";

// import CookieBanner from './../components/CookieBanner';
import CookieComponent from "./../components/CookieComponent";

// import ReactGA from 'react-ga';
// import { initGA } from './../components/ga';
// import ReactPixel from 'react-facebook-pixel';
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";
import globalVariables from "../config"; './../config';

ReactGA.initialize("G-2H6GP9JWWY");
// import './../../CustomModal_css.css'; // Import your custom styles

i18n.use(LanguageDetector).init({
  resources: {
    uk: {
      translation: ukTranslation,
    },
    us: {
      translation: usTranslation,
    },
    asia: {
      translation: asiaTranslation,
    },
    in: {
      translation: inTranslation,
    },
  },
  fallbackLng: "uk",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

function FacebookPixel() {
  React.useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("YOUR_PIXEL_ID"); // globalVariables?.PIXEL_ID 1613634385322868
        ReactPixel.pageView();
        Router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  });
  return null;
}

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const pathname = router.pathname;

  // Define an array of paths where you want to exclude the layout
  const pathsWithoutLayout = ["/brochure", "/travel-agent-brochures"];
  const shouldRenderLayout = !pathsWithoutLayout.includes(pathname);

  useEffect(() => {
    $(".succss_msg_parnt").hide();
    // initGA();
    ReactGA.initialize(globalVariables?.ReactGA_ID);
    ReactGA.send({
      hitType: "pageview",
      page: "/why-us",
      title: "Custom Title",
    });
    ReactGA.event({
      category: "test category",
      action: "Test action",
      label: "Test label", // optional
      value: 99, // optional, must be a number
      nonInteraction: true, // optional, true/false
      transport: "xhr", // optional, beacon/xhr/image
    });

    // on initial load - run auth check
    authCheck(router.asPath);

    // Initialize Facebook Pixel with your Pixel ID
    // ReactPixel.init('YOUR-PIXEL-ID');

    // Track a page view
    // ReactPixel.pageView();

    // Specify additional initialization and configuration options here

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);


    // userService.login(identifier, password).then(x => {
    //      ('x', x);
    // });

    //  
    setTimeout(() => {
      $(".carousel").carousel({
        interval: 250 * 10,
      });
    }, 2000);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

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

  return shouldRenderLayout ? (
    <Layout>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{globalVariables.title}</title>
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
      {/* <div className="full_loader_parnt_blk loader_parnt_blk" style={{ display: 'block' }}><div className="loader-circle-2"></div></div> */}

      {/* ReactDOM.render( */}
      {/* <CookieBanner /> */}
      <FacebookPixel />
      <I18nextProvider i18n={i18n}>
        {/* <App /> */}
        {authorized && <Component {...pageProps} />}
      </I18nextProvider>
      {/* document.getElementById('root')
                ); */}
      <Helmet>
        <link rel="canonical" href="https://website-exsus-nextjs.vercel.app" />
      </Helmet>
      <CookieComponent />

      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&family=Slabo+27px&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css"
      />

      <Script
        id="card-slider"
        type="text/javascript"
        src="/assets/javascripts/card-slider.js"
      ></Script>
      {/* <Script id="card-slider-height" type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></Script> */}
      <Script
        id="card-slider02"
        type="text/javascript"
        src="/assets/javascripts/card-slider02.js"
      ></Script>
      {/* <script type="text/javascript" src="/assets/javascripts/card-slider-equal-height.js"></script> */}
      <script
        type="text/javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
      ></script>

      <script
        type="text/javascript"
        src="/assets/javascripts/popper.min.js"
      ></script>
      <script
        type="text/javascript"
        src="/assets/javascripts/bootstrap.min.js"
      ></script>
      <script
        type="text/javascript"
        src="/assets/javascripts/bootstrap-select.min.js"
      ></script>
      {/* <script type="text/javascript" src="/assets/javascripts/navigation.js"></script> */}
      {/* credits */}

      <Script
        src="/assets/javascripts/facebook-pixel.js"
        strategy="beforeInteractive"
      />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
