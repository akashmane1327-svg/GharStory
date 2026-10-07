/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light:   '#e8c84e',
          dark:    '#b8962e',
        },
        dark: {
          DEFAULT: '#0b0b0b',
          card:    '#111111',
          border:  '#1e1e1e',
          hover:   '#161616',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #b8962e 100%)',
      },
    },
  },
  plugins: [],
}
