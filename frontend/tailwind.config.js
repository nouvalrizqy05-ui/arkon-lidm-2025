/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arkon-blue': '#0ea5e9',
        'arkon-dark': '#0f172a',
        'arkon-card': '#1e293b',
      }
    },
  },
  plugins: [],
}