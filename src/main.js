// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

// http
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router'          // router
import store from './store/index.js'   // enable vuex

Vue.config.productionTip = false

Vue.use(ElementUI)

// http req
Vue.use(VueAxios, axios)

// axios settings
Vue.axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5a21751067862f4d0c0d582e/example'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
