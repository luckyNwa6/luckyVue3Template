//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  acc: string
  captcha: string
  openCaptcha: boolean
  pwd: string
  uuid: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  msg: string
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  luckyToken: string
  data: string
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
