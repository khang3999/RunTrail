
FROM openjdk:17

# copy file jar vào container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Thiết lập entrypoint để chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
