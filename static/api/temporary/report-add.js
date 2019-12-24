/**
 * Created by hx on 2017/7/24.
 */
import { post } from 'utils/http'
/***
 *新增报表
 ***/
export const addReportData = preload => post('/report/temporaryReport/createTemplate', preload || {})

/***
 *校验报表名称是否重复
 ***/
export const selectTemplateName = preload => post('/report/temporaryReport/selectTemplateName', preload || {})

/***
 *获取详情
 ***/
export const selectTemplateDetail = preload => post('/report/temporaryReport/selectTemplateDetail', preload || {})

/***
 *编辑报表
 ***/
export const updateTemplate = preload => post('/report/temporaryReport/updateTemplate', preload)
