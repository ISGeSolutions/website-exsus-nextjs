/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    experimental: {
        newNextLinkBehavior: true,
        esmExternals: true,
    },
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
            ? 'http://localhost:4000' // development api
            : 'http://localhost:4000' // production api
    }
}

module.exports = nextConfig