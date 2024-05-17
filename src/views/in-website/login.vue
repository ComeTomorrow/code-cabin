<script setup lang='ts'>
import { ref } from 'vue';
import { FormType } from './types'
import { useUserStore } from '../../modules/pinia/stores/user'
import router from '../../modules/router';
import type { Rule } from 'ant-design-vue/es/form'


// 要操作到的元素
const translateQuantity = ref({ transform: 'translateX(0%)' })
const hiddenStatus = ref(FormType.Login)
const loading = ref(false); // 按钮loading
const userStore = useUserStore()

const loginRef = ref()
const loginForm = ref({
    username: null,
    password: null,
})

const registerRef = ref()
const registerForm = ref({
    username: null,
    password: null,
    againPassword: null
})

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
    loginRef.value.validate()
        .then(() => {
            loading.value = true;
            userStore.login(loginForm.value)
                .then((result: string) => {
                    console.log(result)
                    router.push("/")
                })
        })
        .catch((error: any) => {
            console.log('error', error);
        })
}

const handleRegister = (): void => {
    registerRef.value.validate()
        .then(() => {
            loading.value = true;
            userStore.register(registerForm.value)
                .then(() => {
                    router.push("/login");
                })
        })
        .catch((error: any) => {
            console.log('error', error);
        })
}

const rules: Record<string, Rule[]> = {
    username: [
        { required: true, message: '请输入你的手机号！' },
    ],
    password: [
        { required: true, message: '请设置你的密码！', trigger: 'change' }
    ],
    againPassword: [
        { required: true, message: '请再次确认你的密码！' }
    ]
};
</script>

<template>
    <div class="entire">
        <div class='container'>
            <div class='form-box' :style='translateQuantity'>
                <!-- 登录 -->
                <div class='login-box' v-if='hiddenStatus == FormType.Login'>
                    <a-form :model="loginForm" ref="loginRef" :rules="rules">
                        <h1>login</h1>
                        <a-form-item name="username">
                            <a-input v-model:value='loginForm.username' placeholder='手机号' allow-clear />
                        </a-form-item>

                        <a-form-item name="password">
                            <a-input-password v-model:value='loginForm.password' placeholder='密码' allow-clear />
                        </a-form-item>

                        <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                            <a-checkbox v-model:checked="loginForm.remember">记住我</a-checkbox>
                        </a-form-item> -->
                        <a-form-item>
                            <button @click='handleLogin'>登录</button>
                        </a-form-item>
                    </a-form>
                </div>
                <!-- 注册 -->
                <div class='register-box' v-else>
                    <a-form :model="registerForm" ref="registerRef" :rules="rules">
                        <h1>register</h1>
                        <a-form-item name="username">
                            <a-input v-model:value='registerForm.username' placeholder='手机号' allow-clear />
                        </a-form-item>

                        <a-form-item name="password">
                            <a-input-password v-model:value='registerForm.password' placeholder='密码' allow-clear />
                        </a-form-item>

                        <a-form-item name="againPassword">
                            <a-input-password v-model:value='registerForm.againPassword' placeholder='确认密码' allow-clear />
                        </a-form-item>

                        <a-form-item>
                            <button @click='handleRegister'>注册</button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class='con-box left'>
                <h2>欢迎来到<span>代码小屋</span></h2>
                <p>快来领取你的专属<span>宠物</span>吧</p>
                <img src='../../assets/images/1.png' alt=''>
                <p>已有账号</p>
                <button @click='goLogin'>去登录</button>
            </div>
            <div class='con-box right'>
                <h2>欢迎来到<span>代码小屋</span></h2>
                <p>快来看看你的可爱<span>宠物</span>吧</p>
                <img src='../../assets/images/2.png' alt=''>
                <p>没有账号？</p>
                <button @click='goRegister'>去注册</button>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
body {
    background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}

.entire {
    position: absolute;
    top: 20%;
    left: 30%;

    .container {
        background-color: #fff;
        width: 650px;
        height: 415px;
        border-radius: 5px;
        /* 阴影 */
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
        /* 相对定位 */
        position: relative;

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

            .register-box,
            .login-box {
                /* 弹性布局 垂直排列 */
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;

                h1 {
                    text-align: center;
                    margin-bottom: 25px;
                    /* 大写 */
                    text-transform: uppercase;
                    color: #fff;
                    /* 字间距 */
                    letter-spacing: 5px;
                    font-weight: bold;
                }

                .ant-input-affix-wrapper {
                    background: none;

                    input {
                        background-color: transparent;
                        color: #fff;
                        border: none;

                        &::placeholder {
                            color: #fff;
                        }

                        &:focus {
                            color: #a262ad;
                            outline: none;
                            border-bottom: 1px solid #a262ad80;
                            transition: 0.5s;

                            &::placeholder {
                                opacity: 0;
                            }
                        }
                    }
                }

                button {
                    width: 100%;
                    background-color: #f6f6f6;
                    outline: none;
                    border-radius: 8px;
                    padding: 13px;
                    color: #a262ad;
                    letter-spacing: 2px;
                    border: none;
                    cursor: pointer;

                    &:hover {
                        background-color: #a262ad;
                        color: #f6f6f6;
                        transition: background-color 0.5s ease;
                    }
                }
            }
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

            h2 {
                color: #8e9aaf;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 3px;
                text-align: center;
                margin-bottom: 4px;
            }

            p {
                font-size: 12px;
                letter-spacing: 2px;
                color: #8e9aaf;
                text-align: center;
            }

            span {
                color: #d3b7d8;
            }

            img {
                width: 150px;
                height: 150px;
                opacity: 0.9;
                margin: 40px 0;
            }

            button {
                margin-top: 3%;
                background-color: #fff;
                color: #a262ad;
                border: 1px solid #d3b7d8;
                padding: 6px 10px;
                border-radius: 5px;
                letter-spacing: 1px;
                outline: none;
                cursor: pointer;

                &:hover {
                    background-color: #d3b7d8;
                    color: #fff;
                }
            }
        }

        .con-box.left {
            left: -2%;
        }

        .con-box.right {
            right: -2%;
        }
    }
}
</style>