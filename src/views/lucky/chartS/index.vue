<template>
  <el-card>
    <div id="lucky_chart" style="width: 100%; height: 470px"></div>
  </el-card>
  <!-- <el-card class="m-6">
    <ChartE :options="lineOptionsData" />
  </el-card> -->
  <!-- <el-card>
    <ChartE :options="pieOptionsData" />
  </el-card> -->
</template>

<script setup>
import { onMounted } from 'vue'
import dataZoom from './common/dataZoom'
import { lineOptions, pieOptions } from './common/data'
import _ from 'lodash-es'
import * as echarts from 'echarts'

let myChart = ref(null)
let xLabel = ref(null)
let dataValue = ref(null)
let dataValue1 = ref(null)
let dataValue2 = ref(null)
let lineOptionsData = reactive(lineOptions)
let pieOptionsData = reactive(pieOptions)

onMounted(() => {
  initLuckyChar()
  nextTick(() => {
    window.addEventListener('resize', debouncedResize)
  })
})

onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.dispose()
    myChart.value = null
    window.removeEventListener('resize', debouncedResize)
  }
})

// 窗口自适应并开启过渡动画
const resize = () => {
  if (myChart.value) {
    myChart.value.resize({ animation: { duration: 300 } })
  }
}

// 自适应防抖优化----来自@vueuse/core
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

const initLuckyChar = () => {
  xLabel.value = ['8:05', '8:10', '8:15', '8:25', '8:30', '8:35', '8:40', '8:45', '8:55', '9:00', '9:05', '9:10'] //x轴数据
  dataValue.value = [120, 130, 140, 135, 134, 115, 156, 115, 112, 215, 134, 142] //y轴数据1
  dataValue1.value = [1.0, 3.0, 2.0, 1.0, 3, 1, 2, 3.2, 4.5, 5.0, 4.3, 3] //y轴数据2
  dataValue2.value = [3, 6, 7, 15, 8, 5, 2, 5, 4, 2, 10, 3] //y轴数据3

  let option = {
    dataZoom: _.cloneDeep(dataZoom.dataZoom),
    color: ['#a5c5d4', '#91CC75', '#EE6666'],
    tooltip: {
      //悬浮放上面的提示
      trigger: 'axis', //坐标轴触发
      axisPointer: {
        type: 'line', //直线指示器
      },
    },
    grid: {
      right: '20%', //echarts离容器左侧的距离
    },
    toolbox: {
      //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
      feature: {
        dataView: { show: true, readOnly: false }, //数据视图
        restore: { show: true }, //重置
        saveAsImage: { show: true }, //下载
      },
    },
    legend: {
      //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
      data: ['浊度', 'PH', '水温'], //就是图表上面正中间那3，点击某个某个就能隐藏
    },
    xAxis: [
      {
        type: 'category', //类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据
        boundaryGap: false, //false从0开始,最少x会放0位置
        axisTick: {
          //坐标轴刻度|和数据是对齐的，加上这个
          alignWithLabel: true,
        },
        // prettier-ignore
        data: xLabel.value, //x轴数据
      },
    ],
    yAxis: [
      //直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
      {
        type: 'value', //适用于连续数据
        name: '浊度（ntu）', //坐标轴名称
        position: 'left', //左边
        alignTicks: true, //开启该配置项自动对齐刻度
        min: 0, //初始
        max: 1000, //结束值
        interval: 200, //间距   如果没这3，会自适应数据
        axisLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: '#a5c5d4', //颜色
          },
        },
        splitLine: {
          //隐藏纵轴的横线
          show: true, //展示
          lineStyle: {
            color: '#DCDFE6 ', //虚线颜色
            type: 'dashed', //虚线
          },
        },
        axisLabel: {
          //纵轴文字,就是0 200 400 600 800 1000
          show: true,
          formatter: '{value} ',
        },
      },
      {
        type: 'value', //适用于连续数据
        name: 'PH',
        position: 'right', //右边
        alignTicks: true, //开启该配置项自动对齐刻度
        min: 0, //初始
        max: 14, //结束值
        interval: 3, //间距   如果没这3，会自适应数据
        splitLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: '#1160a0',
            type: 'solid', //实体线
          },
        },
        axisLine: {
          //纵轴文字,就是0 3 6 9 12 14
          show: false,
          lineStyle: {
            color: '#91CC75',
          },
        },
        axisLabel: {
          formatter: '{value} ',
        },
      },
      {
        type: 'value',
        name: '水温（°C）',
        show: true, // 添加该配置来隐藏水温纵轴
        position: 'right',
        alignTicks: true,
        min: 0,
        max: 100,
        interval: 20,
        offset: 80, //向右偏移80
        axisLine: {
          show: false, //y轴|  是否显示
          lineStyle: {
            color: '#EE6666',
          },
        },
        splitLine: {
          //隐藏纵轴的横线
          show: false,
          lineStyle: {
            color: '#DCDFE6 ',
            type: 'dashed',
          },
        },
        axisLabel: {
          //纵轴文字
          formatter: '{value} ',
        },
      },
    ],
    series: [
      //数据
      {
        name: '浊度',
        type: 'line', //折线
        symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true, //是否平滑
        color: '',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#bed4e5',
                },
                {
                  offset: 0.6,
                  color: '#aac8d9',
                },
                {
                  offset: 1,
                  color: '#9dbec9',
                },
              ],
              false
            ),
          },
        },
        data: dataValue.value,
      },
      {
        name: 'PH',
        type: 'line',
        yAxisIndex: 1, //默认是0就左边那个y轴，1是右边第一个
        data: dataValue1.value,
      },
      {
        name: '水温',
        type: 'line',
        symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        yAxisIndex: 2,
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#c1a3aa',
                },
                {
                  offset: 0.6,
                  color: '#b19aa3',
                },
                {
                  offset: 1,
                  color: '#a78c95',
                },
              ],
              false
            ),
          },
        },
        data: dataValue2.value,
      },
    ],
  }

  myChart.value = markRaw(echarts.init(document.getElementById('lucky_chart')))
  myChart.value.setOption(option, true)
}
</script>

<style lang="scss" scoped></style>
