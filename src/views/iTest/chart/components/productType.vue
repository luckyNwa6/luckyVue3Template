<template>
  <el-card v-loading="showLoading" class="chart-card flex-1">
    <div class="header flex items-center justify-between">
      <div class="card-header-left flex items-center">
        <span class="w-4 h-4 mr-3">
          <img src="@/assets/home/ic_lx.png" class="w-full h-full" />
        </span>
        <span class="header-title">{{ comTitle }}</span>
      </div>
    </div>
    <div class="chart-content">
      <div v-if="chartData.length" id="productType" class="w-full h-full" />
      <el-empty v-else />
    </div>
  </el-card>
</template>

<script setup>
import useChart from '@/hooks/useChart'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { mountedChart } = useChart()
console.log('🚀 ~ mountedChart:', mountedChart)
const showLoading = ref(true)
const chart = ref(null)
const chartData = ref([
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' },
])

const comTitle = ref('标题')

onMounted(() => {
  mountedChart('productType', (chart) => {
    console.log('aaa')
    showLoading.value = false
    setChart(chart)
  })
})

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})

function setChart(chart) {
  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const { name, value, seriesName, percent, marker } = params
        return `${seriesName}<br />${marker} ${name}&emsp;${value} ${t('Units')}(${percent}%)`
      },
    },
    legend: {
      show: true,
      orient: 'vertical',
      left: 'left',
      data: chartData.value.map((item) => item.name),
    },
    series: [
      {
        name: t('Product type statistics'),
        type: 'pie',
        radius: ['45%', '80%'],
        data: chartData.value,
        color: ['#FAC858', '#507AFC', '#91CC75', '#283E81', '#93BEFF'],
        label: {
          show: true,
          formatter: ' {c}',
        },
      },
    ],
  })
}
</script>

<style lang="scss" scoped>
.header {
  .card-header-left {
    .w-4 {
      width: 4px;
    }
    .h-4 {
      height: 4px;
    }
    .mr-3 {
      margin-right: 0.75rem;
    }
  }
}

.chart-content {
  height: 260px;
}
</style>
