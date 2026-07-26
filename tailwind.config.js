/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bebe-rosa': '#f8bbd0',
        'bebe-azul': '#b3e5fc',
        'bebe-fundo': '#fffbf0', // Tom bege claro inspirado no convite da Ana Elis
      }
    },
  },
  plugins: [],
}