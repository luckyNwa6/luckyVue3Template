<template>
  <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit" @tab-click="handleClick()">
    <el-tab-pane v-for="tag in tags" :key="tag.name" :label="tag.title" :name="tag.name"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import type { TabPaneName } from 'element-plus'

const tags = ref([
  {
    title: '首页',
    name: '1',
    path: '/',
  },
  {
    title: '用户管理',
    name: '2',
    path: '/user',
  },
  {
    title: '权限管理',
    name: '3',
    path: '/power',
  },
  {
    title: '商品管理',
    name: '4',
    path: '/goods',
  },
])
//获取路由器
let $router = useRouter()
//路由对象
let $route = useRoute()
onMounted(() => {
  // lucky.star($route.meta.title)
  // initTags();
})

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleClick = () => {
  $router.push({ path: '/' })
}

const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter(tab => tab.name !== targetName)
  }
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
