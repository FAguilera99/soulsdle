/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1B1A55",

          secondary: "#535C91",

          accent: "#6366f1",

          neutral: "#f3f4f6",

          "base-100": "#070F2B",

          info: "#0000ff",

          success: "#16a34a",

          warning: "#2563eb",

          error: "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
