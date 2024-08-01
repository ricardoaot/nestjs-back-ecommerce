## Build the image from a dockerfile located in docker folder
docker build -t img_app_ecommercenestjs -f docker/dockerfile .


## Basic way
docker build .

## Run container based on images
docker run --name cont_app_ecommerce -p 3001:3000 ecf7535c9c4ed24529b6e8911080cc881b050fbcc59d18483f25e3d6299c0a58

docker run --name cont_app_ecommerce -p 3001:3000 img_app_ecommercenestjs


## List containers
docker ps 

## Stop specific container
docker stop container_name

## Conect from Docker to other apps located in http://localhost 
http://host.docker.internal

## create network
docker network create net_app_ecommerce

## list networks
docker network ls

## docker stop postgres
docker stop postgresdb

## Remove docker container
docker rm postgresdb

## Connect to another database
## Run postgres container
docker run --name cont_postgresdb -e POSTGRES_PASSWORD=example -e POSTGRES_DB=demo-db --network net_app_ecommerce -d postgres -v pgdata:/var/lib/postgresql/data

## Run a container in an specific network
docker run --name docker-container-name -p 3001:3000 --network network-name docker-image-name

docker run --name cont_app_ecommerce -p 3001:3000  --network net_app_ecommerce img_app_ecommercenestjs

## Run docker Compose
docker-compose up


## Deploy in Render from Docker image
Public url or name of my repo:
ricardoaot/nest-ecommerce:latest