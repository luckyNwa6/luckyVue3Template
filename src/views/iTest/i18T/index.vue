<template>
  <div>
    i18测试
    <el-input v-model="filterText" :placeholder="$t('role')" />
    <el-button :plain="true" @click="exitLogin">注销</el-button>
  </div>
</template>

<script setup>
import useExitLogin from '@/hooks/useExitLogin'
const { exitLogin } = useExitLogin()
const filterText = ref('')
</script>

<style lang="scss" scoped></style>
