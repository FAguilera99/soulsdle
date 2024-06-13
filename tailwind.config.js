/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "primary": "#dedede",
        "secondary": "#8c8b8b",
        "accent": "#7c008f",
        "neutral": "#dedede",
        "base-100": "#111827",
        "info": "#f3f4f6",
        "success": "#7c008f",
        "warning": "#7c008f", 
        "error": "#7c008f",
      }
    }
  },
  plugins: [
require('daisyui'),],
}

