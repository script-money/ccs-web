// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enable: true,
    content: ['./src/**/*.tsx', './src/components/**/*.tsx', './index.html'],
    safelist: [
      'bg-All-100',
      'bg-Interact-100',
      'bg-Form-100',
      'bg-Vote-100',
      'bg-Test-100',
      'bg-Node-100',
      'bg-Learn-100',
      'bg-Create-100',
      'bg-Develop-100',
      'bg-Whitelist-100',
      'bg-IXO-100',
      'bg-LuckDraw-100',
      'bg-Register-100',
      'bg-Airdrop-100',
      'bg-Mint-100',
      'bg-Claim-100',
      'bg-Meeting-100',
      'bg-Other-100',
      'text-All-500',
      'text-Interact-500',
      'text-Form-500',
      'text-Vote-500',
      'text-Test-500',
      'text-Node-500',
      'text-Learn-500',
      'text-Create-500',
      'text-Develop-500',
      'text-Whitelist-500',
      'text-IXO-500',
      'text-LuckDraw-500',
      'text-Register-500',
      'text-Airdrop-500',
      'text-Mint-500',
      'text-Claim-500',
      'text-Meeting-500',
      'text-Other-500',
      'text-All-800',
      'text-Interact-800',
      'text-Form-800',
      'text-Vote-800',
      'text-Test-800',
      'text-Node-800',
      'text-Learn-800',
      'text-Create-800',
      'text-Develop-800',
      'text-Whitelist-800',
      'text-IXO-800',
      'text-LuckDraw-800',
      'text-Register-800',
      'text-Airdrop-800',
      'text-Mint-800',
      'text-Claim-800',
      'text-Meeting-800',
      'text-Other-800'
    ]
  },
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      All: colors.trueGray,
      // test
      Interact: colors.red,
      Meeting: colors.orange,
      Vote: colors.amber,
      Claim: colors.yellow,
      // nft
      Whitelist: colors.lime,
      Mint: colors.green,
      Create: colors.emerald,
      LuckDraw: colors.teal,
      // tech
      Learn: colors.cyan,
      Node: colors.sky,
      Test: colors.blue,
      Develop: colors.indigo,
      // invest
      Register: colors.violet,
      Form: colors.purple,
      IXO: colors.fuchsia,
      Other: colors.pink,
      Airdrop: colors.rose // only for $CCS token airdrop event
    },
    screens: {
      sm: '412px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        main: '#F7931A',
        open: '#1a7f37',
        closed: '#cf222e',
        discord: '#586aea'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: []
}
