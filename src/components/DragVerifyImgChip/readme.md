# vue3 滑动验证模块

- 基于 drag-verify-img-chip

## Warpper 作者

- 公共研发组前端 周晓鹏

## 使用

```vue
<template>
  <el-dialog v-model="dialogVisible" width="400px" :append-to-body="true" :close-on-click-modal="false" :before-close="dialogCancel" :title="$t('login.dragVerify.title')">
    <div class="verify-box">
      <drag-verify-img-chip ref="dragVerifyImgChipRef" :imgsrc="img" :width="360" v-model:isPassing="isPassing" :showRefresh="true" :showTips="true" :text="$t('login.dragVerify.text')" :success-tip="$t('login.dragVerify.successTip')" :successText="$t('login.dragVerify.successText')" :fail-tip="$t('login.dragVerify.failTip')" :success-icon="CircleCheckFilled" :handler-icon="DArrowRight" handler-bg="#ccc" />
    </div>
  </el-dialog>
</template>
<script setup>
import DragVerifyImgChip from '@/components/DragVerifyImgChip/index.vue';

import { DArrowRight, CircleCheckFilled } from '@element-plus/icons-vue';

import useDialog from '@/hooks/useDialog';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';

const isPassing = ref(false);
const imgIndex = ref(0);
const img = ref('');
const dragVerifyImgChipRef = ref('dragVerifyImgChipRef');
const { dialogClose, dialogOpen, dialogVisible, dialogCancel } = useDialog(null, { emitName: 'dragVerify' });

const imgSrc = populateImgSrc();
const props = defineProps({});

onMounted(() => {
  img.value = imgSrc[imgIndex.value];
  window.$bus.on('passfail', passFall);
  window.$bus.on('passcallback', pass);
  window.$bus.on('refresh', refreshImg);
});

onUnmounted(() => {
  window.$bus.off('passfail');
  window.$bus.off('passcallback');
  window.$bus.off('refresh');
});

function populateImgSrc() {
  const imgSrc = {};

  for (let i = 1; i <= 12; i++) {
    imgSrc[`img${i}`] = new URL(`/src/assets/validImg/${i}.png`, import.meta.url).href;
  }
  return Object.values(imgSrc);
}

function handleOpen() {
  setTimeout(() => {
    dragVerifyImgChipRef.value.reset();
  }, 10);
  dialogOpen();
}

function pass() {
  setTimeout(() => {
    dialogClose({ success: isPassing.value });
  }, 100);
}

function refreshImg() {
  imgIndex.value = parseInt(Math.random() * 12);
  img.value = imgSrc[imgIndex.value];
}

function passFall() {
  refreshImg();
}
</script>
```

## 属性

| 属性                | 描述                                                  |
| ------------------- | ----------------------------------------------------- |
| `ref`               | 获取组件实例                                          |
| `imgsrc`            | 绑定图片地址的属性 (`img` 变量)                       |
| `width`             | 图片宽度，设置为 360                                  |
| `v-model:isPassing` | 双向绑定属性，用于标识是否验证通过 (`isPassing` 变量) |
| `showRefresh`       | 是否显示刷新按钮，设置为 `true`                       |
| `showTips`          | 是否显示提示文本，设置为 `true`                       |
| `text`              | 提示文本                                              |
| `success-tip`       | 验证成功的提示文本                                    |
| `successText`       | 验证成功时的文本提示                                  |
| `fail-tip`          | 验证失败的提示文本                                    |
| `success-icon`      | 验证成功时的图标组件，使用 `CircleCheckFilled` 组件   |
| `handler-icon`      | 滑块的图标组件，使用 `DArrowRight` 组件               |
| `handler-bg`        | 滑块背景颜色，设置为 `#ccc`                           |
