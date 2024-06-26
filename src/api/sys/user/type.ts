//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  captcha: string
  openCaptcha: boolean
  password: string
  uuid: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  msg: string
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  token: string
  data: string
}

//定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  user: {
    userId: number
    username: string
    password: string
    salt: string
    email: string
    mobile: string
    status: number
    roleIdList: null
    createUserId: number
    createTime: string
    openId: string
    headUrl: string
    age: number
    sex: string
    nickname: string
  }
}
