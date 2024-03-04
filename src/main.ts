import { createApp } from 'vue'

import App from '@/App.vue'

import ElementPlus from 'element-plus'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
//引入路由
import router from '@/router/index'
import 'element-plus/dist/index.css'
//导入svg插件，去阿里图标库，选择icon，copy它的Svg代码,并放到本项目的icons下，起个名字放入
import 'virtual:svg-icons-register'
//引入仓库
import pinia from './store'
//获取应用实例对象
const app = createApp(App)
//引入自定义插件对象 全局注册  已经配置了组件的自动引入，而且是按需的，就不必这样了
// import gloablComponent from '@/components'
// app.use(gloablComponent)
//国际化配置
app.use(ElementPlus, {
  locale: zhCn,
})
//安装element-plus插件
app.use(ElementPlus)

// console.log(import.meta.env)

//测试mock  可以
// import axios from 'axios'
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111',
//   },
// })

//注册模板路由
app.use(router)
//安装仓库
app.use(pinia)
//将应用挂载道节点上

app.mount('#app')
