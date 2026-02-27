/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FDFBF7',
          offWhite: '#F7F6F2',
          green: '#2D4A22',
          lightGreen: '#4A6B3A',
          brown: '#5C3A21',
          orange: '#D47B4A',
          mutedOrange: '#E8A37D',
          dark: '#1A1A1A',
          gray: '#E5E5E5',
          textHover: '#4A6B3A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 40px -4px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
      },
      transitionDuration: {
        '250': '250ms',
      },
      screens: {
        'xs': '375px',
      },
      minHeight: {
        'svh': '100svh',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
