import storage from 'good-storage'
import crypto from 'crypto'
/**
 * *加密
 * **/
export const md5Encrypt = (encryptString) => {
  // eslint-disable-next-line
  var buf = new Buffer(encryptString)
  var str = buf.toString('binary')
  var hasher = crypto.createHash('md5')
  hasher.update(str, 'utf-8')
  encryptString = hasher.digest('base64')
  return encryptString
}
/* 保存数据
**/
export const setToken = (name, data) => {
  storage.set(name, data)
}
export const unsetToken = (name) => {
  storage.remove(name)
}
/**
* 获取数据
**/
export const getToken = (name) => {
  return storage.get(name, '')
}

// 存储session
export const setSessionStorge = (name, data) => {
  storage.session.set(name, data)
}
// 获取session
export const getSessionStorage = name => storage.session.get(name)
//  input 输入节流
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function cutstr (str, len) {
  var strLength = 0
  var strLen = 0
  var strCut = ''
  strLen = str.length
  if (len > strLen) {
    return str
  } else {
    for (var i = 0; i < strLen; i++) {
      let a = str.charAt(i)
      strLength++
      if (escape(a).length > 4) {
        strLength++
      }
      strCut = strCut.concat(a)
      if (strLength >= len) {
        strCut = strCut.concat('...')
        return strCut
      }
    }
    if (strLength < len) {
      return str
    }
  }
}
/**
 * 获取浏览器类型版本是否低于ie8s
 * **/
export const browserType = (from) => {
  var explorer = from.toLowerCase()
  // ie
  var isIe8 = false
  if (explorer.indexOf('msie') >= 0) {
    var ver = explorer.match(/msie ([\d.]+)/)[1]
    if (ver <= '8.0') {
      isIe8 = true
    }
  }
  return isIe8
}
