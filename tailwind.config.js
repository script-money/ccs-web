// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/components/*.tsx',
    './index.html'
  ],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: colors.green,
      red: colors.red,
      indigo: colors.indigo,
      orange: colors.orange,
      blue: colors.blue,
      purple: colors.purple,
      All: colors.trueGray,
      Interact: colors.red,
      Form: colors.amber,
      Vote: colors.lime,
      Test: colors.emerald,
      Node: colors.cyan,
      Learn: colors.blue,
      Create: colors.violet,
      Develop: colors.fuchsia,
      Whitelist: colors.rose,
      IXO: colors.sky,
      LuckDraw: colors.pink,
      Register: colors.teal,
      Airdrop: colors.blueGray
    },
    screens: {
      sm: '412px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite'
      },
      boxShadow: {
        checkbox: '#F7931A 0 0 0 1px inset;'
      },
      colors: {
        main: '#F7931A',
        open: '#1a7f37',
        closed: '#cf222e',
        discord: '#586aea'
      },
      borderRadius: {
        '6xl': '3rem'
      }
    }
  },
  variants: {
    extend: {
      textColor: ['visited'],
      opacity: ['disabled']
    }
  },
  plugins: []
}
