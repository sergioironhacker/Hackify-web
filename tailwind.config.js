/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilitar el modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        'tw-dark-gray': '#484848',
        'tw-dark': '#333333',
        'tw-primary-accent': '#FF5A5F',
        'tw-background': '#FFFFFF'
      },
    },
  },
  plugins: [],
}
