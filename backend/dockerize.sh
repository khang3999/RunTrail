docker build -t runtrailbe .
docker run  --name runtrailbe2 -e DB_HOST=runtraildb  -e DB_NAME=runtraildb -e DB_PORT:3306 -e DB_USER=root -e DB_PASS=runtrail123@ --network=runtrail-net -p 8080:8080 -d runtrailbe

.\mvnw clean package -DskipTests