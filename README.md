# Vue3 项目

## 🐑 分支

main------------>基于 Vue3+TypeScript+Pinia+Vite+vue-router+Element Plus 框架，从零搭建

luckyDev-------->上面的分支

luckyPlus------->抽取若依vue3plus框架的优点整合到自身框架中

lucky-------->同事使用的测试学习分支

test------------>个人使用学习测试分支

## 🐶 开发环境

node 16+

包管理采用 pnpm

```shell
npm install -g pnpm
pnpm install
```

## 🐯 代码提交规范

husky 是一个 Git Hook 工具，可以让你在 Git 提交过程中自动运行脚本。

当 commit 的时候会执行脚本，脚本会校验 commit message 是否符合规范。

严格按照如下规范:

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能                   |
| fix      | 修补 bug                 |
| docs     | 文档                     |
| style    | 格式方面的优化           |
| refactor | 重构                     |
| test     | 测试                     |
| chore    | 构建过程或辅助工具的变动 |

比如修复一个 bug 必须是

fix: 修复 bug

中间有:后面有空格

## ⭐️ 开发工具

推荐 VS Code 开发，配合插件如下：

| 插件名                        | 功能                                             |
| ----------------------------- | ------------------------------------------------ |
| TypeScript Vue Plugin (Volar) | 用于 TypeScript 的 Vue 插件                      |
| Vue Language Features (Volar) | Vue3.0 语法支持                                  |
| WindiCSS IntelliSense         | 自动完成、语法突出显示、代码折叠和构建等高级功能 |
| Iconify IntelliSense          | Iconify 预览和搜索                               |
| i18n Ally                     | 国际化智能提示                                   |
| Stylelint                     | Css 格式化                                       |
| Prettier                      | 代码格式化                                       |
| ESLint                        | 脚本代码检查                                     |
| DotENV                        | env 文件高亮                                     |

## 🚀 优势

1、自动按需引入组件，自动按需引入 Vue 相关 API，自动引入 ep 图标

2、在 vscode 提交时候走 husky 流程，先走格式化代码和修复，以及提交必须走提交规范,代码有错误则不能提交

## 🐷 其他

删除node包

```shell
npm install -g rimraf
```

配置 scripts 中 clean

配置本地公网访问，启动项目后另启一个终端输入

```shell
npx localtunnel --port 8000
```

选y，点击链接跳转，点网站里的链接获取密码，复制粘贴提交

本地打包进行接口调试

```shell
pnpm i local-http-preview
```

配置 scripts 中 "preview": "npx local-http-preview",

(这个地址为后台的api地址)，或者nginx通过域名反向代理

```shell
npm run preview https://luckynwa.top
```

方法1：

先build打包，只需配置dockerfile文件即可，
配置如下

```
FROM nginx:latest
LABEL Author luckynwa
COPY dist /usr/share/nginx/html

```

制作镜像
docker build -t luckyvue3 .
docker images
发布到hub库
docker login
前面镜像弄的比较快，名字luckyvue3
修改镜像名称
docker tag luckyvue3 luckynwa6/luckyvue3:1.0
发布
docker push luckynwa6/luckyvue3:1.0

方法2：
docker compose up --build -d
