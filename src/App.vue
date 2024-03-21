<template>
  <div>
    <el-config-provider :locale="appStore.locale" :size="appStore.size">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import { useAppStore } from '@/store/modules/app.js'
const appStore = useAppStore()

lucky.star('初始化的语言为：', appStore.locale.name)
</script>

<style lang="sass" scoped></style>
