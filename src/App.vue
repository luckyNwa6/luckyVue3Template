<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
onMounted(() => {
  // 禁用复制
  // document.onselectstart = new Function('event.returnValue=false')
  //禁止f12
  document.οnkeydοwn = new Function('event.returnValue=false')
  // 上面的禁止f12那段代码没有生效，但是加了下面这段就能生效。
  // document.onkeydown = function (e) {
  //   if (e && e.keyCode === 123) {
  //     e.returnValue = false
  //     // e.keyCode = 0   //去掉也可以的，倘若要写，则需要setter 以及 getter配合使用，不配合，会报错
  //     return false
  //   }
  // }
})
</script>

<style>
* {
  user-select: none;
}
</style>
