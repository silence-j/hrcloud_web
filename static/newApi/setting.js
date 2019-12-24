/*
 * @Author: huanghaichuan
 * @Date: 2019-07-10 09:48:43
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-17 09:56:53
 * des:系统设置接口
 */

import { post } from 'utils/http'
class SettingApi {
  // 获取员工列表
  getUserList = preload => post('/user/user/search/list', preload)
  // 获取角色分组
  getRoleGroup = preload => post('/act/group/select', preload)
  // 发件人信息修改
  modifySenderMessage = preload => post('/system/mail/sender/update', preload)
  // 发件人新增
  addSender = preload => post('/system/mail/sender/add', preload)
  // 获取发件人邮箱
  getSenderMailList = preload => post('/system/mail/sender/list', preload)
  // 邮件新增
 addMailTemplate = preload => post('/system/mail/temps/add', preload)
 // 获取邮箱模板详情
 getMailTemplateDetail = preload => post('/system/mail/temps/detail', { tempId: preload })
 // 编辑邮箱模板
 updateTemplate = preload => post('/system/mail/temps/update', preload)
 // 发件人删除
 delSender = preload => post('/system/mail/sender/del', { senderId: preload })
}
export default new SettingApi()
