//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout, reqNavInfo } from '@/api/sys/user'
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/sys/user/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
import { cloneDeep } from 'lodash-es'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      console.log('🚀 ~ userLogin ~ result:', result)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code === 0) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.token as string
        //本地存储持久化存储一份
        SET_TOKEN(result.token as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      // console.log('获取用户信息')

      const result: userInfoResponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 0) {
        this.username = result.user.nickname || 'lucky'
        this.avatar = result.user.headUrl
        const nav = await reqNavInfo()
        this.buttons = nav.permissions //返回这种   "sys:menu:delete",数组
        // 用于存放去重后的 routes 值
        const uniqueRoutes: any = []
        // 循环遍历 routes 数组
        nav.menuList.forEach((item: any) => {
          if (item.routes) {
            uniqueRoutes.push(item.routes)
          }
          item.list.forEach((subItem: any) => {
            if (subItem.routes) {
              uniqueRoutes.push(subItem.routes)
            }
          })
        })

        const userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), uniqueRoutes)

        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        console.log('🚀 ~ userInfo ~ this.menuRoutes:', this.menuRoutes)
        // console.log('🚀 ~ userInfo ~ this.menuRoutes:', this.menuRoutes)
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        console.log('🚀 ~ 获取到的路由地址 router:', router.getRoutes())
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code === 0) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error('退出登录失败！'))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
