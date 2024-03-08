# 自定义 MessageBox

- 将 element plus 的 MessageBox 的样式改为符合四信内部 UI 设计规范的 MessageBox

## 作者

- 公共研发组前端 周晓鹏

## 使用

```vue
<template>
  <div @click="handleDelete">删除文件</div>
</template>
<script setup>
import CustomMessageBox from '@/components/CustomMsgBox/msgBox';

const handleDelete = () => {
  CustomMessageBox.confirm('确认是否删除文件', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 确认后的业务
    })
    .catch(() => {
      console.log('取消操作');
    });
};
</script>
```

## API

- 参考[Element Plus MessageBox API](https://element-plus.org/zh-CN/component/message-box.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)
