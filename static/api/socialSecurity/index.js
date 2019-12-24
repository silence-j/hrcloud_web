import { post } from 'utils/http'
/***
 *社保转移记录列表
 ***/
export const getTransferList = preload => post('/funds/treatment/transfer/list', preload)

/***
 *新增
 ***/
export const getAddTransfer = preload => post('/funds/treatment/transfer/insert', preload)

/***
 *修改
 ***/
export const getUpdateTransfer = preload => post('/funds/treatment/transfer/update', preload)

/***
 *删除
 ***/
export const getDeleteTransfer = preload => post('/funds/treatment/transfer/delete', preload)

/* 退休人员管理列表 */
export const getRetiredList = preload => post('/funds/treatment/retired/list', preload)

/* 新增 */
export const getAddRetired = preload => post('/funds/treatment/retired/insert', preload)

/* 修改 */
export const getUpdateRetired = preload => post('/funds/treatment/retired/update', preload)

/* 删除 */
export const getDeleteRetired = preload => post('/funds/treatment/retired/delete', preload)

/* 驻外定点医院 */
export const getHospitalList = preload => post('/funds/treatment/hospital/list', preload)
/* 新增 */
export const getAddHospital = preload => post('/funds/treatment/hospital/insert', preload)

/* 修改 */
export const getUpdateHospital = preload => post('/funds/treatment/hospital/update', preload)

/* 删除 */
export const getdeleteHospital = preload => post('/funds/treatment/hospital/delete', preload)

/* 医疗 */
export const getMedicalList = preload => post('/funds/treatment/medical/list', preload)

/* 新增 */
export const getAddMedical = preload => post('/funds/treatment/medical/insert', preload)

/* 修改 */
export const getUpdateMedical = preload => post('/funds/treatment/medical/update', preload)

/* 删除 */
export const getDeleteMedical = preload => post('/funds/treatment/medical/delete', preload)

/* 生育 */
export const getProcreationList = preload => post('/funds/treatment/procreation/list', preload)
/* 新增 */
export const getAddProcreation = preload => post('/funds/treatment/procreation/insert', preload)

/* 修改 */
export const getUpdateProcreation = preload => post('/funds/treatment/procreation/update', preload)

/* 删除 */
export const getDeleteProcreation = preload => post('/funds/treatment/procreation/delete', preload)

/* 工伤待遇 */
export const getInjuryList = preload => post('/funds/treatment/injury/list', preload)

/* 新增 */
export const getAddInjury = preload => post('/funds/treatment/injury/insert', preload)

/* 修改 */
export const getUpdateInjury = preload => post('/funds/treatment/injury/update', preload)

/* 删除 */
export const getDeleteInjury = preload => post('/funds/treatment/injury/delete', preload)

/* 失业 */
export const getUnemployedList = preload => post('/funds/treatment/unemployed/list', preload)

/* 新增 */
export const getAddUnemployed = preload => post('/funds/treatment/unemployed/insert', preload)

/* 修改 */
export const getUpdateUnemployed = preload => post('/funds/treatment/unemployed/update', preload)

/* 删除 */
export const getDeleteUnemployed = preload => post('/funds/treatment/unemployed/delete', preload)

/* 社保调整比例列表 */
export const getStandardList = preload => post('/funds/insurance/percent/list', preload)

/* 删除 */
export const getDeleteStandard = preload => post('/funds/insurance/percent/delete', preload)

/* 新增调整 */
export const getAddStandard = preload => post('/funds/insurance/percent/insert', preload)
/* 调整 */
export const getUpdateStandard = preload => post('/funds/insurance/percent/update', preload)

/* 社保列表 */
export const getSocialList = preload => post('/funds/insurance/list', preload)

/* 参保 */
export const getSocialSave = preload => post('/funds/insurance/save', preload)

/* 查看详情 */
export const getSocialDetail = preload => post('/funds/insurance/detail', preload)

/* 变更记录 */
export const getSocialhistoryList = preload => post('/funds/insurance/history', preload)
/* 缴费记录 */
export const getSocialpaymentList = preload => post('/funds/insurance/payment/list', preload)
/* 根据户籍性质 参保地 查询 社保比例 */
export const getSelectPercentList = preload => post('/funds//insurance/percent/selectPercentList', preload)

/* 公积金列表 */
export const getFundList = preload => post('/funds/fund/list', preload)
/* 查看详情 */
export const getFundDetail = preload => post('/funds/fund/detail', preload)

/* 办理/变更 */
export const getFundHandelSave = preload => post('/funds/fund/save', preload)
/* 缴纳记录 */
export const getFundPaymentList = preload => post('/funds/fund/payment/list', preload)

/* 公积金调整比例 */
export const getFundStandardList = preload => post('/funds/fund/percent/list', preload)

/* 新增调整 */
export const getFundAddStandard = preload => post('/funds/fund/percent/insert', preload)

/* 调整 */
export const getFundUpdateStandard = preload => post('/funds/fund/percent/update', preload)

/* 公积金调整记录 */
export const getFundSelectOldList = preload => post('/funds/fund/percent/selectOldList', preload)

/* 公积金调整记录 */
export const getSocialSelectOldList = preload => post('/funds/insurance/percent/selectOldList', preload)

/* 输入户籍性质和参保单位,查询已用的户籍性质 */
export const getSelectUsedNature = preload => post('/funds/insurance/percent/selectUsedNature', preload)
