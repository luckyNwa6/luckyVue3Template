/// <reference types="vite/client" />

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    DICT_TYPE: any
    getDictDatas: any
  }
}
