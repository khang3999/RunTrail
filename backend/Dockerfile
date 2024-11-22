# Sử dụng image chứa Maven và OpenJDK
FROM maven:3.8-openjdk-17 as build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép mã nguồn vào container
COPY . .

# Chạy lệnh Maven để build ứng dụng, bỏ qua test
RUN mvn clean package -DskipTests

# Sử dụng image OpenJDK để chạy ứng dụng
FROM openjdk:17

# Sao chép file JAR đã build từ build stage vào container
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app1.jar

# Mở cổng 8008
EXPOSE 8008

# Thiết lập entrypoint để chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app1.jar"]
