<template>
  <el-dialog
    v-model="dialogVisible"
    width="850px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="dialogCancel"
    :title="dialogModel === 'create' ? $t('page.add') : $t('page.edit')"
  >
    <el-form ref="formRef" v-loading="submitLoading" label-width="auto" :model="formData" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="formData.username"
              :disabled="dialogModel !== 'create'"
              maxlength="20"
              show-word-limit
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formData.nickname" placeholder="请输入昵称" maxlength="20" show-word-limit clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('page.mobilePhone')" prop="mobile">
            <el-input
              v-model="formData.mobile"
              maxlength="11"
              show-word-limit
              :placeholder="$t('systemManager.userManager.mobilePhoneTip')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('page.email')" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" clearable maxlength="200" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col v-if="dialogModel === 'create'" :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" :placeholder="$t('page.dialog.input.userPwd')" maxlength="20" show-word-limit>
              <template #suffix>
                <i-ep-refresh :title="$t('page.resetPwd')" class="cursor-pointer" @click="formData.password = randomPassword()" />
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('page.role')" prop="roleIdList" class="mb-0">
            <el-checkbox-group v-model="formData.roleIdList">
              <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId" />
            </el-checkbox-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item :label="$t('page.remark')">
            <el-input
              v-model="formData.remark"
              :placeholder="$t('page.dialog.input.fillRemark')"
              clearable
              type="textarea"
              :rows="4"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
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
<script>
export default {
  name: 'PopEditerUser',
}
</script>

<script setup>
import useDialog from '@/hooks/useDialog'

import { validPhone, validatenull, randomPassword } from '@/utils/helper'

import { useI18n } from 'vue-i18n'

import { addUserInfo, updateUserInfo, getRoleSelect, reqUserInfoId } from '@/api/sys/user'

const { t } = useI18n()
const initFormData = () => ({
  username: '',
  mobile: '',
  email: '',
  status: 1,
  roleIdList: [],
  password: '',
  nickname: '',
  remark: '',
})
const formRef = ref('formRef')
const { dialogClose, dialogOpen, dialogCancel, _handleOpen, dialogVisible, submitLoading, formData } = useDialog(formRef, { initFormData })

const validatePhone = (rule, value, callback) => {
  if (validatenull(value)) {
    callback()
  } else if (!validPhone(value)) {
    callback(new Error(t('page.dialog.input.rightPhoneNumber')))
  } else {
    callback()
  }
}

const dialogModel = ref('create')
const roleList = ref([])
const rules = {
  username: [
    {
      required: true,
      message: t('systemManager.userManager.accountNameTip1'),
      trigger: ['change', 'blur'],
    },
  ],

  mobile: [{ required: true, message: '请输入正确的手机号', validator: validatePhone, trigger: ['blur', 'change'] }],
  email: [
    {
      required: true,
      type: 'email',
      message: t('page.dialog.input.rightEmail'),
      trigger: ['blur', 'change'],
    },
  ],
  roleId: [
    {
      required: true,
      message: t('systemManager.userManager.roleTip'),
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: t('systemManager.userManager.pwdTip'),
      trigger: ['blur', 'change'],
    },
    {
      min: 6,
      max: 20,
      message: `${t('page.dialog.input.pwdLimit')}：6~20`,
      trigger: ['blur', 'change'],
    },
  ],
}

const emit = defineEmits(['actionUpdatePage'])

const initAction = async params => {
  try {
    await _getRoleList()
  } catch (error) {
    console.log(error)
  }
  formData.value.password = randomPassword()
  formData.value.groupId = params.groupId

  dialogModel.value = params.type

  if (params.type === 'edit') {
    // for (const item in params.data) {//这里是直接编辑传过来的值
    //   formData.value[item] = params.data[item]
    // }
    // console.log(params.data)
    reqUserInfoId(params.data.userId).then(res => {
      for (const item in res.user) {
        formData.value[item] = res.user[item]
      }
    })
  }
  dialogOpen()
}

const handleOpen = async params => {
  _handleOpen(() => initAction(params))
}

const _getRoleList = async () => {
  try {
    const res = await getRoleSelect()
    // console.log('🚀 ~ const_getRoleList= ~ res:', res)
    roleList.value = res.list
  } catch {
    console.log('获取角色列表失败')
  }
}

const submit = () => {
  submitLoading.value = true
  formRef.value.validate(valid => {
    if (valid) {
      if (dialogModel.value === 'create') {
        createData()
      } else {
        updateData()
      }
    } else {
      submitLoading.value = false
    }
  })
}
const createData = async () => {
  try {
    await addUserInfo(formData.value)
    ElMessage.success(t('page.dialog.actionFb.successfullyAdd'))
    emit('actionUpdatePage')
    dialogClose()
  } catch {
    console.log('getTablePage error')
  }
  submitLoading.value = false
}
const updateData = async () => {
  try {
    await updateUserInfo(formData.value)
    ElMessage.success(t('page.dialog.actionFb.successfullyUpdate'))
    emit('actionUpdatePage')
    dialogClose()
  } catch {
    console.log('getTablePage error')
  }
  submitLoading.value = false
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>
// 设置maxlength的输入框防止遮挡
:deep(.el-select) {
  width: 100%;
}

:deep(.el-input__inner[maxlength]) {
  padding-right: 35px;
}

.custom-link {
  font-size: 12px;
  min-width: 100px;
}

.mb-0 {
  margin-bottom: 0;
}
</style>
