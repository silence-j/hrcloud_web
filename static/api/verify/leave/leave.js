/**
 * Created by hx on 2017/8/3.
 */
import { post } from 'utils/http'
/***
 *离职操作-审批结果回调
 ***/
export const leaveRollback = preload => post('/user/user/dimission/handle/callback', preload)

// 离职详情
export const getLeaveDetail = preload => post('/user/user/dimission/get/info', { userId: preload })
