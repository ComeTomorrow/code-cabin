import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './modules/router'
import pinia from './modules/pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
