#image gốc
FROM node:12.16.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy file, thư mục từ host machine vào image. Có thể sử dụng url cho tập tin cần copy.
COPY package*.json ./

# Để thực thi một câu lệnh nào đó trong quá trình build images.
RUN npm install


COPY . .

# Để thực thi một câu lệnh trong quá trình bật container
CMD [ "npm", "start" ]