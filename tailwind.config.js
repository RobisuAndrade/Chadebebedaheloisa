/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['"Alex Brush"', 'cursive'],
        'elegante': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}