## Build the image from a dockerfile located in docker folder
docker build -t img-app-ecommercenestjs -f docker/dockerfile .


## Basic way
docker build .

## Run container based on images
docker run -p 3001:3000 ecf7535c9c4ed24529b6e8911080cc881b050fbcc59d18483f25e3d6299c0a58

## List containers
docker ps 

## Stop specific container
docker stop container_name

## http://localhost en docker es
http://host.docker.internal

## create network
docker network create network-name

## list networks
docker network ls

## docker stop postgres
docker stop postgresdb

## Remove docker container
docker rm postgresdb

## Connect to another database
docker run -name postgresdbcontainer -e POSTGRES_PASSWORD=root -e POSTGRES_DB=demo-db --network network-name -d postgre -v pgdata:/var/lib/postgressql/data

## Run a container
docker run -p 3001:3000 --network network-name docker-container-name




