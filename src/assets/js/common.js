import { setSessionStorge, getSessionStorage } from './util'

export function changeDate (value) {
  if (!value) return ''
  if (value) {
    let time = new Date(value)
    let year = time.getFullYear()
    let month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1)
    let day = (time.getDate() < 10 ? '0' : '') + time.getDate()
    return year + '-' + month + '-' + day
  }
}
/**
 * 获取到时刻,yy-MM-dd hh:mm:ss
 * */
export function timeToString (timeValue) {
  if (timeValue) {
    let year = new Date(timeValue).getFullYear()
    let mon = new Date(timeValue).getMonth() + 1
    let day = new Date(timeValue).getDate()
    let hour = new Date(timeValue).getHours()
    let minute = new Date(timeValue).getMinutes()
    let sec = new Date(timeValue).getSeconds()
    let newTime = getStartandTime(year) + '-' + getStartandTime(mon) + '-' + getStartandTime(day) + ' ' + getStartandTime(hour) + ':' + getStartandTime(minute) + ':' + getStartandTime(sec)
    return newTime
  } else {
  }
}
/**
 * 获取月份* yy-MM-dd 补上 00:00:00
 * */
export function monthToString (monthValue) {
  let newYear = new Date(monthValue).getFullYear()
  let newMon = new Date(monthValue).getMonth() + 1
  let newMonthTime = getStartandTime(newYear) + '-' + getStartandTime(newMon) + '-' + '01' + ' ' + '00:00:00'
  return newMonthTime
}
/**
 * 获取月份* yy-MM-dd 不补 00:00:00
 * */
export function timeZeroToString (timeValue) {
  if (!timeValue) return ''
  let year = new Date(timeValue).getFullYear()
  let mon = new Date(timeValue).getMonth() + 1
  let day = new Date(timeValue).getDate()
  let newTime = getStartandTime(year) + '-' + getStartandTime(mon) + '-' + getStartandTime(day)
  return newTime
}
export function timeZeroToStringMonth (timeValue) {
  if (!timeValue) return ''
  let year = new Date(timeValue).getFullYear()
  let mon = new Date(timeValue).getMonth() + 1
  let newTime = getStartandTime(year) + '-' + getStartandTime(mon)
  return newTime
}
export function getStartandTime (value) {
  if (value < 10) {
    value = '0' + value
  } else {
    value = '' + value
  }
  return value
}
/**
 * 主表获取月尾时间
 * ***/
export function toMonthEndTime (timeValue) {
  let year = new Date(timeValue).getFullYear()
  let mon = new Date(timeValue).getMonth() + 1
  let day = '30'
  if (((year % 400 === 0) || (year % 100 !== 0)) && (year % 4 === 0)) {
    if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
      day = 31
    } else if (mon === 2) {
      day = 29
    } else {
      day = 30
    }
  } else {
    if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
      day = 31
    } else if (mon === 2) {
      day = 28
    } else {
      day = 30
    }
  }

  let newTime = getStartandTime(year) + '-' + getStartandTime(mon) + '-' + day
  return newTime
}
/***
 *把获取的json转成树形结构 可以没有父亲节点
 ***/
export const transData = (a, idStr, pidStr, childrenStr) => {
  let r = []
  let hash = {}
  let id = idStr
  let pid = pidStr
  let children = childrenStr
  let i = 0
  let j = 0
  let len = a.length
  for (; i < len; i++) {
    a[i].id = (a[i].id).toString()
    hash[a[i][id]] = a[i]
  }
  for (; j < len; j++) {
    let aVal = a[j]
    aVal.id = (aVal.id).toString()
    if (aVal.parentId === aVal.id) {
      let index = r.findIndex(x => x.id === aVal.id)
      if (index === -1) r.push(aVal)
    } else {
      let hashVP = hash[aVal[pid]]
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = [])
        let index = hashVP[children].findIndex(x => x.id === aVal.id)
        if (index === -1) hashVP[children].push(aVal)
      } else {
        let index = r.findIndex(x => x.id === aVal.id)
        if (index === -1) r.push(aVal)
      }
    }
  }
  return r
}
export const returnFloat = (value) => {
  value = Math.round(parseFloat(value) * 100) / 100
  var xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/* 数组对像排序 */
export const compare = (prop) => {
  return function (obj1, obj2) {
    var val1 = obj1[prop]
    var val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
// 前端生成uuid
export const uuid = () => {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

export const setSearchParams = (params, currentRouteName, name) => {
  const typearams = 'searchParams'
  const searchParams = getSessionStorage(typearams)
  if (searchParams) {
    const JSONParams = JSON.parse(searchParams)
    if (name) {
      JSONParams[currentRouteName][name] = params
      setSessionStorge(typearams, JSON.stringify(JSONParams))
    } else {
      JSONParams[currentRouteName] = params
      setSessionStorge(typearams, JSON.stringify(JSONParams))
    }
  } else {
    const sessionParams = {}
    sessionParams[currentRouteName] = params
    setSessionStorge(typearams, JSON.stringify(sessionParams))
  }
}

/* 获取数据 */
export const getSearchParams = (params = {}, currentRouteName) => {
  const typearams = 'searchParams'
  const searchParams = getSessionStorage(typearams)
  if (searchParams) {
    const sessionParams = JSON.parse(searchParams)[currentRouteName]
    if (sessionParams) {
      params = sessionParams
    }
  }
  return params
}
