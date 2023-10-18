/** @type {import('next').NextConfig} */

const nextConfig = {
    // async rewrites() {
    //     return [
    //       { source: '/:region', destination: '/[region]' },
    //     ];
    //   },

    async rewrites() {
        return [
            // destinations
            { source: '/uk/destinations', destination: '/destinations' },
            { source: '/us/destinations', destination: '/destinations' },
            { source: '/asia/destinations', destination: '/destinations' },
            { source: '/in/destinations', destination: '/destinations' },

            // continent
            { source: '/uk/continent', destination: '/continent' },
            { source: '/us/continent', destination: '/continent' },
            { source: '/asia/continent', destination: '/continent' },
            { source: '/in/continent', destination: '/continent' },

            // continentcountries
            { source: '/uk/continentcountries', destination: '/continentcountries' },
            { source: '/us/continentcountries', destination: '/continentcountries' },
            { source: '/asia/continentcountries', destination: '/continentcountries' },
            { source: '/in/continentcountries', destination: '/continentcountries' },

            // continentexperiences
            { source: '/uk/continentexperiences', destination: '/continentexperiences' },
            { source: '/us/continentexperiences', destination: '/continentexperiences' },
            { source: '/asia/continentexperiences', destination: '/continentexperiences' },
            { source: '/in/continentexperiences', destination: '/continentexperiences' },

            // continentitineraries
            { source: '/uk/continentitineraries', destination: '/continentitineraries' },
            { source: '/us/continentitineraries', destination: '/continentitineraries' },
            { source: '/asia/continentitineraries', destination: '/continentitineraries' },
            { source: '/in/continentitineraries', destination: '/continentitineraries' },

            // continentplacetostay
            { source: '/uk/continentplacetostay', destination: '/continentplacetostay' },
            { source: '/us/continentplacetostay', destination: '/continentplacetostay' },
            { source: '/asia/continentplacetostay', destination: '/continentplacetostay' },
            { source: '/in/continentplacetostay', destination: '/continentplacetostay' },

            // country
            { source: '/uk/country', destination: '/country' },
            { source: '/us/country', destination: '/country' },
            { source: '/asia/country', destination: '/country' },
            { source: '/in/country', destination: '/country' },

            // countryregions
            { source: '/uk/countryregions', destination: '/countryregions' },
            { source: '/us/countryregions', destination: '/countryregions' },
            { source: '/asia/countryregions', destination: '/countryregions' },
            { source: '/in/countryregions', destination: '/countryregions' },

            // countryitineraries
            { source: '/uk/countryitineraries', destination: '/countryitineraries' },
            { source: '/us/countryitineraries', destination: '/countryitineraries' },
            { source: '/asia/countryitineraries', destination: '/countryitineraries' },
            { source: '/in/countryitineraries', destination: '/countryitineraries' },

            // countrywhentogo
            { source: '/uk/countrywhentogo', destination: '/countrywhentogo' },
            { source: '/us/countrywhentogo', destination: '/countrywhentogo' },
            { source: '/asia/countrywhentogo', destination: '/countrywhentogo' },
            { source: '/in/countrywhentogo', destination: '/countrywhentogo' },

            // countryplacestostay
            { source: '/uk/countryplacestostay', destination: '/countryplacestostay' },
            { source: '/us/countryplacestostay', destination: '/countryplacestostay' },
            { source: '/asia/countryplacestostay', destination: '/countryplacestostay' },
            { source: '/in/countryplacestostay', destination: '/countryplacestostay' },

            // country_details
            { source: '/uk/country_details', destination: '/country_details' },
            { source: '/us/country_details', destination: '/country_details' },
            { source: '/asia/country_details', destination: '/country_details' },
            { source: '/in/country_details', destination: '/country_details' },

            // holiday-types
            { source: '/uk/holiday-types', destination: '/holiday-types' },
            { source: '/us/holiday-types', destination: '/holiday-types' },
            { source: '/asia/holiday-types', destination: '/holiday-types' },
            { source: '/in/holiday-types', destination: '/holiday-types' },

            // holidaytypeideas
            { source: '/uk/holidaytypeideas', destination: '/holidaytypeideas' },
            { source: '/us/holidaytypeideas', destination: '/holidaytypeideas' },
            { source: '/asia/holidaytypeideas', destination: '/holidaytypeideas' },
            { source: '/in/holidaytypeideas', destination: '/holidaytypeideas' },

            // holidaytypeitineraries
            { source: '/uk/holidaytypeitineraries', destination: '/holidaytypeitineraries' },
            { source: '/us/holidaytypeitineraries', destination: '/holidaytypeitineraries' },
            { source: '/asia/holidaytypeitineraries', destination: '/holidaytypeitineraries' },
            { source: '/in/holidaytypeitineraries', destination: '/holidaytypeitineraries' },

            // itinerarydetail
            { source: '/uk/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/us/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/asia/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/in/itinerarydetail', destination: '/itinerarydetail' },

            // special-offers
            { source: '/uk/special-offers', destination: '/special-offers' },
            { source: '/us/special-offers', destination: '/special-offers' },
            { source: '/asia/special-offers', destination: '/special-offers' },
            { source: '/in/special-offers', destination: '/special-offers' },

            // itineraries
            { source: '/uk/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/us/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/asia/itinerarydetail', destination: '/itinerarydetail' },
            { source: '/in/itinerarydetail', destination: '/itinerarydetail' },

            // itineraries
            { source: '/uk/advance-search', destination: '/advance-search' },
            { source: '/us/advance-search', destination: '/advance-search' },
            { source: '/asia/advance-search', destination: '/advance-search' },
            { source: '/in/advance-search', destination: '/advance-search' },

            // contact-us
            { source: '/uk/contact-us', destination: '/contact-us' },
            { source: '/us/contact-us', destination: '/contact-us' },
            { source: '/asia/contact-us', destination: '/contact-us' },
            { source: '/in/contact-us', destination: '/advance-search' },


            // client-reviews
            { source: '/why-us/client-reviews', destination: '/client-reviews' },

            // special-offers

            // hotel-detail
            { source: '/uk/hotel-detail', destination: '/hotel-detail' },
            { source: '/us/hotel-detail', destination: '/hotel-detail' },
            { source: '/asia/hotel-detail', destination: '/hotel-detail' },
            { source: '/asia/hotel-detail', destination: '/hotel-detail' },

            // blog-detail
            { source: "/uk/blog/blog-detail", destination: "/blog-detail" },
            { source: "/us/blog/blog-detail", destination: "/blog-detail" },
            { source: "/asia/blog/blog-detail", destination: "/blog-detail" },
            { source: "/in/blog/blog-detail", destination: "/blog-detail" },

            // regions-detail
            { source: "/uk/regions", destination: "/regions" },
            { source: "/us/regions", destination: "/regions" },
            { source: "/asia/regions", destination: "/regions" },
            { source: "/in/regions", destination: "/regions" },

            // where-to-go-detail
            { source: "/uk/where-to-go-detail", destination: "/where-to-go-detail" },
            { source: "/us/where-to-go-detail", destination: "/where-to-go-detail" },
            { source: "/asia/where-to-go-detail", destination: "/where-to-go-detail" },
            { source: "/in/where-to-go-detail", destination: "/where-to-go-detail" },
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
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '2204', // @@@
            database: 'next-js-registration-login-example'
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            // ? 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // development api
            // : 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // production api
            // ? 'http://localhost:4000' // development api
            // : 'http://localhost:4000' // production api
            // ? 'https://mock.apidog.com/m1/379394-0-default' // development api
            // : 'https://mock.apidog.com/m1/379394-0-default' // production api
            //     ? 'http://13.233.122.205:1337' // development api
            //     : 'http://13.233.122.205:1337' // production api

            ? 'https://cms-api.excelleresolutions.com' // development api
            : 'https://cms-api.excelleresolutions.com', // production api
        apiUrl1: process.env.NODE_ENV === 'development'
            ? 'http://3.110.223.197:1337' // client data development api
            : 'http://3.110.223.197:1337' // client data production api
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
}

module.exports = nextConfig

