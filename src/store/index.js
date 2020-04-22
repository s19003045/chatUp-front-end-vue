import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      uuid: ''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: { // 僅限 synchronous function
    // 使用時機：登入時
    // 第一個參數為 state, 第二個參數為 payload
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將 token 放進 state
      state.token = localStorage.getItem('token')
    },
    // 使用時機：登入時驗證不通過時或登出時
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: { // 可建立 asynchronous function
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()
        console.log('data:', data)
        console.log('statusText:', statusText)
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // commit a mutation
        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          uuid: data.uuid
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})