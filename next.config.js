/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dk2e0vvpd/**', // ← replace
      },
    ],
  },
};

module.exports = nextConfig;
