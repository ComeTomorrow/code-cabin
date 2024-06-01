import { defineStore } from 'pinia'
import { registerApi, loginApi, logoutApi } from '../../../api/auth';
// import { getUserInfoApi } from '@/api/system/user';
import { resetRouter } from '../../router';
import { ref } from 'vue'
// import { store } from '@/store';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../../utils/storage'
import { LoginData, RegisterData } from '../../../api/auth/types'
import { UserInfo } from './type';
import { TOKEN_KEY, SPACE_CHARACTER } from '../../constant'

export const useUserStore = defineStore('user', () => {
  // 数据（state）
  const userInfo: UserInfo = ref({
    nickName: '',
    userId: '',
    accessToken: getLocalStorage(TOKEN_KEY),
    roles: [],
    permissions: [],
  });

  // 修改数据的方法（action）
  const inc = () => {

  }

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  const login = (loginData: LoginData) => {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then(({ data } : any) => {
          const accessToken = data;
          setLocalStorage(TOKEN_KEY, SPACE_CHARACTER + accessToken)   // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
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

  /**
   * 
   * @param registerData 
   * @returns 
   */
  const register = (registerData: RegisterData) => {
    return new Promise<void>((resolve, reject) => {
      registerApi(registerData)
        .then(() => {
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // user logout
  const logout = () => {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          removeLocalStorage(TOKEN_KEY)
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // remove token
  const resetToken = () => {
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, '');
      resetRouter();
      resolve();
    });
  }

  // 以对象形式返回
  return {
    // userInfo,
    login,
    // getUserInfo,
    register,
    logout,
    resetToken,
  };
}, {
  persist: true
});