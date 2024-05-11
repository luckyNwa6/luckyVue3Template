# 安装Node.js
FROM node:16.20.1 AS development

# 创建工作目录
WORKDIR /app

# 将node_modules添加到工作目录
COPY package*.json ./
RUN npm install --force
RUN npm install -g npm@8.1.3
RUN npm install -g @vue/cli@4.5.15

# 将所有文件复制到工作目录
COPY . .

# 编译前端项目
RUN npm run build

FROM development As build

# 产生静态文件
FROM nginx:latest

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT [ "nginx","-g","daemon off;"]
