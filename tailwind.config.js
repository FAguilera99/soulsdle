/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}", "index.html"],
  
  theme: {
    fontFamily: {
      'chivo': ['Chivo Mono', 'ui-sans-serif', 'system-ui'],
      'noto': ['Noto Sans', 'ui-sans-serif', 'system-ui'],
    },
  },

  daisyui: {
    themes: [
      {
        darkside: {
        "primary": "#dedede",
        "secondary": "#8c8b8b",
        "accent": "#7c008f",
        "neutral": "#dedede",
        "base-100": "#111827",
        "info": "#f3f4f6",
        "success": "#7c008f",
        "warning": "#7c008f", 
        "error": "#7c008f",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}

