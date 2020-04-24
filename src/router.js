import Vue from 'vue'
import Router from 'vue-router'
import Namespaces from './views/Namespaces.vue'
import NotFound from './views/NotFound.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active', //為當前選定的 router-link 增加 class，class 名稱自行定義
  routes: [
    {
      path: '/',
      name: 'root',
      component: Namespaces //component為單數，為 vue-router 的用法
    },
    {
      path: '/signin',
      name: 'sing-in',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/namespace/:namespaceId',
      name: 'namespace',
      component: () => import('./views/Namespace.vue'),
      children: [
        {
          path: '',
          name: 'namespaceHome',
          component: () => import('./components/NamespaceHome.vue')
        },
        {
          path: 'chatroom/:roomuuid',
          name: 'chatroom',
          component: () => import('./components/ChattingArea.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound //component為單數
    },

  ]
})

router.beforeEach(async (to, from, next) => {
  // try {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  console.log('isAuthenticated:', isAuthenticated)
  console.log('to.name:', to.name)
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐聽首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/')
    return
  }

  next()
  // } catch (err) {
  //   console.log(err)
  // }
})

export default router