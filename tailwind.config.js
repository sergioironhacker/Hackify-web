/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tw-primary': '#FF385C',
        'tw-light-gray': '#DDDDDD',
        'tw-dark-gray': '#484848',
        'tw-dark': '#333333',
        'tw-primary-accent': '#FF5A5F',
        'tw-background': '#FFFFFF'
      },
      maxWidth: {
        'container': '980px'
      },
      minHeight: {
        "body": "calc(100vh - 70px)"
      }
    },

  },
  plugins: [],
}


