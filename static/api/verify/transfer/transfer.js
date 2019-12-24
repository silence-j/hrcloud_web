/**
 * Created by hx on 2017/8/3.
 */
import { post } from 'utils/http'
/***
 *公司间申请调动
 ***/
export const getTransfer = preload => post('/user/user/transfer/handle/company', preload)
/***
 *部门间申请调动
 ***/
export const getPostTransfer = preload => post('/user/user/transfer/handle/dept', preload)

/***
 *接收详情
 ***/
export const getReceiveDetail = preload => post('/user/user/transfer/get/detail', { userId: preload })

/***
 *接收详情审批
 ***/
export const getReceiveDetail2 = preload => post('/user/user/transfer/get/detail', { id: preload })

/***
 *部门间调动公司
 ***/
export const getPostCompanyName = preload => post('/system/dept/get/list/all/by/org/id', preload)

/***
 *调动同意回调接口
 ***/
export const transferCallback = preload => post('/user/user/transfer/audit/callback', preload)

// 营销人员调动回调接口
export const marketTransferCallback = preload => post('/user/user/transfer/market/audit/callback', preload)
/***
 *调动撤销回调接口
 ***/
export const transferback = preload => post('/user/user/transfer/audit/cancel', preload)

// 获取员工年假数据
export const getUserInfoForTramsfer = preload => post('/system/annual/leave/get/info/for/transfer', { userId: preload })

// 获取员工当前薪资信息
export const getUserCurrentSalary = preload => post('/user/salary/month/get/current', { userId: preload })
