/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  async redirects() {
    // Add slug change redirects here.
    return [
      {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'shipsbd.com',
        },
      ],
      destination: 'https://www.shipsb.com/:path*',
      permanent: true, // 301
    },
    ];
  }
};

module.exports = nextConfig;

