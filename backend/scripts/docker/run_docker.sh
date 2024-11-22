-- Active: 1720499977436@@127.0.0.1@3306
docker run -d --name RunTrail -p 3303:3306 -e MYSQL_ROOT_PASSWORD="runtrail123@" mysql:8.0
docker exec -it RunTrail bash
mysql -u root -p
create database runtraildb;

docker run --name mysql-standalone -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=test -e MYSQL_USER=sa -e MYSQL_PASSWORD=password -d mysql:8.0
