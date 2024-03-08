<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" showToggleButton v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-row :gutter="12">
          <el-col :span="7">
            <el-input v-model="searchData.username" placeholder="请输入用户名" clearable />
          </el-col>
          <el-col :span="7">
            <el-input v-model="searchData.nickname" :placeholder="$t('systemManager.userManager.username')" clearable />
          </el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="searchData.starEndDate"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('systemManager.userManager.startDate')"
              :end-placeholder="$t('systemManager.userManager.endDate')"
              value-format="YYYY-MM-DD"
            />
          </el-col>
        </el-row>
        <el-row :gutter="12" v-if="showSeniorSearch" class="mt-3">
          <el-col :span="7">
            <el-select v-model="searchData.status" :placeholder="$t('systemManager.userManager.status')">
              <el-option :value="1" :label="$t('systemManager.userManager.normal')" />
              <el-option :value="0" :label="$t('systemManager.userManager.disabled')" />
            </el-select>
          </el-col>
        </el-row>
      </template>
      <template #searchButton>
        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">搜索</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>
      <template #pageTable>
        <div class="btn-content">
          <el-button :icon="Plus" type="primary" @click="editData()">
            {{ $t('page.add') }}
          </el-button>
        </div>
        <el-table
          ref="tableRef"
          height="100%"
          v-loading="tableLoading"
          :data="tablePage"
          stripe
          :header-cell-style="{
            background: '#FAFAFA',
            color: '#333',
          }"
          @sort-change="handleSort"
        >
          <el-table-column type="index" width="60" label="序号" fixed="left" align="center" />
          <el-table-column prop="username" :label="$t('systemManager.userManager.accountName')" show-overflow-tooltip min-width="100" />
          <el-table-column prop="nickname" label="姓名" show-overflow-tooltip min-width="100" />
          <el-table-column :label="$t('systemManager.userManager.accountType')" show-overflow-tooltip min-width="100">
            <template v-slot="{ row }">
              {{ row.primaryAccount ? $t('page.primaryAccount') : $t('page.bypassAccount') }}
            </template>
          </el-table-column>
          <el-table-column prop="mobileNo" label="手机号" min-width="130" show-overflow-tooltip />
          <el-table-column prop="emailNo" :label="$t('page.email')" show-overflow-tooltip />
          <el-table-column prop="groupName" :label="$t('systemManager.userManager.belongingGroup')" show-overflow-tooltip min-width="130" />
          <el-table-column :label="$t('page.role')" min-width="80" show-overflow-tooltip>
            <template v-slot="{ row }">
              <span>
                {{ row.roleName }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="enabled" width="80" :label="$t('page.status')">
            <template #default="scope">
              <el-switch v-if="scope.row.primaryAccount" v-model="scope.row.enabled" :disabled="true" />
              <div v-else class="com-mark cursor-pointer" @click="handleChangeStatus()">
                <el-switch v-model="scope.row.enabled" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdTimeSort" sortable="custom" width="150" label="创建时间">
            <template #default="scope">
              <span>{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="210" label="操作" fixed="right">
            <template #default="scope">
              <div>
                <el-link class="opreation-link" :underline="false" @click="editData()">编辑</el-link>
                <!-- <el-link class="opreation-link" :underline="false" @click="resetPwd(scope.row)">重置密码</el-link>
                <el-link class="opreation-link" :underline="false" @click="handleDelete(scope.row)">
                  {{ $t('page.delete') }}
                </el-link> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #pagePagination>
        <Pagination
          v-if="totalPages > 0"
          v-model:total="totalPages"
          v-model:page="tableQueryData.pageNum"
          v-model:limit="tableQueryData.pageSize"
          @pagination="getTablePage"
        />
      </template>
    </PagePack>
  </div>
</template>

<script setup lang="ts">
import useTable from '@/hooks/useTable'
import { reqTablePage } from '@/api/home'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'

let $router = useRouter()

const tableRef = ref('tableRef')
const showSeniorSearch = ref(false)

const initTableQueryData = () => ({
  pageSize: 10,
  pageNum: 1,
  nickname: '',
  starEndDate: [],
  groupId: '',
  username: '',
  status: '',
  startDateTime: '',
  endDateTime: '',
})

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

const exitLogin = () => {
  $router.push({ path: '/login' })
}

onMounted(() => {
  getTablePage()
})
// 当前页真正获取表格页数据的方法
const getTablePage = async () => {
  tableLoading.value = true
  try {
    // tableQueryData.groupId = currentNode.value.id;
    // if (tableQueryData.starEndDate) {
    //   tableQueryData.startDateTime = tableQueryData.starEndDate[0];
    //   tableQueryData.endDateTime = tableQueryData.starEndDate[1];
    // }
    // delete tableQueryData.starEndDate;
    const res = await reqTablePage(tableQueryData)
    console.log('🚀 ~ getTablePage ~ res:', res)
    tablePage.value = res.data.records
    totalPages.value = res.data.total * 1
  } catch {
    console.log('getTablePage error')
  }
  tableLoading.value = false
}

const editData = () => {
  console.log('编辑')

  // popEditerUser.value.handleOpen({
  //   type: type,
  //   data: data,
  //   groupId: currentNode.value.id
  // });
}
const sortData = reactive({
  pageNum: 1,
  createdTimeSort: null,
})
const handleSort = () => {
  hooks_sortTableByProps(sortData, null, getTablePage)
}

// const resetPwd = (params) => {
//   // await popResetPassword.value.handleOpen(params);
// }
// const handleDelete = (data) => {
//   CustomMessageBox.confirm(`${i18n.global.t('page.dialog.actionTip.sureToDelete')}?`, i18n.global.t('page.dialog.actionTip.tipText'), {
//     confirmButtonText: i18n.global.t('page.confirm'),
//     cancelButtonText: i18n.global.t('page.Cancel'),
//     type: 'warning',
//   })
//     .then(() => {
//       try {
//         // await deleteUser(data.userId)
//         ElMessage({
//           type: 'success',
//           message: i18n.global.t('page.dialog.actionFb.successfullyDeleted'),
//         })
//         _getTableData()
//       } catch {
//         ElMessage({
//           type: 'error',
//           message: i18n.global.t('page.dialog.actionFb.failedDeleted'),
//         })
//       }
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: i18n.global.t('page.dialog.actionFb.cancleDelete'),
//       })
//     })
// }

const handleChangeStatus = () => {
  // tableLoading.value = true;
  // try {
  //   await changeStatus({
  //     userId: data.userId
  //   });
  //   ElMessage({
  //     type: 'success',
  //     message: i18n.global.t('page.dialog.actionFb.successfullyChange')
  //   });
  //   tableLoading.value = false;
  //   _getTableData();
  // } catch {
  //   ElMessage({
  //     type: 'error',
  //     message: i18n.global.t('page.dialog.actionFb.failedChange')
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
