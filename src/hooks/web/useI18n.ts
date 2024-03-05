import { i18n } from '@/plugins/vueI18n'

// 声明一个全局翻译类型
type I18nGlobalTranslation = {
  // 返回字符串
  (key: string): string
  // 返回字符串，并传入locale参数
  (key: string, locale: string): string
  // 返回字符串，并传入locale参数和list参数
  (key: string, locale: string, list: unknown[]): string
  // 返回字符串，并传入locale参数和named参数
  (key: string, locale: string, named: Record<string, unknown>): string
  // 返回字符串，并传入list参数
  (key: string, list: unknown[]): string
  // 返回字符串，并传入named参数
  (key: string, named: Record<string, unknown>): string
}

// 声明一个翻译参数类型
type I18nTranslationRestParameters = [string, any]

// 获取key
const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

// 导出一个函数，用于获取i18n
export const useI18n = (
  namespace?: string,
): {
  t: I18nGlobalTranslation
} => {
  // 声明一个正常函数
  const normalFn = {
    // 返回字符串
    t: (key: string) => {
      return getKey(namespace, key)
    },
  }

  // 如果没有i18n，则返回正常函数
  if (!i18n) {
    return normalFn
  }

  // 获取全局翻译和全局方法
  const { t, ...methods } = i18n.global

  // 声明一个全局翻译函数
  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    // 如果没有key，则返回空字符串
    if (!key) return ''
    // 如果没有.或者namespace，则返回key
    if (!key.includes('.') && !namespace) return key
    //@ts-expect-error返回全局翻译，并传入参数
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters))
  }
  // 返回全局翻译函数和全局方法
  return {
    ...methods,
    t: tFn,
  }
}

// 声明一个t函数
export const t = (key: string) => key
