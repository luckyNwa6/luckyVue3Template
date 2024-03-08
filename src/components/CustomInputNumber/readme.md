# 自定义数字输入框

## 作者

- 公共研发组前端 陈海上

## 使用

```vue
<template>
  <CustomInputNumber v-model="value" min="1" max="100" precision="2" step="0.1" size="small" />
</template>

<script setup>
import CustomInputNumber from '@/components/CustomInputNumber.vue';

const value = ref(0);
</script>
```

## 属性

- modelValue（必填）：输入框的模型值。
- min：允许的最小值（默认：负无穷）。
- max：允许的最大值（默认：正无穷）。
- precision：要保留的小数位数（默认：0）。
- step：增加或减少值的步长（默认：1）。
- size：输入框的大小（默认：'default'）。

## 事件

- update:modelValue：当输入值发生变化时触发。

## 方法

- handleControl(type: string)：处理减号和加号按钮的点击事件。

## 注意事项

- 输入限制为正数。
- 输入值舍入到指定的小数位数。
- 输入值限制在指定的最小和最大值之间。
