<template>
  <div>
    i18测试

    <el-input v-model="filterText" :placeholder="$t('role')" />
  </div>
</template>

<script setup>
const { t } = useI18n() // 国际化
let filterText = ref('')
</script>

<style lang="scss" scoped></style>
