import Vue from 'vue'
import Router from 'vue-router'
import Select from '@/components/selections'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/selections',
    component: Select
  }]
})
