<template>
  <div class="flex-1 w-full">
    <PagePack permissionName="USER_MANAGER_LIST_PAGE" v-model:toggleValue="showSeniorSearch">
      <template #searchForm>
        <el-form :model="searchData" ref="queryForm" :inline="true">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchData.key" placeholder="用户名" clearable @keyup.enter.native="hooks_handleSearch(getTablePage)" />
          </el-form-item>
        </el-form>
      </template>

      <template #searchButton>
        <el-button type="primary" @click="hooks_handleSearch(getTablePage)">{{ $t('page.search') }}</el-button>
        <el-button @click="hooks_resetQueryTable(getTablePage)">
          {{ $t('page.reset') }}
        </el-button>
      </template>

      <template #topName>日志查看</template>

      <template #pageTable>
        <el-table ref="tableRef" height="485px" v-loading="tableLoading" :data="tablePage" @sort-change="handleSort">
          <el-table-column :label="$t('page.index')" fixed="left" align="center" width="70" prop="id"></el-table-column>

          <el-table-column prop="username" align="center" label="用户名" show-overflow-tooltip min-width="100" />
          <el-table-column prop="operation" align="center" label="用户操作" show-overflow-tooltip min-width="100" />

          <el-table-column prop="method" align="center" label="请求方法" min-width="130" show-overflow-tooltip />
          <el-table-column prop="params" align="center" label="请求参数" show-overflow-tooltip />

          <el-table-column prop="time" align="center" label="执行时长(毫秒)" min-width="130" show-overflow-tooltip />

          <el-table-column prop="ip" align="center" label="IP地址" min-width="130" show-overflow-tooltip />

          <el-table-column prop="createDate" align="center" sortable="custom" width="180" :label="$t('page.createTime')">
            <template #default="scope">
              <span>{{ scope.row.createDate }}</span>
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
  </div>
</template>

<script setup lang="ts">
import useTable from '@/hooks/useTable'
import { reqLogPage } from '@/api/sys/user'
import { deleteUser } from '@/api/sys/user'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const tableRef = ref<any>('tableRef')
const showSeniorSearch = ref(false)

const initTableQueryData = () => ({
  limit: 10,
  page: 1,
  key: '',
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

onMounted(() => {
  getTablePage()
})

// 当前页真正获取表格页数据的方法
const getTablePage = async () => {
  tableLoading.value = true
  try {
    const res = await reqLogPage(tableQueryData)

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

const sortData = reactive({
  pageNum: 1,
  createdTimeSort: null,
})
const handleSort = (data: any) => {
  hooks_sortTableByProps(sortData, data, getTablePage)
}

// 获取表格数据
const _getTableData = () => {
  hooks_getTableData(getTablePage)
}
</script>

<style lang="scss" scoped>
.opreation-link {
  margin-right: 10px;
  color: var(--el-color-primary);
}
</style>
