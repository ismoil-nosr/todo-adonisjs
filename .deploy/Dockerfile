FROM node:lts-buster

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json ./

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN apt-get update
RUN apt-get install build-essential

RUN npm i
RUN node ace build

COPY .env.example ./.env

RUN node ace generate:key
RUN node ace build
RUN node ace migration:run --force

EXPOSE 80

ENTRYPOINT ["node","ace","serve","--watch"]