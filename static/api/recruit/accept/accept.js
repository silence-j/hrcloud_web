import { post } from 'utils/http'
/***
 *应聘人员登记表列表
 ***/
export const getRecruitList = preload => post('/user/user/list', preload)

/***
 *查看应聘人员详情主要信息
 ***/
export const checkAcceptBaseDetail = preload => post('/user/user/detail', { id: preload })
// 外链应聘人员详细信息
export const checkLinkAcceptBaseDetail = preload => post('/user/copy/link/offer/user/detail', { copyToken: preload })

/***
 *查看应聘人员详情主要信息(面试邀请)
 ***/
export const checkAcceptBaseDetailInterView = preload => post('/user/copy/link/user/detail', preload)

/***
 *查看应聘人员详情其它信息
 ***/
export const checkAcceptOtherDetail = preload => post('/user/user/candidate/info/list', { userId: preload })

/***
 *查看应聘人员详情其它信息(不用登陆)
 ***/
export const checkAcceptOtherDetailStafff = preload => post('/user/copy/link/candidate/info/list', { userId: preload })

/***
 *查看应聘人员工作信息
 ***/
export const checkAcceptJobDetail = preload => post('/user/user/job/resume/list', { userId: preload })

/***
 *查看应聘人员工作信息(不用登陆)
 ***/
export const checkAcceptJobDetailStaff = preload => post('/user/copy/link/job/resume/list', { userId: preload })

/***
 *查看应聘人员家庭信息
 ***/
export const checkAcceptFamilyDetail = preload => post('/user/user/family/members/list', { userId: preload })

/***
 *查看应聘人员家庭信息（不用登陆）
 ***/
export const checkAcceptFamilyDetailStaff = preload => post('/user/copy/link/family/members/list', { userId: preload })

/***
 *查看应聘人员简历信息
 ***/
export const checkAcceptResumeDetail = preload => post('/user/user/educations/list', { userId: preload })

/***
 *查看应聘人员简历信息(不用登陆)
 ***/
export const checkAcceptResumeDetailStaff = preload => post('/user/copy/link/educations/list', { userId: preload })

/***
 *面试评估
 ***/
export const editClassify = preload => post('/user/user/candidate/info/assess', preload)

/***
 *保存(编辑)员工个人信息
 ***/
export const savePersonnelMsg = preload => post('/user/user/personal/info/save', preload)
// 外链员工基本信息保存
export const saveLinkPersonelMsg = preload => post('/user/copy/link/offer/personal/info/save', preload)
/***
 *保存(编辑)员工个人信息(新街口)
 ***/
export const savePersonnelMsgNew = preload => post('/user/user/candidate/info/save', preload)

/***
 *保存(编辑)员工个人信息(面试邀请)
 ***/
export const savePersonnelMsgInterView = preload => post('/user/copy/link/personal/info/save', preload)

/***
 *查看员工曾经录入记录
 ***/
export const getEntryList = preload => post('/user/user/entryList', { idCardNumber: preload })

/***
 *删除待面试 未面试人员
 ***/
export const delUndetermined = preload => post('/user/user/delete', { id: preload })

/***
 *查询招聘岗位
 ***/
export const searchJoy = preload => post('/recruit/demand/list', preload)

/***
 *查询审批进度
 ***/
export const howProgress = preload => post('/act/task/detail', preload)
