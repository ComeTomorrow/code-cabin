import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

// 设置持久化
const pinia = createPinia().use(persistedstate)

export default pinia

export * from './stores/user'