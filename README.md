# Laravel Auction

[![](https://todo-adonisjs.github.uz/img/screenshot.jpg)](https://todo-adonisjs.github.uz/)

# Demo
[https://todo-adonisjs.github.uz/](https://todo-adonisjs.github.uz/ "https://todo-adonisjs.github.uz/")

# Installation
```bash
git clone https://github.com/ismoil-nosr/todo-adonisjs.git
cd todo-adonisjs/
npm i
cp .env.example .env # don't forget to set env values 
node ace migration:run --force
npm run dev # for development
```

## Docker
First create an image:

    sudo docker build -f ./.deploy/Dockerfile -t todo_adonisjs

Then run container:

    sudo docker run -d -t -i -e NODE_ENV='development' \ 
	-e APP_KEY=app_secret_key \
	-e PORT=80 \
	-e HOST=0.0.0.0 \
    -e DB_CONNECTION='mysql' \
    -e MYSQL_HOST='mysql_server' \
    -e MYSQL_PORT='3306' \
    -e MYSQL_USER='todo_adonisjs' \
    -e MYSQL_PASSWORD='password \
	-e MYSQL_DB_NAME='todo_adonisjs' \
    -p 80:80 \
	-p 443:443\
    --name todo_adonisjs

## Docker-compose
```bash
git clone https://github.com/ismoil-nosr/todo-adonisjs.git
cd todo-adonisjs/
docker-compose up -d
```