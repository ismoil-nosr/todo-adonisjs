FROM node:13.8.0-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY ./.deploy/entrypoint.sh /
COPY --chown=node:node . .

EXPOSE 80

USER node

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]