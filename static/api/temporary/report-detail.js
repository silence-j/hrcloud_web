/**
 * Created by hx on 2017/7/25.
 */
import { post } from 'utils/http'
/***
 *获取报表头部
 ***/
export const getReportTitle = preload => post('/report/temporaryReport/selectColumnName', preload || {})

/***
 *获取报表数据
 ***/
export const getReportData = preload => post('/report/temporaryReport/selectTemplateByUserId', preload || {})
