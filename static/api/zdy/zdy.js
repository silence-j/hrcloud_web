
import { post } from 'utils/http'
/* 获取列表 */
export const getCommonList = preload => post('/system/dic/list', preload)
/* 编辑保存 */
export const getSaveCommon = preload => post('/system/dic/saveOptions', preload)
/* 级别保存 */
export const getLeaveSave = preload => post('/system/dic/saveLevelNo', preload)

/* 排序保存 */
export const getSortSave = preload => post('/system/dic/saveSort', preload)
