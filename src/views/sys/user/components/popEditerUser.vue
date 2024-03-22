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
        <el-col :span="24">
          <el-form-item :label="$t('page.email')" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" clearable maxlength="200" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('page.role')" prop="roleIdList" class="mb-0">
            <el-select v-model="formData.roleIdList" :placeholder="$t('page.dialog.select.errorTips.userRole')" clearable filterable>
              <div v-for="item in roleList" :key="item.roleId">
                <el-option :disabled="!item.enabled" :value="item.roleId" :label="item.roleName" />
              </div>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="10px">
            <el-link :underline="false" type="primary" class="custom-link">
              {{ $t('systemManager.userManager.createRole') }}
            </el-link>
          </el-form-item>
        </el-col>
        <el-col v-if="dialogModel === 'create'" :span="12">
          <el-form-item :label="$t('page.userPwd')" prop="password">
            <el-input v-model="formData.password" :placeholder="$t('page.dialog.input.userPwd')" maxlength="20" show-word-limit>
              <template #suffix>
                <i-ep-refresh :title="$t('page.resetPwd')" class="cursor-pointer" @click="formData.password = randomPassword()" />
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formData.nickname" placeholder="请输入昵称" maxlength="20" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
import { useRouter } from 'vue-router'

import useDialog from '@/hooks/useDialog'
// import usePermission from '@/hooks/usePermission';

import { validPhone, validatenull, randomPassword } from '@/utils/helper'

// import MenuTypeEnum from '@/enums/authTypes';

import i18n from '@/lang/index'

// import { getRoleList } from '@/api/roleManager'
import { addUserInfo, updateUserInfo } from '@/api/sys/user'

// const { ROLE_MANAGER_LIST_PAGE } = MenuTypeEnum;

const initFormData = () => ({
  username: '',
  mobile: '',
  email: '',
  // roleIdList: '',
  password: '',
  nickname: '',
  remark: '',
})
const formRef = ref('formRef')
const { dialogClose, dialogOpen, dialogCancel, _handleOpen, dialogVisible, submitLoading, formData } = useDialog(formRef, { initFormData })
// const { hasPermission } = usePermission();
const router = useRouter()

// 手机号
const validatePhone = (rule, value, callback) => {
  if (validatenull(value)) {
    callback()
  } else if (!validPhone(value)) {
    callback(new Error(i18n.global.t('page.dialog.input.rightPhoneNumber')))
  } else {
    callback()
  }
}

// data
const dialogModel = ref('create')
const roleList = ref([])
const rules = {
  username: [
    {
      required: true,
      message: i18n.global.t('systemManager.userManager.accountNameTip1'),
      trigger: ['change', 'blur'],
    },
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: ['change', 'blur'],
    },
  ],
  mobileNo: [{ validator: validatePhone, trigger: ['blur', 'change'] }],
  email: [
    {
      type: 'email',
      message: i18n.global.t('page.dialog.input.rightEmail'),
      trigger: ['blur', 'change'],
    },
  ],
  roleId: [
    {
      required: true,
      message: i18n.global.t('systemManager.userManager.roleTip'),
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: i18n.global.t('systemManager.userManager.pwdTip'),
      trigger: ['blur', 'change'],
    },
    {
      min: 6,
      max: 20,
      message: `${i18n.global.t('page.dialog.input.pwdLimit')}：6~20`,
      trigger: ['blur', 'change'],
    },
  ],
}

const emit = defineEmits(['actionUpdatePage'])

const initAction = async (params) => {
  // try {
  //   await _getRoleList()
  // } catch (error) {
  //   console.log(error)
  // }
  formData.value.password = randomPassword()
  formData.value.groupId = params.groupId

  dialogModel.value = params.type

  if (params.type === 'edit') {
    for (const item in params.data) {
      formData.value[item] = params.data[item]
    }
  }

  dialogOpen()
}

const handleOpen = async (params) => {
  _handleOpen(() => initAction(params))
}

// methods

// const _getRoleList = async () => {
//   try {
//     const res = await getRoleList()
//     roleList.value = res.data
//   } catch {
//     console.log('获取角色列表失败')
//   }
// }

const submit = () => {
  submitLoading.value = true
  formRef.value.validate((valid) => {
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
    ElMessage.success(i18n.global.t('page.dialog.actionFb.successfullyAdd'))
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
    ElMessage.success(i18n.global.t('page.dialog.actionFb.successfullyUpdate'))
    emit('actionUpdatePage')
    dialogClose()
  } catch {
    console.log('getTablePage error')
  }
  submitLoading.value = false
}

// const goRole = () => {
//   if (!hasPermission(ROLE_MANAGER_LIST_PAGE)) {
//     ElMessage.error(i18n.global.t('page.permission.rules1'));
//     return;
//   }
//   router.push({
//     name: 'roleManager'
//   });
// };

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
