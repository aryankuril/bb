/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*', // match all routes
        has: [
          {
            type: 'host',
            value: 'www.bombayblokes.com', // match the www domain
          },
        ],
        destination: 'https://bombayblokes.com/:path*', // full non-www URL
        permanent: true, // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
