<template>
  <div class="lang-select" :class="props.langSelectClass">
    <el-dropdown class="cursor-pointer" trigger="click" @command="handleLanguageChange">
      <div class="flex justify-center items-center px-5">
        <svg-icon :class="props.iconClass" class="language-icon" icon-class="language" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="appStore.language === 'zh'" command="zh">中文</el-dropdown-item>
          <el-dropdown-item :disabled="appStore.language === 'en'" command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import i18n from '@/lang'

import { useAppStore } from '@/store/modules/app.js'
// import { setLanguage } from '@/api/userManager'

const appStore = useAppStore()
const { locale } = useI18n()

const props = defineProps({
  langSelectClass: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
  needSetLangToRemoteServe: {
    type: Boolean,
    default: false,
  },
})

async function handleLanguageChange(lang) {
  locale.value = lang
  i18n.global.locale.value = lang
  console.log('🚀 ~ handleLanguageChange ~ lang:', lang)

  // try {
  //   if (props.needSetLangToRemoteServe) {
  //     await setLanguage({ tenantLanguage: lang })
  //   }
  appStore.changeLanguage(lang)

  //   ElMessage({
  //     message: i18n.global.t('navbar.switchLanguageSuccess'),
  //     type: 'success',
  //     duration: 1500,
  //     // onClose: () => {
  //     //   window.location.reload();
  //     // }
  //   })
  // } catch (error) {
  //   ElMessage({
  //     message: i18n.global.t('navbar.switchLanguageFailure'),
  //     type: 'error',
  //     duration: 1500,
  //   })
  // }
}
</script>
<style lang="scss" scoped>
.lang-select {
  width: 100%;
  display: flex;
  justify-content: center;
}
.language-icon {
  color: #000;
  font-size: 18px;
}
</style>
