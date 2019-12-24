import { setToken, unsetToken } from 'assets/js/util'
import { get, post } from 'utils/http'
import store from 'store'
// import { transData } from 'assets/js/common'
/***
 * 登录
 * ***/
export const getUserLogin = preload => post('/system/login', preload)

/***
 * 存储用户信息
 * ***/
export const getUserInfo = data => {
  // setToken('meauLists', JSON.stringify(transData(data.result.menulist, 'id', 'parentId', 'children')))
  setToken('meauList', JSON.stringify(data.result.menulist))
  setToken('loginId', data.result.userId)
  setToken('loginName', data.result.userName)
  setToken('loginDeptId', data.result.deptId)
  setToken('loginAccount', data.result.account)
  setToken('loginDeptName', data.result.deptName)
  setToken('accountId', data.result.accountId)
  setToken('roleName', data.result.roleName)
}

/***
 * 退出登录
 * ***/
export const getUserLogout = preload => post('/system/logout', preload)

/***
 * 删除用户存储信息
 ***/
export const delUserInfo = () => {
  unsetToken('meauList')
  unsetToken('loginId')
  unsetToken('loginName')
  unsetToken('loginDeptId')
  unsetToken('loginAccount')
  unsetToken('loginDeptName')
  unsetToken('accountId')
  unsetToken('token')
  unsetToken('isLogin')
  unsetToken('roleName')
  store.commit('USER_LOGIN', false)
}

/**
 * 获取验证码图片
 * @returns {*}
 */
export const getImgCheckCode = () => {
  return get('/identify/getidentifyimg')
}

/**
 * 图片验证码校验
 * @param preload
 * @returns {*}
 */
export const checkImgCode = (preload) => {
  return post('/identify/check', preload)
}
