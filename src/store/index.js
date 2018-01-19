import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    userInfo: {
      userName: 'admin',
      token: null
    },
    buildingList: [],
    sosHeaders: {
      temperature: ['t1', 't2', 't3', 't4'],
      flow: ['f1', 'f2', 'f3', 'f4'],
      pressure: ['p1', 'p2', 'p3', 'p4'],
      current: ['c1', 'c2', 'c3', 'c4']
    },
    isLogin: true,
    level: 1  // 'Super Admin': 1, 'Admin': 2, 'User': 3
  },
  mutations: {
    updateBuildingList: (state, newList) => {
      state.buildingList = newList
    },
    updateUserInfo: (state, newUserInfo) => {
      state.userInfo = newUserInfo
    },
    updateIsLogin: (state, newIsLogin) => {
      state.isLogin = newIsLogin
    },
    updateLevel: (state, newLevel) => {
      state.level = newLevel
    },
    logout: (state) => {
      state.buildingList = []
      state.userInfo = {
        userName: null,
        token: null
      }
      state.isLogin = false
      state.level = 0
    }
  }
})
