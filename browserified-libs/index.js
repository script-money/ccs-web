/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process/')
const { Buffer } = require('buffer')
const EventEmitter = require('events')
const queueMicrotask = require('queue-microtask')
const url = require('url')

if (window) {
  const isLocalhost = window.location.host.indexOf('localhost') >= 0
  if (!isLocalhost) {
    window.Buffer = Buffer
    window.process = process
    window.EventEmitter = EventEmitter
    window.queueMicrotask = queueMicrotask
    window.url = url
  }
}
module.exports = { browser: true }
