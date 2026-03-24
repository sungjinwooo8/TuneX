/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#080808',
          800: '#121212',
          700: '#1c1c1c',
          600: '#2a2a2a',
        },
        gold: {
          400: '#e5c07b',
          500: '#d4af37',
          600: '#c59b27',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
