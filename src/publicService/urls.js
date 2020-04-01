let config = require('@/../config')
//let baseUrl = config.serverUrl
 let baseUrl = window.g.ApiUrl
let httpUrl = 'http://' + baseUrl
console.log('websocketUrl:' + baseUrl)
// let httpUrl = ''
export default {
  getCpuRateUrl: httpUrl + 'rate/getCPURates',
  getMemRateUrl: httpUrl + 'rate/getMemRates',
  getInflowUrl: httpUrl + 'netFlow/getNetFlowInfos',
  getWarnUrl: httpUrl + 'notify/getNotifies',
  getMasterUrl: httpUrl + 'netFlow/hostList',
  // websocketUrl: 'ws://192.168.34.147:8080/rate/getRates'
  websocketUrl: 'ws://' + baseUrl + 'rate/getRates'
}

