/*
 * @Author: huanghaichuan
 * @Date: 2019-08-05 09:04:35
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-07 08:46:11
 * des 入职相关接口
 */
import { post } from 'utils/http'
class EntryApi {
  // 员工入职信息查询
  getUserInfoDetail = preload => post('/user/entry/info/read', { userId: preload })
  // 更新更正提交接口
  saveUserChange = preload => post('/user/userChangeData/save', preload)
  // 员工详情接口
  getUserDetail = preload => post('/user/user/detail', { id: preload })

  // 学习简历、家庭成员、工作经历list 删除
  delFamilyList = preload => post('/user/user/family/members/delete', preload)
  delResumeList = preload => post('/user/user/job/resume/delete', preload)
  delEduList = preload => post('/user/user/educations/delete', preload)
  // 人员状态更新更正、
  saveUserChangeFile = preload => post('/user/userChangeData/changeFile', preload)

  // 更正下拉框
  queryChangeNames = preload => post('/user/userChangeData/queryChangeNames', preload)

  // 人员状态详情
  queryUserStatus = preload => post('/user/setting/selectCorrect', { userId: preload })
}
export default new EntryApi()
