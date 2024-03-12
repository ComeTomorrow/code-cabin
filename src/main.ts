import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './modules/router'
import pinia from './modules/pinia'

createApp(App).use(router).use(pinia).mount('#app')
