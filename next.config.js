/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: './ImageLoader.js',
    // You might also want to add these for better control
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Keep your other configurations if you have them
  experimental: {
    // Only include if you're using app directory (Next.js 13+)
    // appDir: true, // This is now stable, so you might not need it
  },

}

module.exports = nextConfig