

const nextConfig = {
    async redirects() {
      return [
        {
          source: '/:path*',      // match all routes
          has: [
            {
              type: 'host',
              value: 'www.bombayblokes.com', // replace with your www domain
            },
          ],
          destination: 'https://bombayblokes.com/*', // non-www target
          permanent: true,        // 301 redirect
        },
      ];
    },
  };