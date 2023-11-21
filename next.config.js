/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = {
  // async rewrites() {
  //     return [
  //       { source: '/:region', destination: '/[region]' },
  //     ];
  //   },

  async rewrites() {
    return [

      //index page 
      { source: "/uk", destination: "/" },
      { source: "/us", destination: "/" },
      { source: "/asia", destination: "/" },
      { source: "/in", destination: "/" },

      // destinations
      { source: "/destinations", destination: "/destinations" },
      { source: "/us/destinations", destination: "/destinations" },
      { source: "/asia/destinations", destination: "/destinations" },
      { source: "/in/destinations", destination: "/destinations" },

      // continent
      { source: "/destinations/:continent", destination: "/continent" },
      { source: "/us/destinations/:continent", destination: "/continent" },
      { source: "/asia/destinations/:continent", destination: "/continent" },
      { source: "/in/destinations/:continent", destination: "/continent" },

      // continentcountries
      {
        source: "/destinations/:continent",
        destination: "/continentcountries",
      },
      {
        source: "/us/destinations/:continent",
        destination: "/continentcountries",
      },
      {
        source: "/asia/destinations/:continent",
        destination: "/continentcountries",
      },
      {
        source: "/in/destinations/:continent",
        destination: "/continentcountries",
      },

      // continentexperiences
      {
        source: "/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/us/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/asia/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/in/continentexperiences",
        destination: "/continentexperiences",
      },

      // continentitineraries
      {
        source: "/destinations/:continent",
        destination: "/continentitineraries",
      },
      {
        source: "/us/destinations/:continent",
        destination: "/continentitineraries",
      },
      {
        source: "/asia/destinations/:continent",
        destination: "/continentitineraries",
      },
      {
        source: "/in/destinations/:continent",
        destination: "/continentitineraries",
      },

      // continentplacetostay
      {
        source: "/destinations/:continent",
        destination: "/continentplacetostay",
      },
      {
        source: "/us/destinations/:continent",
        destination: "/continentplacetostay",
      },
      {
        source: "/asia/destinations/:continent",
        destination: "/continentplacetostay",
      },
      {
        source: "/in/destinations/:continent",
        destination: "/continentplacetostay",
      },

      // country
      {
        source: "/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/us/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/asia/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/in/destinations/:continent/:country",
        destination: "/country",
      },

      // countryregions
      {
        source: "/destinations/:continent/:country/countryregions",
        destination: "/countryregions",
      },
      {
        source: "/us/destinations/:continent/:country/countryregions",
        destination: "/countryregions",
      },
      {
        source: "/asia/destinations/:continent/:country/countryregions",
        destination: "/countryregions",
      },
      {
        source: "/in/destinations/:continent/:country/countryregions",
        destination: "/countryregions",
      },

      // countryitineraries
      {
        source: "/destinations/:continent/:country/countryitineraries",
        destination: "/countryitineraries",
      },
      {
        source: "/us/destinations/:continent/:country/countryitineraries",
        destination: "/countryitineraries",
      },
      {
        source: "/asia/destinations/:continent/:country/countryitineraries",
        destination: "/countryitineraries",
      },
      {
        source: "/in/destinations/:continent/:country/countryitineraries",
        destination: "/countryitineraries",
      },

      // countrywhentogo
      {
        source: "/destinations/:continent/:country/countrywhentogo",
        destination: "/countrywhentogo",
      },
      {
        source: "/us/destinations/:continent/:country/countrywhentogo",
        destination: "/countrywhentogo",
      },
      {
        source: "/asia/destinations/:continent/:country/countrywhentogo",
        destination: "/countrywhentogo",
      },
      {
        source: "/in/destinations/:continent/:country/countrywhentogo",
        destination: "/countrywhentogo",
      },

      // countryplacestostay
      {
        source: "/destinations/:continent/:country/countryplacestostay",
        destination: "/countryplacestostay",
      },
      {
        source: "/us/destinations/:continent/:country/countryplacestostay",
        destination: "/countryplacestostay",
      },
      {
        source: "/asia/destinations/:continent/:country/countryplacestostay",
        destination: "/countryplacestostay",
      },
      {
        source: "/in/destinations/:continent/:country/countryplacestostay",
        destination: "/countryplacestostay",
      },

      // country_details
      {
        source: "/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/us/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/asia/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/in/destinations/:continent/:country",
        destination: "/country_details",
      },


      // country_details
      {
        source: "/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/us/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/asia/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/in/destinations/:continent/:country/:region",
        destination: "/regions",
      },

      // holiday-types
      { source: "/holiday-types", destination: "/holiday-types" },
      { source: "/us/holiday-types", destination: "/holiday-types" },
      { source: "/asia/holiday-types", destination: "/holiday-types" },
      { source: "/in/holiday-types", destination: "/holiday-types" },

      // holidaytypeitineraries
      {
        source: "/holiday-types/:holidaytypeitineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source: "/us/holiday-types/:holidaytypeitineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source: "/asia/holiday-types/:holidaytypeitineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source: "/in/holiday-types/:holidaytypeitineraries",
        destination: "/holidaytypeitineraries",
      },

      // holidaytypeideas
      {
        source: "/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/us/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/asia/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/in/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },

      // itinerarydetail
      // { source: "/itinerarydetail", destination: "/itinerarydetail" },
      // { source: "/us/itinerarydetail", destination: "/itinerarydetail" },
      // { source: "/asia/itinerarydetail", destination: "/itinerarydetail" },
      // { source: "/in/itinerarydetail", destination: "/itinerarydetail" },

      // special-offers
      { source: "/special-offers", destination: "/special-offers" },
      { source: "/us/special-offers", destination: "/special-offers" },
      { source: "/asia/special-offers", destination: "/special-offers" },
      { source: "/in/special-offers", destination: "/special-offers" },

      // itinerarydetail
      {
        source:
          "/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/us/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/asia/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/in/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },

      // advance search
      { source: "/advance-search", destination: "/advance-search" },
      { source: "/us/advance-search", destination: "/advance-search" },
      { source: "/asia/advance-search", destination: "/advance-search" },
      { source: "/in/advance-search", destination: "/advance-search" },

      // contact-us
      { source: "/contact-us", destination: "/contact-us" },
      { source: "/us/contact-us", destination: "/contact-us" },
      { source: "/asia/contact-us", destination: "/contact-us" },
      { source: "/in/contact-us", destination: "/contact-us" },

      // make-an-enquiry
      { source: "/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/us/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/asia/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/in/make-an-enquiry", destination: "/make-an-enquiry" },

      // client-reviews
      { source: "/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/us/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/asia/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/in/why-us/client-reviews", destination: "/client-reviews" },

      // special-offers

      // hotel-detail
      { source: "/hotel-detail", destination: "/hotel-detail" },
      { source: "/us/hotel-detail", destination: "/hotel-detail" },
      { source: "/asia/hotel-detail", destination: "/hotel-detail" },
      { source: "/asia/hotel-detail", destination: "/hotel-detail" },

      // Blog
      { source: "/blog", destination: "/blog" },
      { source: "/us/blog", destination: "/blog" },
      { source: "/asia/blog", destination: "/blog" },
      { source: "/in/blog", destination: "/blog" },

      // blog-detail
      { source: "/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/us/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/asia/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/in/blog/:blogdetail", destination: "/blog-detail" },

      // blog-detail
      { source: "/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/us/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/asia/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/in/blog/:blogdetail", destination: "/blog-detail" },

      // why-us
      { source: "/why-us", destination: "/why-us" },
      { source: "/us/why-us", destination: "/why-us" },
      { source: "/asia/why-us", destination: "/why-us" },
      { source: "/in/why-us", destination: "/why-us" },

      // our people
      { source: "/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/us/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/asia/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/in/why-us/our-people", destination: "/why-us/our-people" },

      // our people detail
      {
        source: "/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/us/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/asia/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/in/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },

      // where-to-go-detail
      {
        source: "/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/us/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/asia/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/in/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },

      // about-us
      { source: "/about-us", destination: "/about-us" },
      { source: "/us/about-us", destination: "/about-us" },
      { source: "/asia/about-us", destination: "/about-us" },
      { source: "/in/about-us", destination: "/about-us" },

      // where-to-go
      { source: "/where-to-go", destination: "/where-to-go" },
      { source: "/us/where-to-go", destination: "/where-to-go" },
      { source: "/asia/where-to-go", destination: "/where-to-go" },
      { source: "/in/where-to-go", destination: "/where-to-go" },

      // careers
      { source: "/about-us/careers", destination: "/careers" },
      { source: "/us/about-us/careers", destination: "/careers" },
      { source: "/asia/about-us/careers", destination: "/careers" },
      { source: "/in/about-us/careers", destination: "/careers" },

      // creating-your-trip
      {
        source: "/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/us/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/asia/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/in/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },

      // gift-list
      {
        source: "/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/us/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/asia/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/in/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },

      // referral
      {
        source: "/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/us/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/asia/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/in/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },

      // privacy-policy
      { source: "/privacy-policy", destination: "/privacy-policy" },
      { source: "/us/privacy-policy", destination: "/privacy-policy" },
      { source: "/asia/privacy-policy", destination: "/privacy-policy" },
      { source: "/in/privacy-policy", destination: "/privacy-policy" },

      // terms-and-condition
      { source: "/terms-and-conditions", destination: "/terms-and-conditions" },
      {
        source: "/us/terms-and-conditions",
        destination: "/terms-and-conditions",
      },
      {
        source: "/asia/terms-and-conditions",
        destination: "/terms-and-conditions",
      },
      {
        source: "/in/terms-and-conditions",
        destination: "/terms-and-conditions",
      },

      // Define a custom error page for 404 errors
      {
        source: "/:path*",
        destination: "/404",
      },

      // Add more custom routes as needed
    ];
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "2204", // @@@
      database: "next-js-registration-login-example",
    },
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? // ? 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // development api
        // : 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // production api
        // ? 'http://localhost:4000' // development api
        // : 'http://localhost:4000' // production api
        // ? 'https://mock.apidog.com/m1/379394-0-default' // development api
        // : 'https://mock.apidog.com/m1/379394-0-default' // production api
        //     ? 'http://13.233.122.205:1337' // development api
        //     : 'http://13.233.122.205:1337' // production api

        "https://cms-api.excelleresolutions.com" // development api
        : "https://cms-api.excelleresolutions.com", // production api
    apiUrl1:
      process.env.NODE_ENV === "development"
        ? "http://3.110.223.197:1337" // client data development api
        : "http://3.110.223.197:1337", // client data production api
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

(module.exports = nextConfig),
  withImages({
    // Configure the options for next-images
    images: {
      // Define the directory where your images are stored (default: 'public')
      path: "/public",
    },
  });
