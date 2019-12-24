/****
 * 一些公共的接口
 * ***/
import { post } from 'utils/http'
/***
 * 获取所有部门
 * ***/
export const getAllOrganize = preload => {
  let params
  if (typeof preload === 'object') {
    params = preload
  } else {
    params = { parentId: preload }
  }
  return post('/system/dept/list', params)
}
/***
 * 新的组织架构树形结构
 * **/
export const getNewDeptTree = preload => post('/system/dept/listById', preload)
// 获取组织架构详情
export const getOrgDetail = preload => post('/system/dept/detail', { id: preload })
/***
 * 组织架构树结构
 *  */
export const getDeptTreelist = preload => post('/system/dept/treelist', preload)
/***
 * 获取省市接口
 * ***/
export const getAllarea = preload => post('/user/area/list/by/parent', { pid: preload })

export const getAllareaStaff = preload => post('/user/copy/link/area/list/by/parent', { pid: preload })

/***
 * 数据字典 数据字典项 SEX：性别, DUTYlEVEL：
 * 职务级别(duty_level), SALARYSYS：工资体系(salary_sys), TREATMENTLEVEL：
 * 待遇级别(treatment_level), ENTRYINFOTYPE：
 * 入职信息采集类别(entry_info_type)
 * ***/
export const getSysDic = preload => post('/system/dic/get', { type: preload })

/***
 * 个人资料查看
 * ***/
export const checkMaterial = preload => {
  return post('/user/user/entry/info/extra/list ', { userId: preload })
}
// 外链个人资料查看
export const checkLinkMaterial = preload => post('/user/copy/link/entry/info/extra/list', preload)
/***
 * 获取deptNO
 * ***/
export const getDeptNo = preload => post('/user/user/get/manage/org/ids ', preload)
/**
 *
 根据组织架构获取所有员工列表
 **/
export const orgSelectStaffList = preload => post('/user/user/get/list/for/sys', preload)
/***
 * 获取公司部门
 * ***/
export const getAllpostName = preload => post('/system/dept/list', preload)

/***
 * 获取审核接收的组织结构
 * ***/
export const getReveiveOrg = preload => post('/system/dept/get/list/all/by/parent', preload)
/***
 * 修改密码接口
 * ***/
export const updatePassword = preload => post('/system/account/update/password', preload)

/***
 * 切换账号列表
 * **/
export const getByRoleList = preload => post('/system/account/get/allot/role/list/', { accountId: preload })

/***
 * 切换账号
 * **/
export const changeAccount = preload => post('/system/relogin/change/role', preload)
export const getAllNoSysCompany = preload => post('/system/dept/listAllCompany', preload)

// 查询模块所有字段
export const listAllColumn = preload => post('/system/userFiled/listAllColumn', preload)

// 保存用户要显示的字段
export const saveBatch = preload => post('/system/userFiled/saveBatch', preload)

// 查询用户显示字段
export const listByUserId = preload => post('/system/userFiled/listByUserId', preload)

/** 高级查询下拉菜单查询 by typs
 params types
 * */
export const getListByTypes = preload => post('/system/dic/listByTypes', preload)
