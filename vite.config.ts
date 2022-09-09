import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /// 使用sfc插件的方式
    vue(),
    /// 按需引入Vue3的element-plus
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    /// 按需引入Vue3的element-plus
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  /// 全局引入css
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/scss/global.scss";' // 添加公共样式
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      api: path.resolve(__dirname, './src/api')
    }
  }
})
