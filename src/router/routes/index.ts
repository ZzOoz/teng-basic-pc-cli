import type { RouteRecordRaw } from 'vue-router'
// import commonRoutes from './modules/common'

// 获取modules中的路由规则
// https://cn.vitejs.dev/guide/features.html#glob-import
// const modules = import.meta.glob('./modules/**/*.ts')
const pages = import.meta.glob('../../views/*.vue')

// modules routes

// Object.keys(modules).forEach(async (key) => {
//   const modulesRoutes = await modules[key]()
//   console.log(modulesRoutes, 'routes')

//   let modRoutesList = []
//   if (Array.isArray(modulesRoutes)) {
//     modRoutesList = [...modulesRoutes]
//   } else {
//     modRoutesList = (modulesRoutes as any).default
//   }

//   routes.push(...modRoutesList)
//   console.log(routes, 'routes')
// })

const routes: RouteRecordRaw[] = Object.keys(pages).map((path: string) => {
  const name = (path.match(/\.\.\/views\/(.*)\.vue$/) as any)[1]
  const routePath = `/${name}`
  if (routePath === '/home') {
    return {
      path: '/',
      name,
      component: pages[path]
    }
  }
  return {
    path: routePath,
    name,
    component: pages[path]
  }
})

// 根目录
const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/homePage'
}

// 404页面
const notFoundPage: RouteRecordRaw = {
  // vue-router@4的变化，舍弃*通配符
  // 官方文档：https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/notFound.vue')
}

export default [rootRoute, ...routes, notFoundPage]
