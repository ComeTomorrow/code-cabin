<script setup lang="ts">
import { ref } from 'vue';
import { FormType } from './types';
import { useUserStore } from '../../modules/pinia/stores/user';
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import router from "../../modules/router"
import { LoginData } from '../../api/auth/types';


// 要操作到的元素
const translateQuantity = ref({ transform: 'translateX(0%)' })
const hiddenStatus = ref(FormType.Login)
const loading = ref(false); // 按钮loading
const userStore = useUserStore();
const loginData = ref<LoginData>({
    mobile: "admin",
    password: "123456",
});
const route = useRoute();

// 去注册按钮点击事件
const goRegister = (): void => {
    translateQuantity.value = { transform: 'translateX(80%)' }
    hiddenStatus.value = FormType.Register
}

// 去登录按钮点击事件
const goLogin = (): void => {
    translateQuantity.value = { transform: 'translateX(0%)' }
    hiddenStatus.value = FormType.Login
}

const handleLogin = (): void => {
    console.log('ok')

    loading.value = true;
    userStore.login(loginData.value)
        .then(() => {
            const query = route.query;
            const redirect = (query.redirect as LocationQueryValue) ?? "/";
            const otherQueryParams = Object.keys(query).reduce(
                (acc: any, cur: string) => {
                    if (cur !== "redirect") {
                        acc[cur] = query[cur];
                    }
                    return acc;
                },
                {}
            );
            console.log('ok')
            router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
            // getCaptcha();
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <div class="container">
        <div class="form-box" :style="translateQuantity">
            <!-- 登录 -->
            <div class="login-box" v-if="hiddenStatus == FormType.Login">
                <h1>login</h1>
                <input type="text" placeholder="用户名">
                <input type="password" placeholder="密码">
                <button @click="handleLogin">登录</button>
            </div>
            <!-- 注册 -->
            <div class="register-box" v-else>
                <h1>register</h1>
                <input type="text" placeholder="用户名">
                <input type="email" placeholder="邮箱">
                <input type="password" placeholder="密码">
                <input type="password" placeholder="确认密码">
                <button @click="handleLogin">注册</button>
            </div>
        </div>
        <div class="con-box left">
            <h2>欢迎来到<span>宠物之家</span></h2>
            <p>快来领取你的专属<span>宠物</span>吧</p>
            <img src="../../assets/images/1.png" alt="">
            <p>已有账号</p>
            <button @click="goLogin">去登录</button>
        </div>
        <div class="con-box right">
            <h2>欢迎来到<span>宠物之家</span></h2>
            <p>快来看看你的可爱<span>宠物</span>吧</p>
            <img src="../../assets/images/2.png" alt="">
            <p>没有账号？</p>
            <button @click="goRegister">去注册</button>
        </div>
    </div>
</template>

<style scoped lang="less">
* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}

body {
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}

.container {
    background-color: #fff;
    width: 650px;
    height: 415px;
    border-radius: 5px;
    /* 阴影 */
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    /* 相对定位 */
    position: relative;
}

.form-box {
    /* 绝对定位 */
    position: absolute;
    top: -10%;
    left: 5%;
    background-color: #d3b7d8;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* 动画过渡 加速后减速 */
    transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.hidden {
    display: none;
    transition: 0.5s;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    /* 大写 */
    text-transform: uppercase;
    color: #fff;
    /* 字间距 */
    letter-spacing: 5px;
}

input {
    background-color: transparent;
    width: 70%;
    color: #fff;
    border: none;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
}

input::placeholder {
    color: #fff;
}

input:focus {
    color: #a262ad;
    outline: none;
    border-bottom: 1px solid #a262ad80;
    transition: 0.5s;
}

input:focus::placeholder {
    opacity: 0;
}

.form-box button {
    width: 70%;
    margin-top: 35px;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 8px;
    padding: 13px;
    color: #a262ad;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}

.form-box button:hover {
    background-color: #a262ad;
    color: #f6f6f6;
    transition: background-color 0.5s ease;
}

.con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.con-box.left {
    left: -2%;
}

.con-box.right {
    right: -2%;
}

.con-box h2 {
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-size: 12px;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}

.con-box span {
    color: #d3b7d8;
}

.con-box img {
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}

.con-box button {
    margin-top: 3%;
    background-color: #fff;
    color: #a262ad;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
}

.con-box button:hover {
    background-color: #d3b7d8;
    color: #fff;
}
</style>