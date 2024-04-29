<!-- 部分页面的公共同步组件 -->
<template>
  <div>
    <div class="head-content" :class="[customClass]">
      <div class="logo-content flex text-center">
        <template v-if="showName">
          <img v-if="showLogo" class="ss-logo" :src="logo" alt="" />
          <div v-if="title" class="ml-3">
            <span class="text-lg logo-text">{{ headTitle }}</span>
          </div>
        </template>
      </div>
      <template v-if="showLanguage">
        <LangSelect langSelectClass="lang-select" />
      </template>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/lang'
import logoImg from '@/assets/sx_logo.png'

// Props
const props = defineProps({
  showLanguage: {
    type: Boolean,
    default: true,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  showName: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: logoImg,
  },
  title: {
    type: String,
    default: 'platforms.title',
  },
})

// Computed
const headTitle = computed(() => {
  return import.meta.env.VITE_APP_NODE_ENV === 'productionByEn' ? 'IOT Platform' : i18n.global.t(props.title)
})
</script>
<style lang="scss" scoped>
.head-content {
  display: flex;
  padding: 4% 16% 0 11%;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  .ss-logo {
    width: 44px;
    height: 26px;
  }

  .logo-text {
    font-size: 25px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #ffffff;
  }
}

:deep(.el-select) {
  width: 90px;
}

:deep(.head-content) {
  .el-input__wrapper {
    background: inherit;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }

  .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
    &:hover {
      box-shadow: none !important;
    }
  }

  .el-input__wrapper.is-focus {
    box-shadow: none !important;
    &:hover {
      box-shadow: none;
    }
  }
  .is-focus {
    box-shadow: none;
  }
  .el-select {
    .el-input__inner {
      color: #606266;
    }
  }

  .el-icon-arrow-up:before {
    color: #63bbf1 !important;
  }
}

:deep(.lang-select) {
  display: unset;
  width: unset;
}
</style>
