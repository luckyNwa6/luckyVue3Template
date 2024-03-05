import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import type { I18n, I18nOptions } from 'vue-i18n'
import { setHtmlPageLang } from './helper'

// 声明一个变量i18n，用于存储createI18n函数的返回值
export let i18n: ReturnType<typeof createI18n>

// 创建一个异步函数createI18nOptions，用于获取I18nOptions
const createI18nOptions = async (): Promise<I18nOptions> => {
  // 获取当前语言
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getCurrentLocale
  const localeMap = localeStore.getLocaleMap
  // 加载默认语言文件
  const defaultLocal = await import(`../../locales/${locale.lang}.ts`)
  const message = defaultLocal.default ?? {}

  // 设置html页面语言
  setHtmlPageLang(locale.lang)

  // 更新当前语言
  localeStore.setCurrentLocale({
    lang: locale.lang,
    // elLocale: elLocal
  })

  // 返回I18nOptions
  return {
    legacy: false,
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message,
    },
    availableLocales: localeMap.map((v) => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

// 导出一个异步函数setupI18n，用于初始化i18n
export const setupI18n = async (app: App<Element>) => {
  // 获取I18nOptions
  const options = await createI18nOptions()
  // 初始化i18n
  i18n = createI18n(options) as I18n
  // 添加i18n到app
  app.use(i18n)
}
