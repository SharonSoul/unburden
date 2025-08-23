/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable image optimization for Vercel deployment issues
    unoptimized: true,
    // Alternative: Configure allowed domains if using external images
    // domains: ['your-domain.com'],
    // Or use remotePatterns for more control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**',
    //   },
    // ],
  },
  // Ensure static files are served correctly
  trailingSlash: false,
 
}

module.exports = nextConfig