import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  cpuList: {},
  memoryList: {},
  inflowList: {},
  warningList: [],
  masterList: {},
  popShow: false,
  popObj: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
