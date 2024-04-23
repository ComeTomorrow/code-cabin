/**
 * 登录请求参数
 */
export interface LoginData {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 授权类型
     */
    grantType?: string;
    /**
     * 验证码Code
     */
    captchaCode?: string;
    /**
     * 验证码唯一标识(UUID)
     */
    captchaId?: string;
}
  
/**
 * 登录响应
 */
export interface LoginResult {
    /**
     * 访问token
     */
    access_token?: string;
    /**
     * 过期时间(单位：毫秒)
     */
    expires?: number;
    /**
     * 刷新token
     */
    refresh_token?: string;
    /**
     * token 类型
     */
    token_type?: string;
}
  