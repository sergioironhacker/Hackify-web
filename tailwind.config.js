/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tw-primary': '#1DA1F2',
        'tw-light-gray': '#E1E8ED',
        'tw-dark-gray': '#657786',
        'tw-dark': '#14171A',
        'tw-primary-accent': '#FFAD1F',
        'tw-background': '#eee'
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

