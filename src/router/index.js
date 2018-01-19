import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import login from '@/views/login'
import mscopi from '@/views/mscopi'
import sos from '@/views/sos'
import com from '@/views/com'
import management from '@/views/management'
import notfound from '@/views/notfound'

import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requireAuth: true },
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
      meta: { requireAuth: true },
      component: mscopi
    },
    {
      path: '/sos',
      name: 'sos',
      meta: { requireAuth: true },
      component: sos
    },
    {
      path: '/com',
      name: 'com',
      meta: { requireAuth: true },
      component: com
    },
    {
      path: '/management',
      name: 'management',
      meta: { requireAuth: true },
      component: management
    },
    {
      path: '*',
      component: notfound
    }
  ]
})

// add hooks
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {    // 判断该路由是否需要登录权限
    if (store.state.isLogin) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
