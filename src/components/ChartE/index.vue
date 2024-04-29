<template>
  <div><div ref="elRef" :style="styles"></div></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { isString } from '@/utils/is'
const elRef = ref()

let echartRef = null

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  width: {
    type: [Number, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: '500px',
  },
})

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height,
  }
})

const initChart = () => {
  if (unref(elRef) && props.options) {
    echartRef = echarts.init(unref(elRef))
    echartRef?.setOption(unref(props.options))
  }
}

watch(
  () => props.options.value,
  options => {
    if (echartRef) {
      echartRef?.setOption(options)
    }
  },
  {
    deep: true,
  }
)
// 窗口自适应并开启过渡动画
const resize = () => {
  lucky.purple(' 分辨率发生了变化😎图表将自适应')

  if (echartRef) {
    echartRef.resize({ animation: { duration: 300 } })
  }
}
// 自适应防抖优化----来自@vueuse/core
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

onMounted(() => {
  initChart()
  nextTick(() => {
    lucky.purple('Dom渲染完毕😎绑定监听！')
    window.addEventListener('resize', debouncedResize)
  })
})

onBeforeUnmount(() => {
  lucky.purple('组件即将卸载😎清理之前的绑定监听！')

  if (echartRef.value) {
    echartRef.value.dispose()
    echartRef.value = null
    window.removeEventListener('resize', debouncedResize)
  }
})
</script>

<style lang="scss" scoped></style>
