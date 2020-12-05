FROM node:lts-buster

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json ./

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN sudo apt-get update
RUN sudo apt-get install build-essential

RUN npm i

USER node

EXPOSE 80

ENTRYPOINT ["node","ace","serve","--watch"]