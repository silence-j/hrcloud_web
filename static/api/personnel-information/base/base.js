/**
 * Created by hx on 2017/8/3.
 */

import { post } from 'utils/http'
/***
 *员工基本信息列表
 ***/
export const getRecruitList = preload => post('/user/user/list', preload)
/***
 * 离职申请
 * ***/
export const leaveApply = preload => post('/user/user/dimission/handle/apply', preload)
/***
 * 确认离职
 * ***/
export const leaveSure = preload => post('/user/user/dimission/handle/make/sure', preload)
/***
 * 离职移交信息-获取
 * ***/
export const leaveDataGet = preload => post('/user/user/dimission/get/handover/info', { userId: preload })

/***
 * 离职移交信息-保存
 * ***/
export const leaveDataSave = preload => post('/user/user/dimission/handover/save', preload)
/***
 * 学习简历、家庭成员、工作经历list 删除
 * **/
export const delFamilyList = preload => post('/user/user/family/members/delete', preload)

export const delResumeList = preload => post('/user/user/job/resume/delete', preload)

export const delEduList = preload => post('/user/user/educations/delete', preload)
// 外链人员学历删除
export const delLinkEduList = preload => post()
export const delFamilyListStaff = preload => post('/user/copy/link/family/members/delete', preload)

export const delResumeListStaff = preload => post('/user/copy/link/job/resume/delete', preload)

export const delEduListStaff = preload => post('/user/copy/link/educations/delete', preload)

/**
 *员工信息列表_报到和转正操作
 **/
export const updateUserStatus = preload => post('/user/user/updateStatus', preload)

/**
 * 变动记录
 * ***/
export const getHistoryList = preload => post('/user/history/list', preload)

/***
 * 人员状态变化记录
 * **/
export const getPeosonChangeStatus = preload => post('/user/user/queryStaus', { userId: preload })

// 营销人员新增
export const addMarketUser = preload => post('/user/user/add/marketer', preload)

// 营销人员重新审批
export const reMarketUser = preload => post('/user/user/save/marketer/reaudit', preload)

/***
 * 备注list
 * **/
export const getUserRemarkList = preload => post('/user/userRemark/list', { userId: preload })

/***
 * 新增备注list
 * **/
export const getAddRemarkList = preload => post('/user/userRemark/save', preload)

/**
 * 员工基本信息劳动查询
 */
export const getPersonContractDetails = preload => post('/contract/getUserContract', { userId: preload })

/* 员工基本信息变动记录 */
export const getPersonChangeDetails = preload => post('/user/user/get/changes/infos', { userId: preload })

/* 员工基本信息变动记录 */
export const getPersonJobDetails = preload => post('/duty/queryDutyList', { userId: preload })
// 新增港澳台员工
export const addOtherUser = preload => post('/user/user/add/other', preload)

/** 退休返聘 **/
// 退休返聘保存
export const saveRetireReemploy = preload => post('/user/user/retire/reemploy', preload)

// 返聘详情
export const getRetireDetail = preload => post('/user/user/get/reemploy/info', { userId: preload })

// 完成退休返聘操作
export const sureRetireReemploy = preload => post('/user/user/retire/reemploy/complete', preload)

// 批量调动
export const batchMove = preload => post('/user/user/transfer/batch', preload)
