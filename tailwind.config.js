/** @type {import('tailwindcss').Config} */ 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00f3ff",
        secondary: "#8000ff",
        accent: "#ff00c8"
      },
      perspective: {
        '1000': '1000px',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'reverse-spin': 'spin 12s linear infinite reverse',
        'shine': 'shine 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'slideIn': 'slideIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 6s linear infinite',
        'grain': 'grain 8s steps(10) infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'plasma': 'plasma 8s ease-in-out infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        },
        bubble1: {
          '0%, 100%': { transform: 'scale(1.05) rotate(0deg) translateY(0px)' },
          '25%': { transform: 'scale(1.05) rotate(90deg) translateY(5px)' },
          '50%': { transform: 'scale(1.05) rotate(180deg) translateY(-5px)' },
          '75%': { transform: 'scale(1.05) rotate(270deg) translateY(5px)' }
        },
        bubble2: {
          '0%, 100%': { transform: 'scale(1.1) rotate(0deg) translateX(0px)' },
          '25%': { transform: 'scale(1.1) rotate(-90deg) translateX(5px)' },
          '50%': { transform: 'scale(1.1) rotate(-180deg) translateX(-5px)' },
          '75%': { transform: 'scale(1.1) rotate(-270deg) translateX(5px)' }
        },
        bubble3: {
          '0%, 100%': { transform: 'scale(1.15) rotate(0deg)' },
          '33%': { transform: 'scale(1.15) rotate(120deg)' },
          '66%': { transform: 'scale(1.15) rotate(240deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' }
        },
        plasma: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'radial-gradient-vignette': 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 80%)',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}