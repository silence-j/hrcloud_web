import { post, callBack } from 'utils/http'
/**
 * 系统设置api
 * **/
// 新增组织结构
export const addDept = preload => post('/system/dept/add', preload)
// 删除组织架构
export const deleteDept = preload => post('/system/dept/delete', preload)

// 编辑组织架构
export const editCurrentDept = preload => post('/system/dept/edit', preload)

// 角色列表
export const getRoleList = preload => post('/system/role/list', preload || {})
// 新增修改角色
export const createRole = preload => post('/system/role/save', preload || {})

// 新增修改角色
export const getListByRole = preload => post('/system/menu/get/list/by/role', { roleId: preload })

// 删除角色
export const delRole = preload => post('/system/role/delete', { roleId: preload })

// 获取角色修改日志
export const getRoleLogs = preload => post('/system/role/get/logs', { roleId: preload })

// 获取账号列表
export const getAccountList = preload => post('/system/account/read/list', preload)

// 获取员工列表
export const getUserList = preload => post('/user/user/search/list', preload)

// 根据登陆账号ID 获取角色列表
export const getRoleByLogin = preload => post('/system/account/get/role/list/by/login', { accountId: preload })

// 根据登陆账号ID 获取关联角色、组织列表
export const getRoleBySysUser = preload => post('/system/account/get/role/org/list/by/sysUser', { sysUserId: preload })

// 编辑账号
export const saveAccount = preload => post('/system/account/register/save', preload)

// 禁止账号
export const forbiddenAccount = preload => post('/system//account/forbidden', preload)

// 删除账号
export const delAccount = preload => post('/system/account/delete', { id: preload })

// 获取角色分组
export const getRoleGroup = preload => post('/act/group/select', preload)

// 新增角色分组获取角色分组
export const createRoleGroup = preload => post('/act/user/create', preload)

// 查询角色分组
// export const roleGroupDetail = preload => post('/system/dept/memberShip/select', preload)
export const roleGroupDetail = preload => post('/act/memberShip/select', preload)
// 删除角色分组
export const delGroupDetail = preload => post('/act/memberShip/delete', preload)

// 删除所有审批角色
export const delAllRole = preload => post('/act/user/delete', { userId: preload })

// 邮件模板list
export const getMailTemplateList = preload => post('/system/mail/temps/list', preload)

// 邮件模板list
export const getMailTemplateListNew = preload => post('/system/mail/temps/list/for/send ', preload)

// 邮件新增
export const addMailTemplate = preload => post('/system/mail/temps/add', preload)

// 获取发件人邮箱
export const getSenderMailList = preload => post('/system/mail/sender/list', preload)

// 发件人信息修改
export const modifySenderMessage = preload => post('/system/mail/sender/update', preload)

// 发件人删除
export const delSender = preload => post('/system/mail/sender/del', { senderId: preload })

// 发件人新增
export const addSender = preload => post('/system/mail/sender/add', preload)

// 邮件模板启用停用
export const enabledMail = preload => post('/system/mail/temps/enable', preload)
export const getMailTemplateDetail = preload => post('/system/mail/temps/detail', { tempId: preload })
export const getMailSendTemplateDetail = preload => post('/system/mail/detail/for/send', { tempId: preload })

export const updateTemplate = preload => post('/system/mail/temps/update', preload)

// 发送面试邀请
export const sendInterView = preload => post('/user/user/add/interview/invitation', preload)

// 发送offer
export const sendOfferNew = preload => post('/system/mail/send', preload)

// 公司薪资设置列表
export const getCompanySalaryList = preload => post('/system/company/salary/set/list', preload)

// 获取当前公司的工资结构详情
export const getCurrentComSalaryType = preload => callBack('/system/company/salary/set/get/info/by/orgId', { orgId: preload })

// 保存当前公司的工资结构
export const saveCurrentComSalaryType = preload => post('/system/company/salary/set/save', preload)

// 薪资设置树形结构
export const getSalaryListByPid = preload => post('/user/salary/list/byPid', preload)

// 单个薪资保存
export const saveSingleSalary = preload => post('/user/salary/save', preload)

// 批量薪资保存
export const saveListSalary = preload => post('/user/salary/saveList', preload)

// 根据条件查询list (type:1普通薪资构成，2岗位构成，3工资其他构成)
export const getSalarySettingList = preload => post('/user/salary/list', preload)
export const getSalaryById = id => post('/user/salary/get', { id: id })

// 新的薪资保存
export const saveSalaryStructure = preload => post('/user/salary/month/save', preload)
// 外链薪资保存接口
export const saveLinkSalaryStructure = prelaod => post('/user/copy/link/salary/month/save', prelaod)
// 新的薪资详情接口
export const getSalaryDeatil = preload => post('/user/salary/month/detail', preload)

// 外链薪资接口详情
export const getLinkSalaryDetail = preload => post('/user/copy/link/salary/month/detail', preload)
