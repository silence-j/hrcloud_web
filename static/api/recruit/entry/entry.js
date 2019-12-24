import { post } from 'utils/http'
/***
 *审批列表（待审批）
 ***/
export const getTaskList = preload => post('/act/list/task', preload)

/***
 * 发起的审批中
 * ***/
export const getTaskFinshed = preload => post('/act/list/user/finished', preload)

/***
 *发起的列表（驳回列表）
 ***/
/* export const getTaskFinshed =preload=> post('/act/list/user/finished', preload)
/***
 *审批撤销
 ***/
export const rollBackExmine = preload => post('/act/rollBack', preload)
/***
 * 审核(通过)
 * ***/
export const getTaskComplete = preload => post('/act/complete', preload || {})

/***
 * 薪资体系列表
 * ***/
export const getSalaryList = preload => post('/user/user/get/salary/sys/list', { salarySysId: preload })

/***
 * 员工薪资设置保存
 * ***/
export const saveSalarySetting = preload => post('/user/user/salary/setting/save', preload)
// 外链员工新增保存
export const saveLinkSalarySettting = preload => post('/user/copy/link/salary/setting/save', preload)
/***
 * 复核查看审批意见
 * ***/
export const checkDetail = preload => post('/user/user/get/salary/setting/detail ', { userId: preload })

/***
 * 员工入职信息保存
 * ***/
export const saveUserEntryInfo = preload => post('/user/entry/info/save', preload)
// 外链入职信息保存
export const saveLinkUserEntryInfo = preload => post('/user/copy/link/entry/info/save', preload)
/***
 * 员工入职信息查询
 * ***/
export const getUserInfoDetail = preload => post('/user/entry/info/read', { userId: preload })
// 外链员工入职信息查询
export const getUserLinkDetail = preload => post('/user/copy/link/entry/info/read', preload)

/***
 * 员工报到回调
 * ***/
export const assessCallback = preload => post('/user/user/candidate/info/assess/callback', preload)

/**
 * 入职资料删除接口
 * **/
export const delEntryMaterial = preload => post('/user/user/entry/info/extra/delete', preload)
// 外链入职资料删除
export const delLinkEntryMaterial = preload => post('/user/copy/link/entry/info/extra/delete', preload)
/**
 * 入职资料保存
 * **/
export const saveMeterial = preload => post('/user/user/entry/info/extra/save', preload)

// 批量回调
export const setUserBatch = preload => post('/user/user/market/assess/callback/batch', preload)

// 入职信息页面导出/打印
export const printEntryMessage = preload => post('/user/print/entry/page/data', preload)
// 应聘人员登记表打印
export const printCheckMessage = preload => post('/user/print/userCandidateInfoPrint', preload)
/**
 * 更正审核
 */
export const changeUpdateAuit = preload => post('/user/userChangeData/complete', preload)

// 更正更新审核
export const changeUpdateDesc = preload => post('/user/userChangeData/detail', preload)
