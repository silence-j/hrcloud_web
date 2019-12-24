/*
 * @Author: huanghaichuan
 * @Date: 2019-07-03 14:13:19
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-05 14:08:03
 */
/****
 * 一些公共的接口
 * ***/
import { post } from 'utils/http'
class ReportApi {
// 组织架构--人事线
 getReportOrgList = preload => post('/system/report/org/list', preload)
 // 根据模块分组获取公司列表
 getReportCompanyList = preload => post('/system//report/org/company/list', preload)
 // 新增--编辑组织
 saveReportOrg = preload => post('/system/report/org/save', preload)
 // 新增自定义单位
 saveReportUnit = preload => post('/system/report/org/unit/save', preload)
 // 删除报表组织架构
 delOrg = preload => post('/system/report/org/del', preload)
 //
 getDeptGroupIds = preload => post('/system/report/org/dept/group/ids', preload)
 // 所有的树形结构
 getAllTreeList = preload => post('/system/dept/treelist/all', preload)
 // 新增自定义部门
 saveReportDept = preload => post('/system/report/org/dept/save', preload)
 // 人事线搜索组织架构
  getHrOrgTreeByLogin =() => post('/system/report/org/hrOrgTreeByLogin')
}
export default new ReportApi()
