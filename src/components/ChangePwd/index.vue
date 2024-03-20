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
      <el-form-item :label="$t('page.dialog.oldPassword')" prop="oldPassword">
        <el-input v-model="formData.oldPassword" :type="oldPasswordShow" clearable :placeholder="$t('page.dialog.enterOldPassword')">
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
import i18n from '@/lang'

import { valid_9, validatenull } from '@/utils/helper'

import useDialog from '@/hooks/useDialog'

// import { updateUserPwd } from '@/api/system/user'

const formRef = ref('formRef')
const { dialogVisible, dialogOpen, dialogCancel, dialogClose, submitLoading, formData } = useDialog(formRef, { emitName: 'changePwd' })
// 密码
const validatePass = (rule, value, callback) => {
  // if (validatenull(value)) {
  //   return callback(new Error(i18n.global.t('page.dialog.pwdsettingTips')));
  // } else if (!valid_9(value)) {
  //   return callback(new Error(i18n.global.t('page.dialog.pwdsettingTips')));
  // } else {
  //   callback();
  // }
}

// 再次输入密码
const checkPass = (rule, value, callback) => {
  // if (validatenull(value)) {
  //   return callback(new Error(i18n.global.t('page.dialog.enterPasswordAgain')));
  // } else if (value !== formData.value.newPassword) {
  //   return callback(new Error(i18n.global.t('page.dialog.pwdAreInconsistent')));
  // } else {
  //   return callback();
  // }
}

const oldPasswordShow = ref('password')
const newPasswordShoww = ref('password')
const confirmPasswordShow = ref('password')

const rules = {
  oldPassword: [
    {
      required: true,
      message: i18n.global.t('page.dialog.enterOldPassword'),
      trigger: ['blur', 'change'],
    },
  ],
  newPassword: [
    {
      required: true,
      validator: validatePass,
      trigger: ['blur', 'change'],
    },
    {
      min: 6,
      max: 20,
      message: i18n.global.t('page.dialog.pwdsettingTips'),
      trigger: ['blur', 'change'],
    },
  ],
  confirmPassword: [
    {
      required: true,
      validator: checkPass,
      trigger: ['blur', 'change'],
    },
  ],
}

const handleOpen = () => {
  formData.value = { oldPassword: '', newPassword: '', confirmPassword: '' }

  dialogOpen()
}

const submit = () => {
  submitLoading.value = true
  formRef.value.validate((valid) => {
    if (valid) {
      changePassword()
    } else {
      submitLoading.value = false
    }
  })
}

const changePassword = () => {}

// const changePassword = async () => {
//   try {
//     await updateUserPwd(formData.value)
//     ElMessage.success(i18n.global.t('page.dialog.actionFb.successfullyChange'))
//     dialogClose()
//   } catch {
//     console.log('修改失败')
//   }
//   submitLoading.value = false
// }

window.bus.on('dialogBeforeClose', (data) => {
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
