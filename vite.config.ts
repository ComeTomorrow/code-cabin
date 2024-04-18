import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:9000/',  //你要跨域访问的网址
        changeOrigin:true,  //允许跨域
        rewrite: (path) => path.replace(/^\/api/, '')  //重写路径把路径变成空字符
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  }
})
