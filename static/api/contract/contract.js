import { post } from 'utils/http'
/**
 * 劳动查询
 */
export const getContractDetails = preload => post('/contract/read', { id: preload })
/**
 * 编辑劳动合同信息
 */
export const editContract = preload => post('/contract/update', preload)
/**
 * 续签劳动合同信息
 */
export const renewContract = preload => post('/contract/continue', preload)

/**
 * 变更劳动合同信息
 */
export const startContract = preload => post('/contract/start', preload)

/**
 * 审批合同
 */
export const collbackContract = preload => post('/contract/collBack', preload)

/**
 * 就业协议列表
 */
export const getEmploymentList = preload => post('/user/user/work/agreement/list', preload)
/* 就业协议 待解除 */
export const getEmploymentWaitReleaseList = preload => post('/user/user/work/agreement/waitRelease', preload)

/**
 * 就业协议签订
 */
export const getEmploySign = preload => post('/user/user/work/agreement/signed/handle', preload)

/**
 * 就业协议不签订
 */
export const getEmployUnSign = preload => post('/user/user/work/agreement/no/signed/handle', preload)

/**
 * 就业协议解除
 */
export const getEmployMove = preload => post('/user/user/work/agreement/relieve/handle', preload)

/**
 * 就业协议查看
 */
export const getAgreementDetail = preload => post('/user/user/work/agreement/detail', { uwaId: preload })

/**
 * 就业协议报到
 */
export const getEmployBaodao = preload => post('/user/user/work/agreement/make/sure/baodao', preload)

/* 就业协议异地签 */
export const getEmployOffsite = preload => post('/user/user/work/agreement/offsite', preload)

/* 劳动异地签 */
export const getOffsiteSave = preload => post('/contract/offsite', preload)

/* 劳动列表 */
export const getContractList = preload => post('/contract/read/allList', preload)

/* 劳动合同待解除列表 */
export const getWaitReleaseList = preload => post('/contract/waitRelease', preload)

/* 劳动合同续签列表 */
export const getContractSelect = preload => post('/contract/select/continue', preload)

/* 查离职信息 */
export const getContractUser = preload => post('/user/user/userInfo', { userId: preload })
