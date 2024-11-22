docker build -t runtrail-nextjs .

docker network create runtrail-net

docker run -d --name runtrail-nextjs --network=runtrail-net  -p 3000:3000 runtrail-nextjs
