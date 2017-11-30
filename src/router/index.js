import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import login from '@/views/login'
import mscopi from '@/views/mscopi'
import sos from '@/views/sos'
import management from '@/views/management'
import notfound from '@/views/notfound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/mscopi',
      name: 'mscopi',
      component: mscopi
    },
    {
      path: '/sos',
      name: 'sos',
      component: sos
    },
    {
      path: '/management',
      name: 'management',
      component: management
    },
    {
      path: '*',
      component: notfound
    }
  ]
})
