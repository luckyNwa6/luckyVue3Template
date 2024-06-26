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
import baiduMap from 'vue3-baidu-map-gl' //百度地图
import { isHasButton } from '@/directive/has' //引入自定义指令文件
//全局工具类---------------------------------
import { DICT_TYPE } from '@/utils/dict'
import { getDictDatas } from '@/utils/dict'
import luckyLogPrint from '@/utils/luckyLogPrint'
import eventBus from '@/utils/eventBus'
//特殊配置声明---------------------------------
import $ from 'jquery'
// import * as echarts from 'echarts'
window.jQuery = $
window.$ = $
window.lucky = luckyLogPrint
window.bus = new eventBus()

// window.echarts = echarts
// 本地开发模式 全局引入 element-plus 样式，加快第一次进入速度
if (isDevMode()) {
  import('element-plus/dist/index.css')
}

//获取应用实例对象---------------------------------
const app = createApp(App)

app.use(ElementPlusIconsVue)

isHasButton(app)

//工具类挂载
app.config.globalProperties.DICT_TYPE = DICT_TYPE
app.config.globalProperties.getDictDatas = getDictDatas

// app.config.globalProperties.echarts = echarts
//百度地图配置
app.use(baiduMap, {
  // ak: 'YCdK22Org07KZW3sdYtsCcU3FIPLkHvB',
  ak: 'GJ8xyU5HNKcdm3ypQTUMQ6dVqMgUI75o',
  plugins: ['TrackAnimation'],
})

app
  .use(router) //注册模板路由
  .use(i18n) //中英切换
  .use(ElementPlus) //安装element-plus插件
  .use(pinia) //安装仓库
  .mount('#app') //将应用挂载道节点上

lucky.welcome()
