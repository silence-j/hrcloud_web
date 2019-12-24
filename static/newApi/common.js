/*
 * @Author: huanghaichuan
 * @Date: 2019-07-03 14:13:19
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-07 10:21:01
 */
/****
 * 一些公共的接口
 * ***/
import { post } from 'utils/http'
class CommonApi {
  getListForSys = preload => post('/user/user/get/list/for/sys', preload)
  getDeptTreelist = preload => post('/system/dept/treelist', preload)
  // 查询用户显示字段
  listByUserId = preload => post('/system/userFiled/listByUserId', preload)
  /***
 * 数据字典 数据字典项 SEX：性别, DUTYlEVEL：
 * 职务级别(duty_level), SALARYSYS：工资体系(salary_sys), TREATMENTLEVEL：
 * 待遇级别(treatment_level), ENTRYINFOTYPE：
 * 入职信息采集类别(entry_info_type)
 * ***/
  getSysDic = preload => post('/system/dic/get', { type: preload })
  // 获取组织架构详情
  getOrgDetail = preload => post('/system/dept/detail', { id: preload })
  /***
 * 获取所有部门
 * ***/
 getAllOrganize = preload => {
   let params
   if (typeof preload === 'object') {
     params = preload
   } else {
     params = { parentId: preload }
   }
   return post('/system/dept/list', params)
 }
 // 根据父级查看区域
 getAreaByPid = preload => post('/user/area/list/by/parent', { pid: preload })
}
export default new CommonApi()
