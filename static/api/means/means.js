import { post } from 'utils/http'
/**
 * 资料移交列表
 */
export const getMeansList = preload => post('/user/user/entry/data/transfer/list ', preload)
/**
 * 资料移交操作
 */
export const meansTransfer = preload => post('/user/user/entry/data/transfer/handle', preload)

/**
 * 资料撤销操作
 */
export const meansMove = preload => post('/user//user/entry/data//transfer/cancel/handle ', preload)

/**
 * 资料接收操作
 */
export const acceptMeans = preload => post('/user//user/entry/data/accept/handle ', preload)
