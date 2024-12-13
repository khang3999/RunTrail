#!bin/bash

# Add Docker's official GPG key:
sudo apt-get update -y
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# sudo docker pull 10102004tan/runtrailbe:latest

#change DB_HOST
# sudo docker run -d --restart=always  --name runtrailbe -e DB_HOST=18.138.250.249 -e DB_PORT:3306 -e DB_USER=root -e DB_PASS=runtrail123@  -p 8080:8080 10102004tan/runtrailbe

sudo docker run -d --restart=always --name runtrailbe -e DB_HOST=runtraildb -e DB_PORT:3306 -e DB_USER=root -e DB_PASS=runtrail123@ -e APP_PORT=8080  -p 8080:8080 10102004tan/runtrailbe
