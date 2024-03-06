import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount } from 'vue'

export default function useChart() {
  let chart: echarts.ECharts | null = null

  /**
   * 调用图表调整大小函数。
   *
   * @param {string} chartId - 图表元素的ID。
   * @param {function} onResize - 调整大小时要执行的回调函数。
   * @param {function} cb - 在界面上初始化表格数据的回调函数。
   */
  function callChartIntAndResize(
    chartId: string,
    onResize: () => void,
    cb: (chart: echarts.ECharts) => void,
  ) {
    onMounted(() => {
      if (chart) {
        chart.dispose()
        chart = null
      }
      setTimeout(() => {
        if (document.getElementById(chartId)) {
          chart = echarts.init(document.getElementById(chartId)!)
          // 回调用于界面去初始化表格数据
          cb(chart!)
        }
      }, 0)

      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })
  }

  /**
   * 刷新并触发图表。
   *
   * 可在click中调用此方法来显示图表
   * @param {function} cb - 用于界面初始化表格数据的回调函数
   * @param {string} chartId - 图表元素的ID
   * @return {void}
   */
  function refreshAndTriggerChart(
    cb: (chart: echarts.ECharts) => void,
    chartId: string,
  ) {
    if (chart) {
      chart.dispose()
      chart = null
    }

    setTimeout(() => {
      if (document.getElementById(chartId)) {
        chart = echarts.init(document.getElementById(chartId)!)
        // 回调用于界面去初始化表格数据
        cb(chart!)
      }
    }, 0)
  }

  function mountedChart(chartId: string, cb: (chart: echarts.ECharts) => void) {
    callChartIntAndResize(
      chartId,
      () => {
        chart && chart.resize()
      },
      cb,
    )

    onBeforeUnmount(() => {
      if (chart) {
        chart.dispose()
        chart = null
      }
    })
  }

  return {
    mountedChart,
    refreshAndTriggerChart,
  }
}
