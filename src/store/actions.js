import * as types from './mutation-types'
import Urls from '../publicService/urls.js'
import httpService from '../publicService/HttpService.js'

export default {
/*  getCpuList ({commit}, data) {
    commit(types.GET_CPU_LIST, data)
    /!* httpService.getLink(Urls.getCpuRateUrl)
      .then(res => {
        console.log('cpulist:' + JSON.stringify(res.cpuList))
        commit(types.GET_CPU_LIST, res.cpuList)
        return res
      })
      .catch(function (error) {
        console.log(error)
      }) *!/
  },*/
 /* getMemList ({commit}, data) {
    commit(types.GET_MEMORY_LIST, data)
  },*/
  /* getCpuList ({commit}) {
    return new Promise((resolve, reject) => {
      httpService.getLink(Urls.getCpuRateUrl).then(res => {
        console.log('res:'+res)
        commit(types.GET_CPU_LIST, res.cpuList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, */
  getMemoryList ({commit}, data) {
    httpService.getLink(Urls.getDataUrl)
      .then(function (res) {
        commit(types.GET_MEMORY_LIST, res)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getInflowList ({commit}, data) {
    httpService.getLink(Urls.getDataUrl)
      .then(function (res) {
        commit(types.GET_INFLOW_LIST, res)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getwarningList ({commit}, data) {
    httpService.getLink(Urls.getDataUrl)
      .then(function (res) {
        commit(types.GET_CURRENT_WARNING, res)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
