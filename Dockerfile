# 使用官方的 Node.js 镜像作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器中
COPY package*.json ./

# 安装依赖
RUN npm install

# 将项目文件复制到容器中
COPY . .

# 构建项目
RUN npm run build

# 安装一个简单的 HTTP 服务器来提供服务
RUN npm install -g serve

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["serve", "-s", "build"]