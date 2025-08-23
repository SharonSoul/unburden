/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 13+
  images: {
    unoptimized: false, // Set to true if you're having optimization issues
  },
}

module.exports = nextConfig
