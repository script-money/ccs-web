/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process/')
const { Buffer } = require('buffer')

if (window) {
  const isLocalhost = window.location.host.indexOf('localhost') >= 0
  if (!isLocalhost) {
    window.Buffer = Buffer
    window.process = process
  }
}
module.exports = { browser: true }
