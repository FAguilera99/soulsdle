/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./game.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
    }
  },
  plugins: [
require('daisyui'),],
}

