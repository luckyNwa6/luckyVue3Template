import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import defaultSettings from '@/setting'

// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

// setup
export const useAppStore = defineStore('app', () => {
  // state
  const device = useStorage('device', 'desktop')

  const size = useStorage('size', defaultSettings.size)
  // console.log('🚀初始化的 ~ useAppStore ~ defaultSettings.language:', defaultSettings.language)
  const language = useStorage('language', defaultSettings.language)
  // console.log('🚀初始化的 ~ useAppStore ~ language:', language)
  const sidebarStatus = useStorage('sidebarStatus', 'closed')
  const sidebar = reactive({
    opened: sidebarStatus.value !== 'closed',
    withoutAnimation: false,
  })
  // const documentTitle = useStorage('documentTitle', defaultSettings.title);
  document.title = defaultSettings.title
  const activeTopMenu = useStorage('activeTop', '')

  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value == 'en') {
      return en
    } else {
      return zhCn
    }
  })

  // actions
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
    if (sidebar.opened) {
      sidebarStatus.value = 'opened'
    } else {
      sidebarStatus.value = 'closed'
    }
  }

  function closeSideBar(withoutAnimation) {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
    sidebarStatus.value = 'closed'
  }

  function openSideBar(withoutAnimation) {
    sidebar.opened = true
    sidebar.withoutAnimation = withoutAnimation
    sidebarStatus.value = 'opened'
  }

  function toggleDevice(val) {
    device.value = val
  }

  function changeSize(val) {
    size.value = val
  }
  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val) {
    language.value = val
  }
  /**
   * 混合模式顶部切换
   */
  function changeTopActive(val) {
    activeTopMenu.value = val
  }
  return {
    device,
    sidebar,
    language,
    locale,
    size,
    activeTopMenu,
    toggleDevice,
    changeSize,
    changeLanguage,
    toggleSidebar,
    closeSideBar,
    openSideBar,
    changeTopActive,
  }
})
