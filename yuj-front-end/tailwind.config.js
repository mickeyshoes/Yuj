/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#EBE8DF",

          "secondary": "#B7AFBD",

          "accent": "#90859A",

          "neutral": "#323131",

          "base-100": "#F8F6F3",

          "info": "#D9D9D9",

          "success": "#B7AFBD",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}