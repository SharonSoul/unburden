// ImageLoader.js
const imageLoader = ({ src, width, quality }) => {
    // For local images in the public folder, just return the src as-is
    // This assumes your images are already optimized or you want to serve them directly
    
    // If the src already starts with a protocol (http/https), return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    
    // For local images, ensure they start with a forward slash
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    
    // You can add query parameters if needed for optimization
    // return `${normalizedSrc}?w=${width}&q=${quality || 75}`;
    
    // For basic usage, just return the normalized src
    return normalizedSrc;
  };
  
  export default imageLoader;