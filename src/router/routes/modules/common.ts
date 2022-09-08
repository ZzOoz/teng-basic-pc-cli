import type { RouteRecordRaw } from 'vue-router'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/homePage.vue')
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component: () => import('@/views/loginPage.vue')
  }
]

export default routes
