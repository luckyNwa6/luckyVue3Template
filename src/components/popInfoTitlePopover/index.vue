<template>
  <el-popover
    :placement="placement"
    :width="width"
    :trigger="trigger"
    @hide="$emit('hide')"
  >
    <div class="custom-popover-title">
      <i-ep-InfoFilled />
      {{ title }}
    </div>
    <!-- 自定义内容插槽 -->
    <div class="custom-popover-content mt-3">
      <slot name="content" />
    </div>
    <!-- 触发元素插槽 -->
    <template #reference>
      <slot name="referenceDom" />
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'MyPopover',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    placement: {
      type: String,
      default: 'top'
    },
    width: {
      type: String || Number,
      default: '400'
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-popover-title {
  font-size: 14px;
  font-weight: bold;
  color: #475467;

  svg {
    font-size: 14px;
    color: #2e90fa;
  }
}
.custom-popover-content {
  max-height: 60vh;
  overflow: auto;
}
</style>
