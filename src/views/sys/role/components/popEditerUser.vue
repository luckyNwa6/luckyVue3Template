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
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formData.roleName" maxlength="20" show-word-limit placeholder="请输入用户名" clearable />
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="授权">
            <el-tree
              style="width: 100%"
              class="tree-border"
              :data="treeData"
              show-checkbox
              ref="treeRef"
              node-key="menuId"
              empty-text="加载中，请稍后"
              :props="defaultProps"
            ></el-tree>
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
import { treeDataTranslate } from '@/utils'

import { reqMenuTablePage } from '@/api/sys/user'
import { useI18n } from 'vue-i18n'

import { addRoleInfo, updateRoleInfo, getRoleInfo } from '@/api/sys/user'
const treeData = ref([])

const { t } = useI18n()
const defaultProps = {
  children: 'children',
  label: 'name',
}
const initFormData = () => ({
  roleName: '',
  remark: '',
  menuIdList: '',
  roleId: '',
})

const formRef = ref('formRef')
const { dialogClose, dialogOpen, dialogCancel, _handleOpen, dialogVisible, submitLoading, formData } = useDialog(formRef, { initFormData })
const treeRef = ref(null)
const tempKey = ref(-666666) // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
const dialogModel = ref('create')

const rules = {
  roleName: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: ['change', 'blur'],
    },
  ],
}
const emit = defineEmits(['actionUpdatePage'])

const init = async () => {
  try {
    await reqMenuTablePage().then(res => {
      // console.log('🚀 ~ .then ~ data:', res)
      treeData.value = treeDataTranslate(res, 'menuId') //返回的数据处理成树型
    })
  } catch (error) {
    console.log(error)
  }
}
const initAction = params => {
  init() //获取树数据

  dialogModel.value = params.type

  if (params.type === 'edit') {
    getRoleInfo(params.data.roleId).then(res => {
      let idx = res.role.menuIdList.indexOf(tempKey.value)
      if (idx !== -1) {
        res.role.menuIdList.splice(idx, res.role.menuIdList.length - idx)
      }
      // console.log('🚀 ~ res', res.role.menuIdList) //返回单行的角色信息
      treeRef.value.setCheckedKeys(res.role.menuIdList)
      for (const item in params.data) {
        formData.value[item] = params.data[item]
        // console.log('🚀 ~ initAction ~ params.data[item]:', params.data[item])
      }
    })
  }

  dialogOpen()
}

const handleOpen = async params => {
  _handleOpen(() => initAction(params))
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
  formData.value.menuIdList = [].concat(treeRef.value.getCheckedKeys(), [tempKey.value], treeRef.value.getHalfCheckedKeys()) //拼接
  // console.log('🚀 ~ createData ~ formData.value:', formData.value)
  try {
    await addRoleInfo(formData.value)
    ElMessage.success(t('page.dialog.actionFb.successfullyAdd'))
    emit('actionUpdatePage')
    dialogClose()
  } catch {
    console.log('getTablePage error')
  }

  submitLoading.value = false
}
const updateData = async () => {
  formData.value.menuIdList = [].concat(treeRef.value.getCheckedKeys(), [tempKey.value], treeRef.value.getHalfCheckedKeys())

  try {
    await updateRoleInfo(formData.value)
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
