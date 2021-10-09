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
      indigo: colors.indigo,
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
        closed: '#cf222e'
      },
      borderRadius: {
        '6xl': '3rem'
      }
    }
  },
  variants: {},
  plugins: []
}
