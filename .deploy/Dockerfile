FROM node:lts-buster

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json ./

RUN apk add --no-cache git

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN apt-get install -y build-essential python

RUN npm i

USER node

EXPOSE 80

ENTRYPOINT ["node","ace","serve","--watch"]