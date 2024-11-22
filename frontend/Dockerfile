
# Nginx
FROM nginx:1.21.0-alpine

# Sao chép tệp cấu hình của Nginx từ máy local vào container
# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/share/nginx/html

# COPY tat ca trong folder frontend (source cua minh) vao trong container
COPY ./out .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]