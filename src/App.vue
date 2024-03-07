<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
onMounted(() => {
  // 禁用复制
  // document.onselectstart = new Function('event.returnValue=false')
})
</script>

<style>
* {
  user-select: none;
}
</style>
