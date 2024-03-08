# 安装Node.js
FROM node:latest

# 创建工作目录
WORKDIR /app

# 将node_modules添加到工作目录
COPY package.json .
RUN npm install
RUN npm install -g npm@8.1.3
RUN npm install -g @vue/cli@4.5.15

# 将所有文件复制到工作目录
COPY . .

# 编译前端项目
RUN yarn build

# 产生静态文件
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
