/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'uber': ['Uber Move', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s linear infinite',
      },
    },
  },
  plugins: [],
}