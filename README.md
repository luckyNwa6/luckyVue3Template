# Vue3项目模板

## 环境

测试lucky分支
node 16+
技术栈 vue3+ts+pinia+vite+vue-router
包管理采用pnpm

## 代码提交规范

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能（feature）        |
| fix      | 修补 bug                 |
| docs     | 文档（documentation）    |
| style    | 格式方面的优化           |
| refactor | 重构                     |
| test     | 测试                     |
| chore    | 构建过程或辅助工具的变动 |

## husky说明

```shell
#!/usr/bin/env sh

# 引入 husky.sh 脚本

. "$(dirname -- "\$0")/\_/husky.sh"

# 运行 npm 的 format 和 fix 命令

npm run format && npm run fix

# 将所有修改的文件添加到 Git 暂存区

git add .

```

自动导入的vue里的ref watch 等
npm i -D unplugin-auto-import -force

自动引入组件 少了import {}...
npm i unplugin-vue-components -D -force

npm i unplugin-icons -D -force
