PC 端项目基础框架搭建

插件使用

基础：**Vue 3.2.37 + Vue-router 4.1.5 + pinia 2.0.22 + axios 0.27.2**

代码规范：**eslint 8.23.0 + "prettier": "^2.7.1" + "stylelint": "^14.11.0"**

#### 动态导入路由

```js
import type { RouteRecordRaw } from 'vue-router'

// 获取modules中的路由规则
const pages = import.meta.glob('../../views/*.vue')

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
```

**如：@router/routes/module/common.ts 文件下**

```js
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
```

**然后在@router/index.ts 文件下**

```js
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import type { App } from 'vue'

import routes from './routes/index'

const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHistory(),
  routes
})

/**
 * 路由初始化函数
 * @param app
 */
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
```

#### 额外的 ts 文件类型补充

**在@types 文件下进行类型修饰**

```js
/// axios.d.ts(补充说明axios文件)
export interface CustomResponseType<T> {
  code: number
  message: string
  data: T
}

/// env.d.ts(补充env类型文件使用import.meta.env.xxxx)
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly DEMO_URL: string
}

/// store.d.ts(补充说明pinia文件)
export interface UserInfo {
  userName: string
  userId: string | number
}
```

#### 使用 eslint、prettierrc、stylelint、husky、commitlint 来限制代码规范（重要）

具体参考：https://juejin.cn/post/7118294114734440455和https://juejin.cn/post/7120947327879086093#heading-4

#### 引入 Element-plus(按需导入)

```js
pnpm i element-plus @element-plus/icons-vue
pnpm install -D unplugin-vue-components unplugin-auto-import
```

Vite.config.ts 文件

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```
