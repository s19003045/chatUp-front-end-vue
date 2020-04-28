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
    token: '',
    currentRoom: {
      roomuuid: ''
    }
  },

  /** 
   * mutations can change the state in store
   *
   * limited to synchronous function
   */
  mutations: {
    /**
     * Commit to set current user info in state
     * 
     * When to use: login successifully
     * 
     * @param {Object} state The state of store
     * @param {Object} currentUser User's data got from API 
     */
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      // Set isAuthenticated in state
      state.isAuthenticated = true
      // Set token in state
      state.token = localStorage.getItem('token')
    },

    /**
     * Commit to clear current user info in state
     *
     * When to use：authentication failed or logout
     *
     * @param {Object} state The state of store
     */
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },

    /**
     * Commit to set current chatroom info in state
     *
     * When to use：Into the chatroom
     *
     * @param {Object} state The state of store
     * @param {Object} currentRoom Current room data got from API 
     */
    setCurrentRoom(state, currentRoom) {
      state.currentRoom = {
        ...state.currentRoom,
        ...currentRoom
      }
    }
  },

  /**
   * actions can commit mutations in store
   *
   * both for synchronous function and asynchronous function
   */
  actions: {
    /**
       * Connect to API for user data and then commit to set state
       *
       * When to use：Link to pages when user info is needed
       *
       * @param {Function} commit Function to commit mutation
       */
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // commit a mutation
        commit('setCurrentUser', {
          id: data.currentUser.id,
          name: data.currentUser.name,
          email: data.currentUser.email,
          uuid: data.currentUser.uuid
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    },
  },
  modules: {
  }
})