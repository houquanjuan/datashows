import * as types from './mutation-types'
import Urls from '../publicService/urls.js'
import httpService from '../publicService/HttpService.js'

export default {
  // cpu 数组
  [types.GET_CPU_LIST] (state, data) {
    console.log('cpu list1...')
    state.cpuList = data
  },
  // 内存数组
  [types.GET_MEMORY_LIST] (state, data) {
    state.memoryList = data
  },
  // 主机网卡出入流数组
  [types.GET_INFLOW_LIST] (state, data) {
    state.inflowList = data
  },
  // 当前告警内容数组
  [types.GET_CURRENT_WARNING] (state, data) {
    state.warningList = data
  },
  getCpuList (state, data) {
    state.cpuList = data
  },
  getMemList (state, data) {
    state.memoryList = data
  },
  getWarnList (state, data) {
    state.warningList = data
  },
  getInflowList (state, data) {
    state.inflowList = data
  },
  getMasterList (state, data) {
    state.masterList = data
  },
  savePopShow (state, data) {
    state.popShow = data
  },
  savePopObj (state, data) {
    state.popObj = data
  }
  /* getCpuList (state, data){
    httpService.getLink(Urls.getCpuRateUrl)
      .then(res => {
        console.log('cpulist:' + JSON.stringify(res.cpuList))
        state.cpuList = res.cpuList
      })
      .catch(function (error) {
        console.log(error)
      })
  }
   let len = data.length
    let arr = []
    for (var i = 0; i < len; i++) {
      var item = {}
      item.selected = false
      item.name = data[i]
      arr.push(item)
    }
    console.log('master list:'+JSON.stringify(arr))
    state.masterList = arr */
}
