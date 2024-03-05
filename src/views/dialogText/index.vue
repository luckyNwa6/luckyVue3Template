<template>
  <div class="top">
    <div class="top-text">弹窗Hook测试：</div>
    <div @click="dialogOpen">
      <el-button>点击打开弹窗</el-button>
    </div>
  </div>
  <div></div>
  <div></div>

  <div>
    <el-dialog v-model="dialogVisible" :before-close="dialogCancel">
      <div>
        <div>弹窗内容</div>
        <div>
          <!-- 带校验表单 -->
          <el-form
            ref="testForm"
            label-width="auto"
            :model="dynamicValidateForm"
          >
            <el-form-item prop="email" label="Email" :rules="EmailRules">
              <el-input v-model="dynamicValidateForm.email" />
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              :label="'Domain' + index"
              :prop="'domains.' + index + '.value'"
              :rules="domainRules"
            >
              <el-input v-model="domain.value" />
              <el-button class="mt-2" @click.prevent="removeDomain(domain)">
                Delete
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(testForm)">
                Submit
              </el-button>
              <el-button @click="addDomain">New domain</el-button>
              <el-button @click="resetForm(testForm)">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button @click="dialogClose">关闭按钮</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import useDialog from '@/hooks/useDialog'
import type { FormInstance } from 'element-plus'

const testForm = ref<FormInstance>()

interface DomainItem {
  key: number
  value: string
}

// 表单数据
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

// 校验规则
const EmailRules = reactive([
  {
    required: true,
    message: 'Please input email address',
    trigger: 'blur',
  },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur', 'change'],
  },
])
const domainRules = reactive({
  required: true,
  message: 'domain can not be null',
  trigger: 'blur',
})

const changeForm = () => {
  console.log('传入hook的初始化表单数据函数')
}

const changeEventBus = (e: any) => {
  console.log('接收eventbus', e)
}

// hook解构
let { dialogVisible, dialogOpen, dialogClose, dialogCancel } = useDialog(
  testForm,
  {
    emitName: 'testBus',
    initFormData: changeForm,
  },
)

// 表单操作
const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 监听/释放eventBus
// onMounted(() => {
//   window.$bus.on('dialogCancel', changeEventBus)
// })
// onBeforeMount(() => {
//   window.$bus.off('dialogCancel', changeEventBus)
// })
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  &-text {
    margin-right: 20px;
  }
}
</style>
