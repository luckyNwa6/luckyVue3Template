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
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <el-tree-select
              v-model="formData.parentId"
              :data="menuOptions"
              :render-after-expand="false"
              node-key="menuId"
              check-strictly
              :props="defaultProps"
              placeholder="选择上级菜单"
              highlight-current
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio v-for="(type, index) in formData.typeList" :value="index" :key="index">
                {{ type }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="formData.typeList[formData.type] + '名称'" prop="name">
            <el-input v-model="formData.name" :placeholder="formData.typeList[formData.type] + '名称'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="formData.type === 1" label="菜单路由" prop="url">
            <el-input v-model="formData.url" placeholder="菜单路由"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="formData.type !== 0" label="授权标识" prop="perms">
            <el-input v-model="formData.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item v-if="formData.type !== 2" label="菜单图标" prop="icon">
            <el-input
              v-model="formData.icon"
              v-popover:iconListPopover
              :readonly="true"
              placeholder="菜单图标名称"
              class="icon-list__input"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="formData.type !== 2" label="排序号" prop="orderNum">
            <el-input-number v-model="formData.orderNum" controls-position="right" :min="0" label="排序号"></el-input-number>
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
import i18n from '@/lang/index'

import { addMenuInfo, updateMenuInfo, getMenuSelect } from '@/api/sys/user'
import { treeDataTranslate } from '@/utils'
const initFormData = () => ({
  parentName: '',
  id: 0,
  type: 1,
  typeList: ['目录', '菜单', '按钮'],
  name: '',
  parentId: 0,
  url: '',
  perms: '',
  orderNum: 0,
  icon: '',
  iconList: [],
})
const formRef = ref('formRef')
const { dialogClose, dialogOpen, dialogCancel, _handleOpen, dialogVisible, submitLoading, formData } = useDialog(formRef, { initFormData })
const dialogModel = ref('create')
const roleList = ref([])

const emit = defineEmits(['actionUpdatePage'])
const defaultProps = {
  id: 'menuId',
  children: 'children',
  label: 'name',
}

const rules = {
  username: [
    {
      required: true,
      message: i18n.global.t('systemManager.userManager.accountNameTip1'),
      trigger: ['change', 'blur'],
    },
  ],
}

//初始化调用
const initAction = async params => {
  try {
    await _getMenuSelect() //获取菜单下拉的数据
  } catch (error) {
    console.log(error)
  }

  dialogModel.value = params.type //类型新增还是修改

  if (params.type === 'edit') {
    for (const item in params.data) {
      formData.value[item] = params.data[item]
    }
  }
  dialogOpen()
}

const handleOpen = async params => {
  _handleOpen(() => initAction(params))
}

const menuOptions = ref([])
const _getMenuSelect = () => {
  getMenuSelect().then(res => {
    // console.log(res)
    menuOptions.value = treeDataTranslate(res.menuList, 'menuId')
  })
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
    await addMenuInfo(formData.value)
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
    await updateMenuInfo(formData.value)
    ElMessage.success(i18n.global.t('page.dialog.actionFb.successfullyUpdate'))
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
