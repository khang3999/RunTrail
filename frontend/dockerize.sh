docker build -t runtrail-nextjs .

docker network create runtrail-net

docker run -d --name runtrail-nextjs --network=runtrail-net  -p 3001:80 10102004tan/frontend
