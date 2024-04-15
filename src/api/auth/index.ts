import request from "../../modules/https";
import { AxiosPromise } from "axios";
import { LoginData, LoginResult } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  const formData = new FormData();
  formData.append("mobile", data.username);
  formData.append("password", data.password);
//   formData.append("captchaId", data.captchaId as string);
//   formData.append("captchaCode", data.captchaCode as string);
//   formData.append("grant_type", "password");
  return request({
    url: "/api/v1/auth/captcha/"+data.username,
    method: "get",
    // data: formData,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: "Basic bWFsbC1hZG1pbjoxMjM0NTY=", // 客户端信息Base64明文：mall-admin:123456
    // },
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/youlai-system/api/v1/users/logout",
    method: "delete",
  });
}
