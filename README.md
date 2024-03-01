# husky说明

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
