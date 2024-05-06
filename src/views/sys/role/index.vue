<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-form :model="searchData" ref="queryForm" :inline="true">
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="searchData.roleName"
              placeholder="角色名称"
              clearable
              @keyup.enter.native="hooks_handleSearch(getTablePage)"
            />
          </el-form-item>
        </el-form>
      </template>

      <template #searchButton>
        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">{{ $t('page.search') }}</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>

      <template #topName>角色管理</template>
      <template #topNameBtn>
        <el-button plain size="small" icon="Plus" type="primary" @click="editData({ type: 'create' })">
          {{ $t('page.add') }}
        </el-button>
      </template>
      <template #pageTable>
        <el-table ref="tableRef" height="485px" v-loading="tableLoading" :data="tablePage" @sort-change="handleSort">
          <el-table-column :label="$t('page.index')" fixed="left" align="center" width="70">
            <template #default="scope">
              {{ scope.$index + 1 + (tableQueryData.page - 1) * tableQueryData.limit }}
            </template>
          </el-table-column>

          <el-table-column prop="roleName" align="center" label="角色名称" show-overflow-tooltip min-width="100" />
          <el-table-column prop="remark" align="center" label="备注" show-overflow-tooltip min-width="100" />

          <el-table-column prop="createTime" align="center" sortable="custom" width="180" :label="$t('page.createTime')">
            <template #default="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
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
      <template #pagePagination>
        <Pagination
          v-model:total="totalPages"
          v-model:page="tableQueryData.page"
          v-model:limit="tableQueryData.limit"
          @pagination="getTablePage"
        />
      </template>
    </PagePack>
    <PopEditerUser ref="popEditerUser" @actionUpdatePage="actionUpdatePage" />
  </div>
</template>

<script setup lang="ts">
import useTable from '@/hooks/useTable'
import { reqRoleTablePage } from '@/api/sys/user'
import { deleteRole } from '@/api/sys/user'

import PopEditerUser from './components/popEditerUser.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let $router = useRouter()

const tableRef = ref<any>('tableRef')
const showSeniorSearch = ref(false)

const initTableQueryData = () => ({
  limit: 10,
  page: 1,
  roleName: '',
})
const popEditerUser = ref<any>('popEditerUser')
const {
  tableQueryData,
  searchData,
  tableLoading,
  tablePage,
  totalPages,
  hooks_sortTableByProps,
  hooks_getTableData,
  hooks_resetQueryTable,
  hooks_handleSearch,
} = useTable(initTableQueryData, tableRef)

onMounted(() => {
  getTablePage()
})

// 当前页真正获取表格页数据的方法
const getTablePage = async () => {
  tableLoading.value = true
  try {
    const res = await reqRoleTablePage(tableQueryData)

    console.log('🚀 ~ reqRoleTablePage ~ res:', res)
    tablePage.value = res.page.list
    totalPages.value = res.page.totalCount * 1 //总条数
    nextTick(() => {
      tableRef.value.setScrollTop(0)
    })
  } catch {
    console.log('表格数据渲染异常！')
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

const sortData = reactive({
  pageNum: 1,
  createdTimeSort: null,
})
const handleSort = (data: any) => {
  hooks_sortTableByProps(sortData, data, getTablePage)
}

const actionUpdatePage = () => {
  _getTableData()
}
// 获取表格数据
const _getTableData = () => {
  hooks_getTableData(getTablePage)
}

// const resetPwd = (params) => {
//   // await popResetPassword.value.handleOpen(params);
// }
const handleDelete = (data: any) => {
  console.log('🚀 ~ handleDelete ~ data:', data)
  ElMessageBox.confirm(t('page.dialog.actionTip.sureToDelete') + '?', t('page.dialog.actionTip.tipText'), {
    confirmButtonText: t('page.confirm'),
    cancelButtonText: t('page.Cancel'),
    type: 'warning',
  })
    .then(async () => {
      try {
        await deleteRole(data.roleId)
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

const handleChangeStatus = () => {
  // tableLoading.value = true;
  // try {
  //   await changeStatus({
  //     userId: data.userId
  //   });
  //   ElMessage({
  //     type: 'success',
  //     message: t('page.dialog.actionFb.successfullyChange')
  //   });
  //   tableLoading.value = false;
  //   _getTableData();
  // } catch {
  //   ElMessage({
  //     type: 'error',
  //     message: t('page.dialog.actionFb.failedChange')
  //   });
  //   tableLoading.value = false;
  // }
}
</script>

<style lang="scss" scoped>
.opreation-link {
  margin-right: 10px;
  color: var(--el-color-primary);
}
</style>
