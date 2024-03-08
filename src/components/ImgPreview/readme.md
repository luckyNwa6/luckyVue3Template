# ImgPreview 组件

## 作者

- 公共研发组前端 周晓鹏

## 概述

`ImgPreview` vue3 组件（el-image-viewer 二次封装）用于显示图片查看器。

## 使用示例

```vue
<template>
  <div>
    <ImgPreview v-model="showImg" :imgs="[sourceList]" />
  </div>
</template>

<script setup>
// 引入 ImgViewerBox 组件
import ImgPreview from '@/components/ImgPreview.vue';

// 组件的状态和属性
const showImg = ref(false);
const imageList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
  // ... 其他图片链接
]);
</script>
```

## 属性

| 属性名    | 类型    | 默认值  | 描述                          |
| --------- | ------- | ------- | ----------------------------- |
| `v-model` | Boolean | `false` | 控制图片查看器的显示与隐藏    |
| `imgs`    | Array   | `[]`    | 图片列表，包含图片的 URL 地址 |
