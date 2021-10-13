import { config } from '@onflow/fcl'

config({
  env: 'local',
  'accessNode.api': import.meta.env.VITE_FLOW_HTTP_URL,
  'discovery.wallet': import.meta.env.VITE_WALLET_DISCOVERY,
  '0xFungibleToken': import.meta.env.VITE_FLOW_FUNGIBLETOKEN,
  '0xNonFungibleToken': import.meta.env.VITE_FLOW_NONFUNGIBLETOKEN,
  '0xCCSToken': import.meta.env.VITE_PROJECT_CCSTOKEN,
  '0xBallotContract': import.meta.env.VITE_PROJECT_BALLOTCONTRACT,
  '0xActivityContract': import.meta.env.VITE_PROJECT_ACTIVITYCONTRACT,
  '0xMemorials': import.meta.env.VITE_PROJECT_MEMORIALS
})

console.log(await config().all())
