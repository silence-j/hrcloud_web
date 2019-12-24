/*
 * @Author: huanghaichuan
 * @Date: 2019-07-03 14:13:19
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-05 09:14:23
 * @des 员工基本信息接口
 */
import { post } from 'utils/http'
class PersonnalApi {
// 员工基本信息列表
 getRecruitList = preload => post('/user/user/list', preload)
 // 员工信息列表_报到和转正操作
 updateUserStatus = preload => post('/user/user/updateStatus', preload)
 // 离职申请
 leaveApply = preload => post('/user/user/dimission/handle/apply', preload)
 // 离职确认
 leaveSure = preload => post('/user/user/dimission/handle/make/sure', preload)
 // 退休返聘保存
 saveRetireReemploy = preload => post('/user/user/retire/reemploy', preload)
 // 离职移交信息-获取
 leaveDataGet = preload => post('/user/user/dimission/get/handover/info', { userId: preload })
 // 离职移交信息-保存
 leaveDataSave = preload => post('/user/user/dimission/handover/save', preload)
 // 完成退休返聘操作
 sureRetireReemploy = preload => post('/user/user/retire/reemploy/complete', preload)
 // 返聘详情
 getRetireDetail = preload => post('/user/user/get/reemploy/info', { userId: preload })
}
export default new PersonnalApi()
