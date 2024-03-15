<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import { useAppStore } from '@/store/modules/app.js'
const appStore = useAppStore()

console.log('ep的语言为：', appStore.locale.name)
</script>

<style lang="sass" scoped></style>
