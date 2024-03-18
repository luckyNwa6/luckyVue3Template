<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-form :model="searchData" ref="queryForm" :inline="true">
          <el-form-item :label="$t('systemManager.userManager.accountName')" prop="username">
            <el-input
              v-model="searchData.username"
              :placeholder="$t('systemManager.userManager.accountName')"
              clearable
              @keyup.enter.native="hooks_handleSearch(getTablePage)"
            />
          </el-form-item>

          <el-form-item :label="$t('systemManager.userManager.username')" prop="nickname">
            <el-input
              v-model="searchData.nickname"
              :placeholder="$t('systemManager.userManager.username')"
              clearable
              @keyup.enter.native="hooks_handleSearch(getTablePage)"
            />
          </el-form-item>
          <el-form-item :label="$t('page.createTime')" prop="starEndDate">
            <el-date-picker
              v-model="searchData.starEndDate"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('systemManager.userManager.startDate')"
              :end-placeholder="$t('systemManager.userManager.endDate')"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD HH:mm:ss"
              :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
            />
          </el-form-item>
          <el-form-item :label="$t('systemManager.userManager.status')" prop="nickname">
            <el-select v-model="searchData.status" placeholder="请选择租户状态" clearable style="width: 240px">
              <el-option v-for="dict in getDictDatas(DICT_TYPE.COMMON_STATUS)" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
            <!-- <el-select v-model="searchData.status" style="width: 100px" :placeholder="$t('systemManager.userManager.status')">
              <el-option :value="1" :label="$t('systemManager.userManager.normal')" />
              <el-option :value="0" :label="$t('systemManager.userManager.disabled')" />
            </el-select> -->
          </el-form-item>
        </el-form>
      </template>

      <template #searchButton>
        <el-button type="warning" @click="changeLanZ">中文</el-button>
        <el-button type="info" @click="changeLanE">en</el-button>
        <el-button type="info" @click="tanK">弹框</el-button>

        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">{{ $t('page.search') }}</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>

      <template #topName>{{ $t('page.userManage.title') }}</template>
      <template #topNameBtn>
        <el-button plain size="small" icon="Plus" type="primary" @click="editData({ type: 'create' })">
          {{ $t('page.add') }}
        </el-button>
      </template>
      <template #pageTable>
        <el-table ref="tableRef" height="485px" v-loading="tableLoading" :data="tablePage" @sort-change="handleSort">
          <el-table-column :label="$t('page.index')" ixed="left" align="center" width="70">
            <template #default="scope">
              {{ scope.$index + 1 + (tableQueryData.pageNum - 1) * tableQueryData.pageSize }}
            </template>
          </el-table-column>

          <el-table-column
            prop="username"
            align="center"
            :label="$t('systemManager.userManager.accountName')"
            show-overflow-tooltip
            min-width="100"
          />
          <el-table-column
            prop="nickname"
            align="center"
            :label="$t('systemManager.userManager.username')"
            show-overflow-tooltip
            min-width="100"
          />
          <el-table-column :label="$t('systemManager.userManager.accountType')" show-overflow-tooltip min-width="100">
            <template v-slot="{ row }">
              {{ row.primaryAccount ? $t('page.primaryAccount') : $t('page.bypassAccount') }}
            </template>
          </el-table-column>
          <el-table-column prop="mobileNo" align="center" :label="$t('page.mobilePhone')" min-width="130" show-overflow-tooltip />
          <el-table-column prop="emailNo" align="center" :label="$t('page.email')" show-overflow-tooltip />
          <el-table-column
            prop="groupName"
            align="center"
            :label="$t('systemManager.userManager.belongingGroup')"
            show-overflow-tooltip
            min-width="130"
          />
          <el-table-column :label="$t('page.role')" align="center" min-width="80" show-overflow-tooltip>
            <template v-slot="{ row }">
              <span>
                {{ row.roleName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="enabled" align="center" width="80" :label="$t('page.status')">
            <template #default="scope">
              <dict-tag :type="DICT_TYPE.COMMON_STATUS" :value="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column prop="enabled" align="center" width="80" :label="$t('page.status')">
            <template #default="scope">
              <el-switch v-if="scope.row.primaryAccount" v-model="scope.row.enabled" :disabled="true" />
              <div v-else class="com-mark cursor-pointer" @click="handleChangeStatus()">
                <el-switch v-model="scope.row.enabled" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdTimeSort" align="center" sortable="custom" width="150" :label="$t('page.createTime')">
            <template #default="scope">
              <span>{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="210" :label="$t('page.operate')" align="center" fixed="right">
            <template #default="scope">
              <div>
                <el-link class="opreation-link" :underline="false" @click="editData({ type: 'edit', data: scope.row })">
                  {{ $t('page.edit') }}
                </el-link>
                <!-- <el-link class="opreation-link" :underline="false" @click="resetPwd(scope.row)">    {{ $t('systemManager.userManager.resetPwd') }}</el-link>
                <el-link class="opreation-link" :underline="false" @click="handleDelete(scope.row)">
                  {{ $t('page.delete') }}
                </el-link> -->
                <el-button size="small" link type="primary" icon="el-icon-delete">{{ $t('page.delete') }}</el-button>
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
    <PopEditerUser ref="popEditerUser" @actionUpdatePage="actionUpdatePage" />
  </div>
</template>

<script setup lang="ts">
import useTable from '@/hooks/useTable'
import { reqTablePage } from '@/api/home'

import i18n from '@/lang'

import { useAppStore } from '@/store/modules/app.js'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const appStore = useAppStore()

const message = useMessage()

const tanK = () => {
  console.log('弹框')
  message.confirm('该消息已存在，请修改id后重新保存')
}

const changeLanZ = () => {
  console.log('切为中文')
  locale.value = 'zh'
  i18n.global.locale.value = 'zh'
  appStore.changeLanguage('zh')
}

const changeLanE = () => {
  locale.value = 'en'
  console.log('切为英文')
  i18n.global.locale.value = 'en'
  appStore.changeLanguage('en')
}

import PopEditerUser from './components/popEditerUser.vue'

let $router = useRouter()

const tableRef = ref<any>('tableRef')
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
    // tableQueryData.groupId = currentNode.value.id;
    // if (tableQueryData.starEndDate) {
    //   tableQueryData.startDateTime = tableQueryData.starEndDate[0]
    //   tableQueryData.endDateTime = tableQueryData.starEndDate[1]
    // }
    // delete tableQueryData.starEndDate;
    const res = await reqTablePage(tableQueryData)
    console.log('🚀 ~ getTablePage ~ res:', res)
    tablePage.value = res.data.records
    totalPages.value = res.data.total * 1
    nextTick(() => {
      tableRef.value.setScrollTop(0)
    })
  } catch {
    console.log('getTablePage error')
  }
  tableLoading.value = false
}

const editData = ({ type, data }: { type: String; data?: any }) => {
  console.log('编辑')

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
