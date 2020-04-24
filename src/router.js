import Vue from 'vue'
import Router from 'vue-router'
import Namespaces from './views/Namespaces.vue'
import NotFound from './views/NotFound.vue'
import store from './store'
import { Toast } from './utils/helpers'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active', //為當前選定的 router-link 增加 class，class 名稱自行定義
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/namespaces',
      name: 'namespaces',
      component: Namespaces
    },
    {
      path: '/signin',
      name: 'sign-in',
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
  try {
    // 從 localStorage 取出 token
    const token = localStorage.getItem('token')
    const tokenInStore = store.state.token
    let isAuthenticated = store.state.isAuthenticated

    // 比較 localStorage 和 store 中的 token 是否一樣
    if (token && token !== tokenInStore) {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    // 不需要驗證使用者的頁面
    const pathsWithoutAuthentication = ['sign-in', 'sign-up']

    // 未經過驗證 & 造訪非 signin 或 signup 的頁面時，則 redirect to signin
    if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
      Toast.fire({
        icon: 'warning',
        title: '請先登入'
      })
      next({ name: 'sign-in' })
      return
    }

    // 經過驗證 & 造訪 signin 或 signup 頁面時，則 redirect to 首頁
    if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
      Toast.fire({
        icon: 'info',
        title: '你已登入'
      })
      next({ name: 'namespaces' })
      return
    }
    next()
  } catch (err) {
    console.log(err)
    next({ name: 'root' })
  }
})

export default router