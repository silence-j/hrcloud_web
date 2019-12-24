import { post } from 'utils/http'
/***
 *合同统计
 ***/
export const getContractTotal = () => post('/contract/total')
/***
 *就业协议统计
 ***/
export const getAgreementTotal = () => post('/user/user/work/agreement/total')

/***
 *福利统计
 ***/
export const getWelfareTotal = () => post('/duty/welfareRepotred/selectTotol')

/***
 *社保公积金统计
 ***/
export const getFITotal = () => post('/funds/insurance/selectAllCounts')

/***
 *本周招聘报表
 ***/
export const getWeekrecruitNum = preload => post('/report/data/WeekrecruitNum', { type: preload })

/***
 *本周人员报表
 ***/
export const getWeekUserSituation = () => post('/report/data/weekUserSituation')

/***
 *在职离职员工统计
 ***/
export const getQueryUserStatus = () => post('/report/data/queryUserStatus')
/***
 *年龄，工龄，学历，性别，人员统计
 ***/
export const getUserSituation = () => post('/report/data/userSituation')

/***
 *工龄对应的离职人数
 ***/
export const getWorkingAge = () => post('/report/data/workingAge')
/***
 *政治面貌统计
 ***/
export const getPoliticsStatus = () => post('/report/data/politicsStatus')
