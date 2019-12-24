/**
 *权限的接口
 ***/
import { post } from 'utils/http'
/***
 * 登录用户拥有的角色权限
 ****/
export const getActGroup = preload => post('/act/group/select', preload)

/***
 * 审批进行
 ****/
export const getTaskComplete = preload => post('/act/complete', preload)

// 批量审批
export const getTaskCompleteBatch = preload => post('/act/completeBatch', preload)

/***
 * 入职审核回调
 ****/
export const getAuditDone = preload => post('/user/user/entry/info/auditDone', preload)

// 营销人员总部确认list
export const getHeadList = preload => post('/act/headList', preload)

// 营销人员总部确认
export const sureHeadConfirm = preload => post('/act/headConfirm', preload)

// 调动审核信息保存 薪资 新部门 新岗位等
export const saveTransferMessage = preload => post('/user/user/transfer/save', preload)
