import { post } from 'utils/http'
/***
 *职位列表
 ***/
export const getPostList = preload => post('/recruit/demand/list', preload || {})

/**
 * 撤销/归档
 */
export const updatePost = preload => post('/recruit/demand/update', preload || {})

/**
 * 增加应聘人员
 */
export const addPost = preload => post('/recruit/demand/add', preload)

/**
 * 查看应聘人员
 */
export const checkPost = preload => post('/recruit/demand/detail', { id: preload })
