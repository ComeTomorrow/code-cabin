import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './modules/router'
import pinia from './modules/pinia'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import mdEditor from './modules/md-editor'

createApp(App).use(router).use(pinia).use(antd).use(mdEditor).mount('#app')
