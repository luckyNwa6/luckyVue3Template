<template>
  <el-input
    v-model="inputValue"
    class="flex-1 custom-input-number"
    @blur="handleBlur"
    @input="limitInput"
    :size="size"
  >
    <el-button
      :size="size"
      :class="[inputValue <= min ? 'cursor-not-allowed' : '']"
      icon="el-icon-minus"
      @click="handleControl('minus')"
    />
    <template #prepend>
      <el-button
        :size="size"
        :class="[inputValue <= min ? 'cursor-not-allowed' : '']"
        icon="el-icon-minus"
        @click="handleControl('minus')"
      />
    </template>
    <template #append>
      <el-button
        :size="size"
        :class="[inputValue >= max ? 'cursor-not-allowed' : '']"
        icon="el-icon-plus"
        @click="handleControl('plus')"
      />
    </template>
  </el-input>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '0',
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  precision: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  size: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits(['update:modelValue', 'update:myModel2'])

let inputValue = ref(props.modelValue)

watch(
  () => inputValue.value,
  (value) => {
    emit('update:modelValue', value + '')
  },
  { immediate: true },
)

// const modelValue = ref(props.modelValue);

/**
 * 限制输入为正数，且最多保留指定位数的小数，并更新模型值。
 *
 * @param {number} value - 输入的值
 */
const limitInput = (value) => {
  let valueNumber = processValue(value)
  if (!String(valueNumber).endsWith('.')) {
    if (valueNumber > props.max) {
      valueNumber = props.max
    } else if (valueNumber < props.min) {
      valueNumber = props.min
    }
  }
  inputValue.value = valueNumber
}

/**
 * 处理减号和加号按钮的点击事件。
 *
 * @param {string} type - 操作类型，'minus' 表示减号，'plus' 表示加号
 */
const handleControl = (type) => {
  let value = Number(inputValue.value)
  const STEP = props.step

  if (type === 'minus' && value > props.min) {
    value = processStep(value, -STEP, props.min)
  } else if (type === 'plus' && value < props.max) {
    value = processStep(value, STEP, props.max)
  }

  limitInput(value)
}

/**
 * 处理步进操作的函数，确保不超过最大和最小值，并保留指定位数的小数。
 *
 * @param {number} value - 当前值
 * @param {number} step - 步进值
 * @param {number} boundary - 边界值，最大或最小值
 * @returns {number} - 处理后的值
 */
const processStep = (value, step, boundary) => {
  const precision = 10000
  let result = (value * precision + step * precision) / precision
  if (step > 0) {
    result = result < boundary ? result : boundary
  } else {
    result = result > boundary ? result : boundary
  }
  return result
}

/**
 * 输入框失去焦点时的处理函数，确保输入框内容为数字或为空。
 */
const handleBlur = () => {
  inputValue.value = inputValue.value ? Number(inputValue.value) : ''
}

/**
 * 处理输入值的函数，确保输入为整数且最多保留指定位数的小数。
 *
 * @param {string} value - 输入的值
 * @returns {string} - 处理后的值
 */
const processValue = (value) => {
  const valueStr = value + ''
  let valueNumber = valueStr

  // if (!regex.test(valueStr)) {
  // 移除非数字和小数点
  valueNumber = valueStr.replace(/[^0-9.-]/g, '')

  // 移除开头多余的零
  valueNumber = valueNumber.replace(/^0+(?=\d)/, '')

  // 移除数字末尾以及多余的负号
  valueNumber = valueNumber.replace(/(?!^)-/g, '')

  const decimalIndex = valueNumber.indexOf('.')
  if (decimalIndex !== -1) {
    valueNumber = processDecimal(valueNumber, decimalIndex)
  }

  // 移除末尾.0的触发条件需要讨论
  if (props.precision <= 1) {
    // 移除末尾的 .0
    valueNumber = valueNumber.replace(/\.0$/, '')
    // }
  }

  return valueNumber
}

/**
 * 处理小数部分的函数，确保最多保留指定位数的小数。
 *
 * @param {string} valueNumber - 带有小数的值
 * @param {number} decimalIndex - 小数点的索引位置
 * @returns {string} - 处理后的值
 */
const processDecimal = (valueNumber, decimalIndex) => {
  valueNumber = valueNumber.split('.').slice(0, 2).join('.')

  const precision =
    props.precision == 0 ? decimalIndex : decimalIndex + props.precision + 1
  valueNumber = valueNumber.slice(0, precision)
  return valueNumber
}
</script>
