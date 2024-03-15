<template>
  <div>
    <exitButton />
    <br />
    <el-select v-model="queryParams.type" placeholder="请选择类型" clearable style="width: 240px">
      <el-option
        v-for="dict in getDictDatas(DICT_TYPE.SYSTEM_OPERATE_TYPE)"
        :key="parseInt(dict.value)"
        :label="dict.label"
        :value="parseInt(dict.value)"
      />
    </el-select>
    <br />

    <el-button class="mt-3" @click="aBtn">弹框</el-button>
  </div>
</template>

<script setup>
import { getDictDatas } from '@/utils/dict'
import { DICT_TYPE } from '@/utils/dict'
import { useMessage } from '@/hooks/web/useMessage.ts'
const message = useMessage() // 消息弹窗
let queryParams = reactive({
  type: '',
})
onMounted(() => {
  // console.log(getDictDatas(DICT_TYPE.SYSTEM_OPERATE_TYPE))
})
const aBtn = () => {
  // $modal.msgSuccess('获取验证码成功')
  message.success(t('systemManager.userManager.username'))
}
</script>

<style lang="scss" scoped></style>
