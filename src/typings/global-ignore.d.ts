//下面这4行解决了@语法会爆红的问题
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{ any }, { any }, any>
  export default vueComponent
}
//声明解决爆红
declare interface Window {
  jQuery: any
  $: any
  TAC: any
  lucky: any
  bus: any
}

// declare module 'lodash' //声明.防止爆红,不再声明可以用注释 //@ts-expect-error 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus/dist/locale/en.mjs'
declare module 'vue3-baidu-map-gl'
declare const lucky: any
