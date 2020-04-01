'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URL: '"192.168.34.147:8080/"',
  REPORT_URL: '"http://192.168.34.147:8080/xhcjjshow"',
})

