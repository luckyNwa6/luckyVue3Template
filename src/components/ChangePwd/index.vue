<!-- 修改密码 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    width="500px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="dialogClose"
    :title="$t('page.dialog.title.changePassword')"
  >
    <el-form ref="formRef" v-loading="submitLoading" label-width="auto" :model="formData" :rules="rules">
      <el-form-item :label="$t('page.dialog.oldPassword')" prop="password">
        <el-input v-model="formData.password" :type="oldPasswordShow" clearable :placeholder="$t('page.dialog.enterOldPassword')">
          <template #suffix>
            <span class="show-pwd cursor-pointer" @click="oldPasswordShow = oldPasswordShow ? '' : 'password'">
              <i class="ff-cloud-icon" :class="oldPasswordShow === 'password' ? 'clound-open-eye' : 'clound-close-eye'" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('page.dialog.newPassword')" prop="newPassword">
        <el-input v-model="formData.newPassword" :type="newPasswordShoww" clearable :placeholder="$t('page.dialog.enternewPassword')">
          <template #suffix>
            <span class="show-pwd cursor-pointer" @click="newPasswordShoww = newPasswordShoww ? '' : 'password'">
              <i class="ff-cloud-icon" :class="newPasswordShoww === 'password' ? 'clound-open-eye' : 'clound-close-eye'" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('page.dialog.confirmPassword')" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          :type="confirmPasswordShow"
          clearable
          :placeholder="$t('page.dialog.enterConfirmationPassword')"
        >
          <template #suffix>
            <span class="show-pwd cursor-pointer" @click="confirmPasswordShow = confirmPasswordShow ? '' : 'password'">
              <i class="ff-cloud-icon" :class="confirmPasswordShow === 'password' ? 'clound-open-eye' : 'clound-close-eye'" />
            </span>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="">
        <el-button :loading="submitLoading" @click="dialogCancel">
          {{ $t('page.Cancel') }}
        </el-button>
        <el-button :loading="submitLoading" type="primary" @click="submit">
          {{ $t('page.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

import { useI18n } from 'vue-i18n'
import { valid_9, validatenull } from '@/utils/helper'
import useUserStore from '@/store/modules/user'
import useDialog from '@/hooks/useDialog'
import { updatePwd } from '@/api/sys/user'
import pinia from '@/store'
const userStore = useUserStore(pinia)
const { t } = useI18n()
const formRef = ref('formRef')
const { dialogVisible, dialogOpen, dialogCancel, dialogClose, submitLoading, formData } = useDialog(formRef, { emitName: 'changePwd' })

const router = useRouter()
// 密码
const validatePass = (rule, value, callback) => {
  // if (validatenull(value)) {
  //   return callback(new Error(t('page.dialog.pwdsettingTips')));
  // } else if (!valid_9(value)) {
  //   return callback(new Error(t('page.dialog.pwdsettingTips')));
  // } else {
  //   callback();
  // }
}

// 再次输入密码
const checkPass = (rule, value, callback) => {
  // if (validatenull(value)) {
  //   return callback(new Error(t('page.dialog.enterPasswordAgain')));
  // } else if (value !== formData.value.newPassword) {
  //   return callback(new Error(t('page.dialog.pwdAreInconsistent')));
  // } else {
  //   return callback();
  // }
}

const oldPasswordShow = ref('password')
const newPasswordShoww = ref('password')
const confirmPasswordShow = ref('password')

const rules = {
  password: [
    {
      required: true,
      message: t('page.dialog.enterOldPassword'),
      trigger: ['blur', 'change'],
    },
  ],
  newPassword: [
    {
      required: true,
      // validator: validatePass,
      trigger: ['blur', 'change'],
    },
    {
      min: 5,
      max: 20,
      message: t('page.dialog.pwdsettingTips'),
      trigger: ['blur', 'change'],
    },
  ],
  confirmPassword: [
    {
      required: true,
      // validator: checkPass,
      trigger: ['blur', 'change'],
    },
  ],
}

const handleOpen = () => {
  formData.value = { password: '', newPassword: '', confirmPassword: '' }

  dialogOpen()
}

const submit = () => {
  submitLoading.value = true
  formRef.value.validate(valid => {
    if (valid) {
      changePassword()
    } else {
      submitLoading.value = false
    }
  })
}

const changePassword = async () => {
  try {
    await updatePwd(formData.value)
    ElMessage.success(t('page.dialog.actionFb.successfullyChange'))
    dialogClose()
    await userStore.userLogout()
    setTimeout(() => {
      router.push({ path: '/login' })
    }, 900)
  } catch {
    console.log('修改失败')
  }
  submitLoading.value = false
}

window.bus.on('dialogBeforeClose', data => {
  lucky.star('进入了')
  if (data.emitName === 'changePwd') {
    oldPasswordShow.value = 'password'
    lucky.star('进入了zzz')
    newPasswordShoww.value = 'password'
    confirmPasswordShow.value = 'password'
  }
})

defineExpose({
  handleOpen,
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item__error) {
}
</style>
