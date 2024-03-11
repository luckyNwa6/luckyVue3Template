<template>
  <!-- <el-tag :class="customTagClass" :type="customTagType">
    {{ customTagText }}
  </el-tag> -->
  <div class="ff-tag" :class="ffTagClass">
    {{ customTagText }}
  </div>
</template>

<script>
export default {
  name: 'device-tag',
}
</script>

<script setup>
import i18n from '@/lang'

const props = defineProps({
  statusData: {
    type: Number,
    default: 0,
  },
})

const ffTagClass = computed(() => {
  const status = props.statusData
  const statusMap = {
    1: 'success',
    2: 'danger',
    0: 'info',
  }
  return statusMap[status] || ''
})

const customTagText = computed(() => {
  const status = props.statusData
  const textMap = {
    1: i18n.global.t('page.online'),
    2: i18n.global.t('page.offLine'),
    0: i18n.global.t('page.unactivated'),
  }
  return textMap[status] || ''
})
</script>
