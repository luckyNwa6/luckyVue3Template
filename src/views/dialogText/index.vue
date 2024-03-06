<template>
  <div class="top">
    <div class="top-text">弹窗Hook测试：</div>
    <div>
      <el-button @click="dialogOpen">点击打开弹窗</el-button>
    </div>
    <div>
      <el-button @click="tipsOpen">点击打开提示</el-button>
    </div>
  </div>
  <div
    style="border: 1px solid rgba(0, 0, 0, 0.5); margin: 20px; padding: 10px"
  >
    <el-row>
      <el-col :span="8">
        <el-countdown title="Start to grab" :value="value" />
      </el-col>
      <el-col :span="8">
        <el-countdown
          title="Remaining VIP time"
          format="HH:mm:ss"
          :value="value1"
        />
      </el-col>
      <el-col :span="8">
        <el-countdown format="DD [days] HH:mm:ss" :value="value2">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              <el-icon style="margin-right: 4px" :size="12">
                <Calendar />
              </el-icon>
              Still to go until next month
            </div>
          </template>
        </el-countdown>
        <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
      </el-col>
    </el-row>
  </div>
  <div style="display: flex; width: 100%; justify-content: center">
    <div ref="charts" id="charts" style="width: 800px; height: 400px"></div>
  </div>
  <div></div>

  <div>
    <el-dialog v-model="dialogVisible" :before-close="dialogCancel">
      <div>
        <div>弹窗内容</div>
        <div>
          <!-- 带校验表单 -->
          <el-form
            ref="testForm"
            label-width="auto"
            :model="dynamicValidateForm"
          >
            <el-form-item prop="email" label="Email" :rules="EmailRules">
              <el-input v-model="dynamicValidateForm.email" />
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              :label="'Domain' + index"
              :prop="'domains.' + index + '.value'"
              :rules="domainRules"
            >
              <el-input v-model="domain.value" />
              <el-button class="mt-2" @click.prevent="removeDomain(domain)">
                Delete
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(testForm)">
                Submit
              </el-button>
              <el-button @click="addDomain">New domain</el-button>
              <el-button @click="resetForm(testForm)">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button @click="dialogClose">关闭按钮</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
// import {
//   reactive,
//   ref,
//   onMounted,
//   onBeforeMount,
//   getCurrentInstance,
//   nextTick
// } from 'vue'
import useDialog from '@/hooks/useDialog'
import type { FormInstance } from 'element-plus'
import useChart from '@/hooks/useChart'
import dayjs from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'
import { useMessage } from '@/hooks/web/useMessage'
const testForm = ref<FormInstance>()
const value = ref(Date.now() + 1000 * 60 * 60 * 7)
const value1 = ref(Date.now() + 1000 * 60 * 60 * 2)
const value2 = ref(dayjs().add(1, 'month').startOf('month'))

interface DomainItem {
  key: number
  value: string
}

// 表单数据
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

// 校验规则
const EmailRules = reactive([
  {
    required: true,
    message: 'Please input email address',
    trigger: 'blur',
  },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur', 'change'],
  },
])
const domainRules = reactive({
  required: true,
  message: 'domain can not be null',
  trigger: 'blur',
})

const changeForm = () => {
  console.log('传入hook的初始化表单数据函数')
}

const changeEventBus = (e: any) => {
  console.log('接收eventbus', e)
}

// hook解构
let { dialogVisible, dialogOpen, dialogClose, dialogCancel } = useDialog(
  testForm,
  {
    initFormData: changeForm,
  },
)

// 解构msg
let { info, error, confirm } = useMessage()
let tipsOpen = () => {
  confirm('需要点击确认', '这是确认提示')
    .then(() => {
      // console.log('点击确认')
      info('这是点击确认提示')
    })
    .catch(() => {
      // console.log('点击取消')
      error('这是点击取消提示')
    })
}

// 表单操作
const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 监听/释放eventBus
// onMounted(() => {
//   window.$bus.on('dialogCancel', changeEventBus)
// })
// onBeforeMount(() => {
//   window.$bus.off('dialogCancel', changeEventBus)
// })
const { mountedChart } = useChart()
let chart = null
const chartId = 'charts'
// 初始化数据并挂载图表
let tocharts = ref(null)
onMounted(() => {
  initCharts()
  console.log('页面渲染')
  nextTick(() => {
    console.log('页面渲染222')
    mountedChart(chartId, (tocharts) => {
      console.log('触发hook图表初始化')
      // await initData();
    })
  })
})

const internalInstance = getCurrentInstance()
const echarts = internalInstance?.appContext.config.globalProperties.$echarts
const initCharts = () => {
  const dom = document.getElementById('charts')
  const myChart = echarts.init(dom)
  tocharts.value = myChart
  const option = {
    title: {
      text: 'Distribution of Electricity',
      subtext: 'Fake Data',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      data: [
        'MonVIP',
        'TueVIP',
        'WedVIP',
        'ThuVIP',
        'FriVIP',
        'SatVIP',
        'SunVIP',
      ],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} h',
      },
      axisPointer: {
        snap: true,
      },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          gt: 0,
          lte: 1,
          color: 'green',
        },
        {
          gt: 1,
          lte: 3,
          color: 'red',
        },
        {
          gt: 3,
          lte: 5,
          color: 'green',
        },
        {
          gt: 5,
          lte: 6,
          color: 'red',
        },
      ],
    },
    series: [
      {
        data: [666, 888, 555, 555, 555, 777, 999],
        type: 'line',
        smooth: true,
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)',
          },
          data: [
            [
              {
                name: 'Down Peak',
                xAxis: 'TueVIP',
              },
              {
                xAxis: 'WedVIP',
              },
            ],
            [
              {
                name: 'Up Peak',
                xAxis: 'FriVIP',
              },
              {
                xAxis: 'SatVIP',
              },
            ],
          ],
        },
      },
    ],
  }
  // 设置实例参数
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &-text {
    margin-right: 20px;
  }
}

.el-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>
