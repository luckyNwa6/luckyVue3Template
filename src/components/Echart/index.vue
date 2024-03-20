<template>
  <div ref="elRef" :style="styles"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'
import { isString } from '@/utils/is'
const elRef = ref()

let echartRef = null

const contentEl = ref()

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
  (options) => {
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
  if (echartRef.value) {
    echartRef.value.resize({ animation: { duration: 300 } })
  }
}
// 自适应防抖优化----来自@vueuse/core
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

onMounted(() => {
  initChart()
  nextTick(() => {
    console.log('cccccccccccczz')
    window.addEventListener('resize', debouncedResize)
  })
})

onBeforeUnmount(() => {
  if (echartRef.value) {
    echartRef.value.dispose()
    echartRef.value = null
    window.removeEventListener('resize', debouncedResize)
  }
})
</script>

<style lang="scss" scoped></style>
