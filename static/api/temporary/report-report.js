/**
 * Created by hx on 2017/7/25.
 */
import { post } from 'utils/http'
/***
 *导入
 ***/
export const exportData = preload => post('/report/temporaryReport/export', preload)
