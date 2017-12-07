import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    buildingList: [
      {
        id: 1,
        name: 'B1'
      }, {
        id: 2,
        name: 'B2'
      }, {
        id: 3,
        name: 'B3'
      }, {
        id: 4,
        name: 'B4'
      }, {
        id: 5,
        name: 'B5'
      }, {
        id: 6,
        name: 'B6'
      }, {
        id: 7,
        name: 'B7'
      }, {
        id: 8,
        name: 'B8'
      }, {
        id: 9,
        name: 'B9'
      }, {
        id: 10,
        name: 'B10'
      }, {
        id: 11,
        name: 'B11'
      }, {
        id: 12,
        name: 'B12'
      }
    ],
    userInfo: {
      userName: null,
      token: null
    }
  },
  mutations: {
    updateBuildingList: (state, newList) => {
      state.buildingList = newList
    }
  }
})
