/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#202465',
        secondary: '#CF0000',
        'dark-primary': '#111026',
        'dark-secondary': '#595977',
        light: '#A2A2C2',
        notif: '#FF808B', // use danger instead
        success: '#80D592',
        danger: '#FF808B',
        divider: '#DDDAFE',
        disabled: '#585DA1'
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  safelist: [
    {
      pattern: /^p-.*/,
    },
  ],
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
};
