/**
 * Created by hx on 2017/7/20.
 */
import { post } from 'utils/http'
/***
 *报表管理列表（总部）
 ***/
export const getManageReportList = preload => post('/report/temporaryReport/selectManageTemplate', preload)

/***
 *报表管理列表
 ***/
export const getReportList = preload => post('/report/temporaryReport/selectTemplate', preload)

/***
 *删除报表
 ***/
export const deteleReport = preload => post('/report/temporaryReport/deleteTemplate', preload)
