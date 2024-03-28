import request from '@/utils/request'
import type { loginFormData, loginResponseData, userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/sys/login',
  LOGOUT_URL = '/admin/acl/index/logout',
  USERINFO_URL = '/sys/user/info',
  USERINFO_URL_ID = '/sys/user/info/',

  TABLE_PAGE_URL = '/sys/user/list',
  ADD_USER_INFO = '/sys/user/save',
  UPDATE_USER_INFO = '/sys/user/update',
  DELETE_USER = '/sys/user/delete',

  TABLE_ROLE_PAGE_URL = '/sys/role/list',
  ADD_ROLE_INFO = '/sys/role/save',
  UPDATE_ROLE_INFO = '/sys/role/update',
  DELETE_ROLE = '/sys/role/delete',
  ROLE_INFO = '/sys/role/info/',
  ROLE_SELECT = '/sys/role/select',

  TABLE_MENU_PAGE_URL = '/sys/menu/list',
  MENU_SELECT = '/sys/menu/select',
  ADD_MENU_INFO = '/sys/menu/save',
  UPDATE_MENU_INFO = '/sys/menu/update',
  DELETE_MENU = '/sys/menu/delete/',

  TABLE_LOG_PAGE_URL = '/sys/log/list',
}

//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)

//获取用户信息
export const reqUserInfoId = (id: any) => request.get<any, userInfoResponseData>(API.USERINFO_URL_ID + id)

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

//单角色名称
export const getRoleSelect = (params: any) => request.get<any, any>(API.ROLE_SELECT, { params: params })

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

//单菜单名称
export const getMenuSelect = (params: any) => request.get<any, any>(API.MENU_SELECT, { params: params })

//新增
export const addMenuInfo = (data: any) => request.post<any, any>(API.ADD_MENU_INFO, data)

//修改
export const updateMenuInfo = (data: any) => request.post<any, any>(API.UPDATE_MENU_INFO, data)

//删除
export const deleteMenu = (menuId: any) => request.post<any, any>(API.DELETE_MENU + menuId)

//日志表格列表
export const reqLogPage = (params: any) => request.get<any, any>(API.TABLE_LOG_PAGE_URL, { params: params })
