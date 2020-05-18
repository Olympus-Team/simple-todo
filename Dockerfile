#image gốc
FROM node:12.16.1

# Copy file, thư mục từ host machine vào image. Có thể sử dụng url cho tập tin cần copy.
COPY . /opt/app

# Định nghĩa directory cho CMD
WORKDIR /opt/app

# Để thực thi một câu lệnh nào đó trong quá trình build images.
RUN yarn

# Để thực thi một câu lệnh trong quá trình bật container
CMD yarn dev