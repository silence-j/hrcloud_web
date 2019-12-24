import axios from './axios'
import { Message } from 'element-ui'
import { hostBaseUrl } from './config'
import router from '../router'
import store from '../store'
// axios.defaults.baseURL = hostBaseUrl
export const request = (type, url, preload) => {
  let params = preload || {}
  let uri
  if (url.includes('/identify/getidentifyimg') || url.includes('/identify/check')) {
    if (hostBaseUrl.includes('hr.zhongcaicloud.com')) {
      // 图片验证码正式环境接口地址
    } else if (hostBaseUrl.includes('test.hr.zcabc.com')) {
      // 图片验证码测试环境接口地址
      uri = 'http://172.16.9.160:9400' + url
    } else {
      // 图片验证码开发环境接口地址
      uri = 'http://172.16.9.160:9400' + url
    }
  } else {
    uri = hostBaseUrl + url
  }
  return new Promise((resolve, reject) => {
    if (type === 'get') {
      axios.get(uri, { params: params }).then(res => {
        _handleResult(res, res => resolve(res.data))
      })
    }
    if (type === 'post') {
      axios.post(uri, params).then(res => {
        _handleResult(res, res => resolve(res.data))
      })
    }
    if (type === 'callBack') {
      axios.post(uri, params).then(res => {
        resolve(res.data)
      })
    }
  })
}

export const _handleResult = (data, callback, errorMessage = '接口出错了') => {
  const result = data.data
  const { subCode, subMsg } = result.data
  if (subCode === 10000) {
    store.commit('BTN_LOADING', false)
    callback(result)
  } else if (subCode === 12100) {
    store.dispatch('userLoginOut')
    // Message.error(subMsg)
    setTimeout(() => {
      router.replace('/login')
    }, 200)
  } else {
    store.commit('BTN_LOADING', false)
    const errMsg = subMsg || errorMessage
    Message.error(errMsg)
    // callback(data)
  }
}
export const post = (url, preload) => request('post', url, preload)
export const get = (url, preload) => request('get', url, preload)
export const callBack = (url, preload) => request('callBack', url, preload)
