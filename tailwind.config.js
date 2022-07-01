/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'navy-primary': '#252a40',
        'navy-secondary': '#0f111a',
      }
    },
  },
  plugins: [],
}
