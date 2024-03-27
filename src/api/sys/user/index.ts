import request from '@/utils/request'
import type { loginFormData, loginResponseData, userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/sys/login',
  LOGOUT_URL = '/admin/acl/index/logout',
  USERINFO_URL = '/sys/user/info',

  TABLE_PAGE_URL = '/sys/user/list',
  ADD_USER_INFO = '/sys/user/save',
  UPDATE_USER_INFO = '/sys/user/update',
  DELETE_USER = '/sys/user/delete',

  TABLE_ROLE_PAGE_URL = '/sys/role/list',
  ADD_ROLE_INFO = '/sys/role/save',
  UPDATE_ROLE_INFO = '/sys/role/update',
  DELETE_ROLE = '/sys/role/delete',
  ROLE_INFO = '/sys/role/info/',

  TABLE_MENU_PAGE_URL = '/sys/menu/list',
}

//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

//用户表格分页
export const reqTablePage = (params: any) => request.get<any, any>(API.TABLE_PAGE_URL, { params: params })

//新增
export const addUserInfo = (data: any) => request.post<any, any>(API.ADD_USER_INFO, data)

//修改
export const updateUserInfo = (data: any) => request.post<any, any>(API.UPDATE_USER_INFO, data)

//删除
export const deleteUser = (data: any) => request.post<any, any>(API.DELETE_USER, [data])

//角色表格列表
export const reqRoleTablePage = (params: any) => request.get<any, any>(API.TABLE_ROLE_PAGE_URL, { params: params })

//新增
export const addRoleInfo = (data: any) => request.post<any, any>(API.ADD_ROLE_INFO, data)

//修改
export const updateRoleInfo = (data: any) => request.post<any, any>(API.UPDATE_ROLE_INFO, data)

//删除
export const deleteRole = (data: any) => request.post<any, any>(API.DELETE_ROLE, [data])

//单行的信息
export const getRoleInfo = (roleId: any) => request.get<any, any>(API.ROLE_INFO + roleId)

//菜单表格列表
export const reqMenuTablePage = (params: any) => request.get<any, any>(API.TABLE_MENU_PAGE_URL, { params: params })
