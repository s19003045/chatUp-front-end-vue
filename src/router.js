import Vue from 'vue'
import Router from 'vue-router'
import Namespaces from './views/Namespaces.vue'
import NotFound from './views/NotFound.vue'

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
      path: '*',
      name: 'not-found',
      component: NotFound //component為單數
    },

  ]
})

export default router