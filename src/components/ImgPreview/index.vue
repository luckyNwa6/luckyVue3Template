<template>
  <div class="img-viewer-box">
    <el-image-viewer
      v-if="state.visible"
      :url-list="props.imgs"
      @close="close"
    />
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  imgs: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['update:modelValue']);

const state = reactive({
  imgList: [],
  // 相当于是set 与 get
  visible: useVModel(props, 'modelValue', emits)
});

// 点击关闭的时候，连同小图一起关闭
function close() {
  state.visible = false;
}
</script>
