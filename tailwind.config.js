/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern futuristic color palette
        'charcoal': '#1A1A1A',
        'dark-grey': '#2A2A2A',
        'medium-grey': '#3A3A3A',
        'light-grey': '#4A4A4A',
        'white': '#FFFFFF',
        'off-white': '#F5F5F5',
        'orange': '#FF6B35',
        'orange-light': '#FF8A65',
        'orange-dark': '#E55A2B',
        'accent-blue': '#4A90E2',
        'accent-purple': '#9B59B6',
      },
      fontFamily: {
        modern: ["var(--font-inter)", "system-ui", "sans-serif"], // Inter (Google)
        heroFont: ["var(--font-heroFont)", "system-ui", "sans-serif"], // HeroFont
        heroFont2: ["var(--font-heroFont2)", "system-ui", "sans-serif"], // HeroFont2
      },
      
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
        'glow-blue': '0 0 20px rgba(74, 144, 226, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
