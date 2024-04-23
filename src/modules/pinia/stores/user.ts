import { defineStore } from 'pinia'
import { registerApi, loginApi, logoutApi } from '../../../api/auth';
// import { getUserInfoApi } from '@/api/system/user';
import { resetRouter } from '../../router';
// import { store } from '@/store';
import { getLocalStorage, setLocalStorage } from '../../../utils/storage'
import { LoginData } from '../../../api/auth/types'
// import { UserInfo } from '@/api/system/user/types';
import { TOKEN_KEY, SPACE_CHARACTER } from '../../constant'

export const useUserStore = defineStore('user', () => {
  // const user: UserInfo = {
  //   roles: [],
  //   perms: [],
  // };

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then(({ data } : any) => {
          const { token_type, access_token } = data;
          setLocalStorage(TOKEN_KEY, SPACE_CHARACTER + access_token)   // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  // function getUserInfo() {
  //   return new Promise<UserInfo>((resolve, reject) => {
  //     getUserInfoApi()
  //       .then(({ data }) => {
  //         if (!data) {
  //           reject('Verification failed, please Login again.');
  //           return;
  //         }
  //         if (!data.roles || data.roles.length <= 0) {
  //           reject('getUserInfo: roles must be a non-null array!');
  //           return;
  //         }
  //         Object.assign(user, { ...data });
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  // user register
  function register(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      registerApi(loginData)
        .then(() => {
          setLocalStorage(TOKEN_KEY, '')
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          setLocalStorage(TOKEN_KEY, '')
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, '');
      resetRouter();
      resolve();
    });
  }

  return {
    // user,
    login,
    // getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
// export function useUserStoreHook() {
//   return useUserStore(store);
// }
