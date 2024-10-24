const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      fontFamily: {
         'logo': ['Matemasie', 'serif'],
         'title': ['Josefin', 'sans-serif']
      },

      extend: {
         fontFamily: {
            'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
         },
         colors: {
            ...colors,
            'title': '#1c2743',
            'text': '#2a495b',
            'text-light': '#3e5b6a',
            'custom-green': '#6b917e',
            'custom-light-green': '#a6c998',
            'custom-dark-green': '#66856c',
            'custom-yellow': '#c8d87d',
            'custom-light-yellow': '#dfe8ae',
            'custom-purple': '#b19b95',
            'custom-pink': '#d6827c',
            'custom-grey': '#849a98',
            'page-bg': '#f6f7f7',
         },
         container: {
            center: true,
            padding: {
               DEFAULT: '1rem',
               md: '2rem',
               lg: '3rem',
            },
         },
      },
   },
   plugins: [],
};

