docker run --restart=always --name runtraildb -e MYSQL_ROOT_PASSWORD=runtrail123@ -e MYSQL_DATABASE=runtraildb --network=runtrail-net -p 3306:3306 -d 10102004tan/runtraildb
