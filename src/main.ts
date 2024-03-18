import { createApp } from 'vue'
import App from '@/App.vue'
import { isDevMode } from '@/utils/env'
import ElementPlus from 'element-plus'

//样式---------------------------------
import '@/styles/index.scss' //重置样式
import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' //暗黑模式需要的样式

//系统配置---------------------------------
import './permisstion' //引入路由鉴权文件
import 'virtual:svg-icons-register' //导入svg插件，去阿里图标库，选择icon，copy它的Svg代码,并放到本项目的icons下，起个名字放入
import router from '@/router/index' //引入路由
import pinia from './store' //引入仓库
import i18n from '@/lang/index' // 国际化
import ElementPlusIconsVue from '@/components' //全局注册ep图标

//全局工具类---------------------------------
import { DICT_TYPE } from '@/utils/dict'
import { getDictDatas } from '@/utils/dict'

//特殊配置声明---------------------------------
import $ from 'jquery'
window.jQuery = $
window.$ = $

// 本地开发模式 全局引入 element-plus 样式，加快第一次进入速度
if (isDevMode()) {
  import('element-plus/dist/index.css')
}

//获取应用实例对象---------------------------------
const app = createApp(App)

app.use(ElementPlusIconsVue)

//引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)

//工具类挂载
app.config.globalProperties.DICT_TYPE = DICT_TYPE
app.config.globalProperties.getDictDatas = getDictDatas

app
  .use(router) //注册模板路由
  .use(i18n) //中英切换
  .use(ElementPlus) //安装element-plus插件
  .use(pinia) //安装仓库
  .mount('#app') //将应用挂载道节点上
