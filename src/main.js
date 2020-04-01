// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import store from './store'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import './css/index.css'
import TipBoxService from './publicService/TipBoxService.js'
import echarts from 'echarts'
import 'font-awesome/css/font-awesome.min.css'

/*import $ from './js/jquery-3.3.1.min'*/
import $ from 'jquery'
import './js/easyui/jquery.easyui.min'
import './js/easyui/themes/metro/easyui.css'
import './js/easyui/themes/icon.css'
// import VueFlatpickr from 'vue-flatpickr'
// import 'vue-flatpickr/theme/dark.css'

require('es6-promise').polyfill()

Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(VueFlatpickr)
Vue.config.productionTip = false
// Vue.prototype.api = process.env.NODE_ENV === 'production' ? '' : '/api'
Vue.prototype.tips = TipBoxService
Vue.prototype.$echarts = echarts // 将echarts注册成Vue的全局属性

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
