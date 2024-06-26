import axios, { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import { Notification, MessageBox, Message, Loading } from 'element-ui'
// import store from '@/modules/stores'
import { getLocalStorage } from '../../utils/storage'
import { TOKEN_KEY, HEADER_TOKEN } from '../constant'
import { message } from 'ant-design-vue';


// import errorCode from '@/utils/errorCode'
// import { tansParams, blobValidate } from "@/utils/ruoyi";
// import cache from '@/plugins/cache'
// import { saveAs } from 'file-saver'

// let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '',
  // 超时
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getLocalStorage(TOKEN_KEY) && !isToken) {
      config.headers[HEADER_TOKEN] = getLocalStorage(TOKEN_KEY) // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // // get请求映射params参数
    // if (config.method === 'get' && config.params) {
    //   let url = config.url + '?' + tansParams(config.params);
    //   url = url.slice(0, -1);
    //   config.params = {};
    //   config.url = url;
    // }
    // if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    //   const requestObj = {
    //     url: config.url,
    //     data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
    //     time: new Date().getTime()
    //   }
    //   const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
    //   const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
    //   if (requestSize >= limitSize) {
    //     console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
    //     return config;
    //   }
    //   const sessionObj = cache.session.getJSON('sessionObj')
    //   if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
    //     cache.session.setJSON('sessionObj', requestObj)
    //   } else {
    //     const s_url = sessionObj.url;                  // 请求地址
    //     const s_data = sessionObj.data;                // 请求数据
    //     const s_time = sessionObj.time;                // 请求时间
    //     const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
    //     if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
    //       const message = '数据正在处理，请勿重复提交';
    //       console.warn(`[${s_url}]: ` + message)
    //       return Promise.reject(new Error(message))
    //     } else {
    //       cache.session.setJSON('sessionObj', requestObj)
    //     }
    //   }
    // }
    return config
  }, 
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const { code, msg } = response.data;
    if (code === '00000') {
      return response.data
    }
    // 二进制数据则直接返回
    if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
      return response.data
    }
    if (response.request.responseType ===  'blob' || response.request.responseType ===  'arraybuffer') {
      return response.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        message.error('登录状态已过期，您可以继续留在该页面，或者重新登录')
        isRelogin.show = false;
        // store.dispatch('LogOut').then(() => {
        //     location.href = '/index';
        //     })
        // }).catch(() => {
        //   isRelogin.show = false;
        // });
      }
    }
    //   return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    // } else if (code === 500) {
    //   Message({ message: msg, type: 'error' })
    //   return Promise.reject(new Error(msg))
    // } else if (code === 601) {
    //   Message({ message: msg, type: 'warning' })
    //   return Promise.reject('error')
    // } else if (code !== 200) {
    //   Notification.error({ title: msg })
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    if (error.response.data) {
      let { code, msg } = error.response.data;
      if (code == "Network Error") {
        msg = "后端接口连接异常";
      } else if (msg.includes("timeout")) {
        msg = "系统接口请求超时";
      } else if (msg.includes("Request failed with status code")) {
        msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
      }
      message.info(msg);
    }
    return Promise.reject(error)
  }
)

// 通用下载方法
// export function download(url, params, filename, config) {
//   downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
//   return service.post(url, params, {
//     transformRequest: [(params) => { return tansParams(params) }],
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     responseType: 'blob',
//     ...config
//   }).then(async (data) => {
//     const isBlob = blobValidate(data);
//     if (isBlob) {
//       const blob = new Blob([data])
//       saveAs(blob, filename)
//     } else {
//       const resText = await data.text();
//       const rspObj = JSON.parse(resText);
//       const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
//       Message.error(errMsg);
//     }
//     downloadLoadingInstance.close();
//   }).catch((r) => {
//     console.error(r)
//     Message.error('下载文件出现错误，请联系管理员！')
//     downloadLoadingInstance.close();
//   })
// }

export default service
