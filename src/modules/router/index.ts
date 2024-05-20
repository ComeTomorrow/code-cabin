import { createRouter, createWebHistory} from "vue-router";
// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes =[
    {
        name: '首页',
        path:'/',
        component: ()=> import('../../views/Home.vue'),
    },
    {
        name: '登录',
        path:'/login',
        component: ()=> import('../../views/in-website/Login.vue'),
    },
    {
        name: '详情',
        path:'/blog/article/details',
        component: ()=> import('../../views/blog/content/ArticleDetails.vue'),
    },
    {
        name: '编辑',
        path:'/creative/md',
        component: ()=> import('../../views/creative/EditArticle.vue'),
    },
    {
        name: '创作中心',
        path:'/creative',
        component: ()=> import('../../views/creative/CreativeCenter.vue'),
        children: [
            { path: '/creative', component: ()=> import('../../views/creative/CreativeHome.vue') },
            { path: '/creative/content_manage', component: ()=> import('../../views/creative/content/ContentManage.vue') },
        ],
    },
    {
        name: '测试页',
        path:'/test',
        component: ()=> import('../../views/test.vue'),
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router =  createRouter({
     // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

/**
 * 重置路由
 */
export const resetRouter = ()=> {
    router.replace({ path: "/login" });
}

export default router