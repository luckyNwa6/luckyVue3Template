<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-form :model="searchData" ref="queryForm" :inline="true">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchData.username" placeholder="用户名" clearable @keyup.enter.native="hooks_handleSearch(getTablePage)" />
          </el-form-item>
        </el-form>
      </template>

      <template #searchButton>
        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">{{ $t('page.search') }}</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>

      <template #topName>{{ $t('page.userManage.title') }}</template>
      <template #topNameBtn>
        <el-button plain size="small" v-has="`sys:user:save`" icon="Plus" type="primary" @click="editData({ type: 'create' })">
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

          <el-table-column prop="username" align="center" label="用户名" show-overflow-tooltip min-width="100" />
          <el-table-column prop="email" align="center" label="邮箱" show-overflow-tooltip min-width="100" />

          <el-table-column prop="mobile" align="center" :label="$t('page.mobilePhone')" min-width="130" show-overflow-tooltip />
          <el-table-column prop="email" align="center" :label="$t('page.email')" show-overflow-tooltip />

          <el-table-column prop="status" align="center" width="80" :label="$t('page.status')">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
              <el-tag v-else size="small">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdTimeSort" align="center" sortable="custom" width="180" :label="$t('page.createTime')">
            <template #default="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="210" :label="$t('page.operate')" align="center" fixed="right">
            <template #default="scope">
              <div>
                <el-link
                  class="opreation-link"
                  v-has="`sys:user:update`"
                  :underline="false"
                  icon="Edit"
                  @click="editData({ type: 'edit', data: scope.row })"
                >
                  修改
                </el-link>
                <el-link class="opreation-link" v-has="`sys:user:delete`" :underline="false" icon="Delete" @click="handleDelete(scope.row)">
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
import { reqTablePage } from '@/api/sys/user'
import { deleteUser } from '@/api/sys/user'

import PopEditerUser from './components/popEditerUser.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let $router = useRouter()

const tableRef = ref<any>('tableRef')
const showSeniorSearch = ref(false)

const initTableQueryData = () => ({
  limit: 10,
  page: 1,
  username: '',
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
    const res = await reqTablePage(tableQueryData)

    console.log('🚀 ~ getTablePage ~ res:', res)
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

const editData = ({ type, data }: { type: String; data?: any }) => {
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
        await deleteUser(data.userId)
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
