import { post } from 'utils/http'
/**
 * 异动表
 */
export const getReportMove = preload => post('/report/monthlyReportForms/selectMonthlyMove', preload)

/**
 * 主表
 */
export const getReportMain = preload => post('/report/monthlyReportForms/queryMonthlyMain', preload)

/**
 * 人力数据分析
 */
export const getReportManPower = preload => post('/report/data/selectCount', preload)

/**
 * 人员分析
 */
export const getDataUser = preload => post('/report/data/user', preload)

/**
 * 报表环比报表接口
 */
export const getChangeCircle = preload => post('/report/monthlyCompareForms/queryMonthCompare', preload)
// 根据自定义部门id获取全部下部门组织
export const getDeptGroupList = preload => post('/system/report/org/dept/group/list', preload)
// 根据公司id获取全部下部门组织
export const geGroupListByCompany = preload => post('/system/report/org/dept/group/list/by/company', preload)
// 人事线主表查询
export const getQueryMonthlyMain = preload => post('/report/monthlyReportForms/queryMonthlyMain/hrBelong', preload)
// 人事线异动表组织筛选重组树
export const getMarketReportTree = preload => post('/system/report/org/monthly/move/tree', preload)
// 人事线月报异动表查询
export const getSelectMonthlyMove = preload => post('/report/monthlyReportForms/selectMonthlyMove/hrBelong', preload)
// 人事线人力数据分析
export const getMarketDatUser = preload => post('/report/data/user/hrBelong', preload)
export const getMarketManPower = preload => post('/report/data/selectCount/hrBelong', preload)
// 人事线异动表导出
export const exportMoveReport = preload => post('/report/monthlyReportForms/selectMonthlyMove/hrBelong/export', preload)
