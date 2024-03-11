<template>
  <el-card class="cue-card">
    <div
      class="cue-content"
      :style="{
        backgroundImage: 'url(' + getAssetsFile(backgroundImage) + ')',
      }"
    >
      <div class="cue-title">
        <img class="cue-icon" :src="getAssetsFile('img.png')" />
        <span>{{ cueTitle }}</span>
      </div>
      <div class="cue-text">
        {{ changeFourFaithText(cueText) }}
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PromptContent',
}
</script>

<script setup>
import { defineProps } from 'vue'
import { changeFourFaithText } from '@/utils/helper'

defineProps({
  backgroundImage: {
    type: String,
    default: '',
  },
  cueTitle: {
    type: String,
    default: '提示语',
  },
  cueText: {
    type: String,
    default: '提示内容',
  },
})
// Methods
function getAssetsFile(imgName) {
  return new URL(`/src/assets/cue/${imgName}`, import.meta.url).href
}

// Return the reactive variables and methods
</script>

<style lang="scss" scoped>
.cue-card {
  margin-bottom: 10px;
}

:deep(.el-card__body) {
  padding: 0;

  .cue-content {
    padding: 2% 3%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: right center;

    .cue-title {
      font-size: 20px;
      font-family:
        Source Han Sans CN-Medium,
        Source Han Sans CN;
      font-weight: bold;
      color: #173456;
      display: flex;
      align-items: center;

      .cue-icon {
        margin-right: 12px;
      }
    }

    .cue-text {
      margin-top: 15px;
      width: 70%;
      font-family:
        Source Han Sans CN-Regular,
        Source Han Sans CN;
      font-size: 14px;
      color: #5a6782;
      line-height: 24px;
      letter-spacing: 1px;
    }
  }
}
</style>
