<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-form :model="searchData" ref="queryForm" :inline="true" @submit.prevent>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="searchData.menuName" placeholder="菜单名称" clearable @keyup.enter="hooks_handleSearch(getTablePage)" />
          </el-form-item>
        </el-form>
      </template>
      <template #searchButton>
        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">{{ $t('page.search') }}</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>

      <template #topName>菜单管理</template>
      <template #topNameBtn>
        <el-button plain size="small" icon="Plus" type="primary" @click="editData({ type: 'create' })">
          {{ $t('page.add') }}
        </el-button>
      </template>
      <template #pageTable>
        <el-table row-key="menuId" ref="tableRef" height="485px" v-loading="tableLoading" :data="tablePage">
          <el-table-column prop="name" align="center" label="名称" show-overflow-tooltip min-width="100" />
          <el-table-column prop="parentName" align="center" label="上级菜单" show-overflow-tooltip min-width="100" />

          <el-table-column align="center" label="图标" show-overflow-tooltip min-width="100">
            <template #default="scope">
              {{ scope.row.icon || '' }}
            </template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="类型" show-overflow-tooltip min-width="100">
            <template #default="scope">
              <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
              <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
              <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderNum" align="center" label="排序号" show-overflow-tooltip min-width="100" />
          <el-table-column prop="url" align="center" label="菜单URL" show-overflow-tooltip min-width="100" />
          <el-table-column prop="perms" align="center" label="授权标识" show-overflow-tooltip min-width="100" />

          <el-table-column width="210" :label="$t('page.operate')" align="center" fixed="right">
            <template #default="scope">
              <div>
                <el-link class="opreation-link" :underline="false" icon="Edit" @click="editData({ type: 'edit', data: scope.row })">
                  修改
                </el-link>
                <el-link class="opreation-link" :underline="false" icon="Delete" @click="handleDelete(scope.row)">
                  {{ $t('page.delete') }}
                </el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </PagePack>
    <PopEditerUser ref="popEditerUser" @actionUpdatePage="actionUpdatePage" />
  </div>
</template>

<script setup lang="ts">
import useTable from '@/hooks/useTable'
import { reqMenuTablePage } from '@/api/sys/user'
import { deleteMenu } from '@/api/sys/user'
import { treeDataTranslate } from '@/utils'
import PopEditerUser from './components/popEditerUser.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const tableRef = ref<any>('tableRef')
const showSeniorSearch = ref(false)

const initTableQueryData = () => ({
  menuName: '',
})
const popEditerUser = ref<any>('popEditerUser')
const { tableQueryData, tablePage, searchData, tableLoading, hooks_getTableData, hooks_resetQueryTable, hooks_handleSearch } = useTable(
  initTableQueryData,
  tableRef
)

onMounted(() => {
  getTablePage()
})

// 当前页真正获取表格页数据的方法
// 下面将返回的菜单列表处理成树结构配合表格里的key
const getTablePage = async () => {
  tableLoading.value = true
  try {
    const res = await reqMenuTablePage(tableQueryData)
    // console.log('🚀 ~ reqRoleTablePage ~ res:', res)
    // console.log(treeDataTranslate(res, 'menuId'))

    tablePage.value = treeDataTranslate(res, 'menuId') as never
    nextTick(() => {
      tableRef.value.setScrollTop(0)
    })
  } catch (error) {
    console.log('菜单表格数据渲染异常！', error)
  }
  tableLoading.value = false
}

const editData = ({ type, data }: { type: string; data?: any }) => {
  popEditerUser.value.handleOpen({
    type: type,
    data: data,
    groupId: 1,
  })
}

const actionUpdatePage = () => {
  _getTableData()
}
// 获取表格数据
const _getTableData = () => {
  hooks_getTableData(getTablePage)
}

const handleDelete = (data: any) => {
  console.log('🚀 ~ handleDelete ~ data:', data)
  ElMessageBox.confirm(t('page.dialog.actionTip.sureToDelete') + '?', t('page.dialog.actionTip.tipText'), {
    confirmButtonText: t('page.confirm'),
    cancelButtonText: t('page.Cancel'),
    type: 'warning',
  })
    .then(async () => {
      try {
        await deleteMenu(data.menuId)
        ElMessage({
          type: 'success',
          message: t('page.dialog.actionFb.successfullyDeleted'),
        })
        _getTableData()
      } catch {
        ElMessage({
          type: 'error',
          message: t('page.dialog.actionFb.failedDeleted'),
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: t('page.dialog.actionFb.cancleDelete'),
      })
    })
}
</script>

<style lang="scss" scoped>
.opreation-link {
  margin-right: 10px;
  color: var(--el-color-primary);
}
</style>
