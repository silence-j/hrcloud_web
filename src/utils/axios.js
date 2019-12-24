/***
 * 添加axios拦截器
 * **/
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { LOADING } from '../store/mutation-types'
let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
// const removePending = (ever) => { // 并发请求同一个接口，可以有效阻止重复点击
//   for (const p in pending) {
//     if (pending[p].u === ever.url + '&' + ever.method) { // 当当前请求在数组中存在时执行函数体
//       pending[p].f() // 执行取消操作
//       pending.splice(p, 1) // 把这条记录从数组中移除
//     }
//   }
// }
const removeAllPending = (pendings) => { // 判断登录失效 只执行一次
  pendings.forEach((item, index) => {
    if (index > 0) { // 第一个接口执行，后面的接口全部取消
      item.f()
    }
  })
}
axios.defaults.timeout = 60000
let comeRoute = ''
axios.interceptors.request.use(config => {
  comeRoute = config.url
  store.commit(LOADING, true)
  if (comeRoute.includes('/identify/getidentifyimg') || comeRoute.includes('/identify/check')) {
    // 验证码接口请求降级
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.withCredentials = false
  }
  // removePending(config)
  config.cancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + '&' + config.method, f: c })
  })
  return config
}, error => {
  store.commit(LOADING, false)
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  store.commit(LOADING, false)
  const { code, msg } = response.data.meta
  // removePending(response.config)
  if (code === 401 || code === 303) {
    removeAllPending(pending)
  }
  const returnData = {
    data: {
      data: {
        subCode: code === 401 || code === 303 ? 12100 : null,
        subMsg: msg || '登录失效，请重新登录'
      }
    }
  }
  return code === 200 ? response : returnData
}, error => {
  if (error && error.response) {
    switch (error.response.code) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = '连接到服务器失败'
  }
  store.commit(LOADING, false)
  return Promise.reject(error.message)
})
// 设置为true时不能使用headers: { 'Access-Control-Allow-Origin': '*' }
axios.defaults.withCredentials = true

export default axios
