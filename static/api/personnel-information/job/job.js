/**
 * Created by hx on 2017/8/3.
 */

import { post } from 'utils/http'
/***
 *干部管理基本信息列表
 ***/
export const getJobList = preload => post('/duty/read/list', preload)

/**
 *各类列表接口
 *
 */
export const queryClassList = preload => post('/system/dic/get', { type: preload })

/**
 *查看职务
 *
 */
export const getJobdetail = preload => post('/duty/read/detail', preload)

/**
 *查看审批职务详情
 *
 */
export const getJobAuditdetail = preload => post('/duty/dutyAuditDetail', preload)

/**
 *新增职务
 *
 */
export const getAddJob = preload => post('/duty/insertDuty', preload)

/**
 *查询是否为主职/兼职
 *
 */
export const getSelectUserId = preload => post('/duty/selectDutyByUserId', { userId: preload })

/**
 *免除职务
 *
 */
export const stopDuty = preload => post('/duty/dutyExempt', preload)

/**
 *获取主职变兼职信息
 *
 */
export const stopPassDuty = preload => post('/duty/query/dutyName', preload)

/**
 *免除同意/判断是否是第一次新增
 *
 */
export const getSelectPackage = preload => post('/duty/selectSalaryPackage', { userId: preload })

/**
 *
 职务审核
 **/
export const dutyPass = preload => post('/duty/dutyAuditPass', preload)

/***
 *查看应聘人员详情mingzi
 ***/
export const checkAccept = preload => post('/user/user/detail', preload)

/***
 *撤销
 ***/
export const backout = preload => post('/duty/backout', preload)

/**
 * 更新更新查询列表
 */
export const updatesList = preload => post('/user/userChangeData/list', preload)

/**
 * 查询下拉列表
 */
export const dropList = preload => post('/user/userChangeData/queryChangeNames', preload)

/**
 * 查看详情（人员状态）
 */
export const updateDesc = preload => post('/user/setting/detail', preload)
// 家庭情况
export const updateFamilyDesc = preload => post('/user/userChangeData/queryList', preload)
// 是否在中财工作  查看详情
export const isInCompany = preload => post('/user/userChangeData/detail', preload)
/***
 *查看在职信息
 ***/
export const getDutyInformationList = preload => post('/duty/selectDutyList', preload)
