/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        'xs': '320px', // Custom breakpoint for a minimum width of 320px
      },
    },
  },
  plugins: [],
  
}

