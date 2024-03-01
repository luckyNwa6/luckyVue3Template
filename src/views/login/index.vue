<template>
  <div>
    <el-button type="primary" :icon="Edit" size="small">world</el-button>

    <hr />
    默认是英文的，需要main那修改配置
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
    <hr />

    <h1>测试svg,用xlink:herf执行哪一个图标#icon-图标名称</h1>
    <svg style="width: 30px; height: 30px">
      <use xlink:href="#icon-phone" fill="pink"></use>
    </svg>
    <SvgIcon name="phone" color="blue"></SvgIcon>
    <div class="testColor">lucky小维</div>

    <hr />
    <div>{{ luckyC }}</div>
    <hr />
    <div>
      hooks混入,也很好用：点击变化，当前x的值：{{ x }},当前y的值是：{{ y }}
    </div>
    <hr />
    <TestA />
    <hr />
    这是elementui图标按需导入也不要注册
    <i-ep-add-location />
    <i-ep-aim />
    <hr />
    这是elementui组件按需自动导入
    <el-button :plain="true" @click="open">Show message</el-button>
    <hr />
    这里测试mockjs模拟的数据
    <el-button :plain="true" @click="login">登录</el-button>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit } from '@element-plus/icons-vue' //这种的需要手动导，TODO
// import SvgIcon from '@/components/SvgIcon/index.vue'
// import request from '@/utils/request'
import { reqLogin } from '@/api/user'
import useMousePosition from '@/hooks/useMousePosition' //混入

let luckyC = ref('ref类似定义data里的值')

const { x, y } = useMousePosition()
const form = reactive({
  //一般表单用这个
  username: 'admin',
  password: '111111',
})
const open = () => {
  ElMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  })
}
const login = () => {
  reqLogin(form).then((res: any) => {
    console.log(res)
  })
}
// onMounted(() => {
//   // request({
//   //   url: '/user/login',
//   //   method: 'post',
//   //   data: {
//   //     username: 'admin',
//   //     password: '111111',
//   //   },
//   // }).then((res) => {
//   //   console.log(res)
//   // })
//   reqLogin({ username: 'admin', password: '111111' }).then((res: any) => {
//     console.log(res)
//   })
// })
</script>

<style lang="scss" scoped>
.testColor {
  color: $base-color;
}
</style>
