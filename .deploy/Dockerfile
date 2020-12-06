# Build AdonisJS
FROM node:13-alpine

RUN apk add --no-cache git
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add --no-cache ffmpeg

RUN mkdir -p /home/node/app/
# Set working directory
WORKDIR /home/node/app
COPY package*.json ./
COPY .env.example ./.env

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV HOST=${HOST}

ENV DB_CONNECTION=${DB_CONNECTION}
ENV MYSQL_HOST=${MYSQL_HOST}
ENV MYSQL_PORT=${MYSQL_PORT}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_DB_NAME=${MYSQL_DB_NAME}

RUN npm install
COPY . .

RUN node ace generate:key

RUN node ace build
RUN node ace migration:run --force

EXPOSE 80
# Start server up
CMD [ "npm", "start", "build/server.js" ]