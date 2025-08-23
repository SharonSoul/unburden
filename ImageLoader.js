// 1. CREATE: ImageLoader.js (in your project root directory)
// This file should be at the same level as your package.json

export default function ImageLoader({ src, width, quality }) {
    // For local images (starting with /), serve them directly
    if (src.startsWith('/')) {
      return src;
    }
    
    // For external images, you can add custom logic
    // For now, just return the src as-is
    return src;
  }
  
  // Alternative version if you want to serve from a CDN:
  /*
  export default function ImageLoader({ src, width, quality }) {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-cdn.com' // Replace with your CDN URL
      : '';
      
    // For local images, prepend base URL in production
    if (src.startsWith('/')) {
      return `${baseUrl}${src}`;
    }
    
    // For external images, return as-is
    return src;
  }
  */