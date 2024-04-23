import request from '../../modules/https';
import { AxiosPromise } from 'axios';
import { LoginData, LoginResult } from './types';

/**
 * 注册API
 *
 * @param data {LoginData}
 * @returns
 */
export function registerApi(data: LoginData): AxiosPromise<LoginResult> {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('nickName', data.nickName);
  
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: formData,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: 'Basic bWFsbC1hZG1pbjoxMjM0NTY=', // 客户端信息Base64明文：mall-admin:123456
    // },
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
  
  return request({
    url: '/api/auth/login',
    method: 'post',
    data: formData,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: 'Basic bWFsbC1hZG1pbjoxMjM0NTY=', // 客户端信息Base64明文：mall-admin:123456
    // },
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/youlai-system/api/v1/users/logout',
    method: 'delete',
  });
}
