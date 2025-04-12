/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#0077CC',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}