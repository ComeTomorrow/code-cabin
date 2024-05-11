import https from '../../modules/https';
import { AxiosPromise } from 'axios';
import { LoginData, RegisterData, LoginResult } from './types';

https.defaults.baseURL=import.meta.env.VITE_AUTH_APP_API_URL + import.meta.env.VITE_AUTH_APP_PORT;

/**
 * 注册API
 *
 * @param data {RegisterData}
 * @returns
 */
export function registerApi(data: RegisterData): AxiosPromise<LoginResult> {
    return https({
        url: '/api/auth/register',
        method: 'put',
        data: data,
    });
}

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    return https({
        url: '/api/auth/login',
        method: 'post',
        data: formData
    });
}

/**
 * 注销API
 */
export function logoutApi() {
    return https({
        url: '/youlai-system/api/v1/users/logout',
        method: 'delete',
    });
}
