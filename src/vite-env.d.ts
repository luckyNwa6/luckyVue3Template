/// <reference types="vite/client" />

//下面这4行解决了@语法会爆红的问题
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{ any }, { any }, any>
  export default vueComponent
}

declare module 'lodash' //声明.防止爆红
