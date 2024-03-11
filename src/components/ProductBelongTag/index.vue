<template>
  <div class="ff-tag plain" :class="ffTagClass">
    {{ productBelongName }}
  </div>
</template>

<script>
export default {
  name: 'ProductBelongTag',
}
</script>

<script setup>
const props = defineProps({
  productBelong: {
    type: String,
    default: '',
  },
  productBelongName: {
    type: String,
    default: '',
  },
})

const ffTagClass = computed(() => {
  const belongMap = {
    11: 'yellow',
    12: 'green',
    13: 'blue',
    14: 'cyan',
    15: 'skyblue',
    DTU: 'yellow',
    industrialRouter: 'green',
    smartGateway: 'blue',
    IPC: 'cyan',
    RTU: 'skyblue',
  }
  return belongMap[props.productBelong] || ''
})
</script>

<style lang="scss" scoped>
.ff-tag.plain {
  &.green {
    color: #91cc75;
    border-color: #91cc75;
  }

  &.blue {
    color: #507afc;
    border-color: #507afc;
  }

  &.yellow {
    color: #fac858;
    border-color: #fac858;
  }

  &.cyan {
    color: #283e81;
    border-color: #283e81;
  }

  &.skyblue {
    color: #93beff;
    border-color: #93beff;
  }
}
</style>
