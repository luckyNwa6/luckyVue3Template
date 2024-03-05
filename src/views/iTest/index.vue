<template>
  <div>
    i18测试

    <el-input v-model="filterText" :placeholder="t("action.add")" />
  </div>
</template>

<script setup>
let filterText = ref('')
</script>

<style lang="scss" scoped></style>
