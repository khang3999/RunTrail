docker build -t runtrailbe .
docker run --name runtrailbe -e MYSQL_ROOT_PASSWORD=runtrail123@ -e DB_USERNAME=root -e DB_PASS=runtrail123@ -e DB_URL='jdbc:mysql://runtraildb:3306/runtraildb?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&allowPublicKeyRetrieval=true' --network=runtrail-net  -p 8008:8008 chiendevj/runtrailbe
