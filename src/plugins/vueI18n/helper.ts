// 导出一个函数，用于设置html页面的语言
export const setHtmlPageLang = (locale: LocaleType) => {
  // 获取html元素
  document.querySelector('html')?.setAttribute('lang', locale)
}
