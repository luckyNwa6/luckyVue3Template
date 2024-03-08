<template>
  <div>
    <PagePack
      :permissionName="permissionName"
      :showToggleButton="showToggleButton"
      :toggleValue="toggleValue"
    >
      <!-- 描述内容插槽 -->
      <!-- <template v-if="slots.promptContent"> -->
      <template v-slot:promptContent>描述内容</template>
      <!-- </template> -->
      <!-- 搜索表单插槽 -->
      <template v-slot:searchForm>
        <div class="flex flex-wrap items-center justify-start">
          <div class="flex items-center p-3" v-for="item in 5">
            <div class="mr-3">用户名</div>
            <div>
              <el-input placeholder="请输入用户名"></el-input>
            </div>
          </div>
          <div class="flex items-center p-3">
            <div class="mr-3">用户名</div>
            <div>
              <CustomInputNumber
                v-model="value"
                min="-100"
                max="100"
                precision="2"
                step="0.1"
                size="small"
              />
              (问题组件)
            </div>
          </div>
        </div>
      </template>
      <!-- 搜索按钮插槽 -->
      <template v-slot:searchButton>
        <div>
          <el-button type="warning">搜索</el-button>
          <el-button type="danger" @click="handleDelete()">重置</el-button>
          <el-button type="success">刷新</el-button>
        </div>
      </template>
      <!-- 数据表格插槽 -->
      <template v-slot:pageTable>
        <div class="overflow-auto">
          <el-table :data="tableData" stripe style="width: 100%" height="560px">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </div>
      </template>
      <!-- 分页插槽 -->
      <template v-slot:pagePagination>
        <div class="p-5">
          <Pagination
            v-if="totalPages > 0"
            v-model:total="totalPages"
            v-model:page="tableQueryData.pageNum"
            v-model:limit="tableQueryData.pageSize"
          />
        </div>
      </template>
      <!-- 自定义内容插槽 -->
      <template v-slot>
        <div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
        </div>
        <div>
          <div class="verify-box">
            <drag-verify-img-chip
              ref="dragVerifyImgChipRef"
              :imgsrc="img"
              :width="360"
              v-model:isPassing="isPassing"
              :showRefresh="true"
              :showTips="true"
              :text="$t('login.dragVerify.text')"
              :success-tip="$t('login.dragVerify.successTip')"
              :successText="$t('login.dragVerify.successText')"
              :fail-tip="$t('login.dragVerify.failTip')"
              :success-icon="CircleCheckFilled"
              :handler-icon="DArrowRight"
              handler-bg="#ccc"
            />
          </div>
        </div>

        <div class="h-10">
          <ImgPreview v-model="showImg" :imgs="imageList" />
        </div>
      </template>
    </PagePack>
    <div style="width: 200px; height: 200px; background-color: aqua">
      <img
        style="width: 200px; height: 200px"
        src="https://echarts.apache.org/zh/asset/lottie/json/images/img_0.png"
        @click="showImg = true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import CustomMessageBox from '../../../components/CustomMsgBox/msgBox'
import DragVerifyImgChip from '../../../components/DragVerifyImgChip/index.vue'
import { DArrowRight, CircleCheckFilled } from '@element-plus/icons-vue'
// 组件的状态和属性
const permissionName = ref('') // 设置默认值
const showToggleButton = ref(false)
const toggleValue = ref(false)
const totalPages = ref(1000)
const tableQueryData = reactive({
  pageNum: 5,
  pageSize: 10,
})
const showImg = ref(false)
const imageList = ref([
  'https://echarts.apache.org/zh/asset/lottie/json/images/img_0.png',
  // ... 其他图片链接
])
const handleDelete = () => {
  CustomMessageBox.confirm('确认是否删除文件', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 确认后的业务
    })
    .catch(() => {
      console.log('取消操作')
    })
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
