<template>
  <div class="flex justify-center items-center mt-20">
    <div
      class="w-360 h-50 bg-white shadow shadow-black rounded-5 p-5 flex"
      :style="{ background: color }"
    >
      <div class="text-4xl text-white text-center w-360">UnoCSS</div>
    </div>
  </div>
  <div class="p-20">
    取色器
    <div class="mt-10">
      <el-color-picker v-model="color" show-alpha />
    </div>
  </div>
</template>
<script lang="ts" setup>
let color = ref('rgba(19, 206, 102, 0.8)')
</script>
<style lang="scss" scoped>
::v-deep .el-color-picker__trigger {
  width: 200px !important;
  height: 100px !important;
}
</style>
