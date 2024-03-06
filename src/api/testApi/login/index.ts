import request from '@/utils/request'
enum API {
  LOGIN_URL = '/idpSys/login',
}

export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)
