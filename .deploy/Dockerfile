# Build AdonisJS
FROM node:lts-buster-slim

# Set working directory
ENV APP_PATH=/srv/app
WORKDIR /home/node/app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential cron curl locales zip unzip git python2

# Copy app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

# Copy app
COPY --chown=www-data:www-data . $APP_PATH/
RUN chown -R www-data:www-data $APP_PATH
RUN chmod -R 775 $APP_PATH/public

# Set any ENVs
ARG NODE_ENV=${NODE_ENV}
ARG APP_KEY=${APP_KEY}
ARG PORT=${PORT}
ARG HOST=${HOST}

ARG DB_CONNECTION=${DB_CONNECTION}
ARG MYSQL_HOST=${MYSQL_HOST}
ARG MYSQL_PORT=${MYSQL_PORT}
ARG MYSQL_USER=${MYSQL_USER}
ARG MYSQL_PASSWORD=${MYSQL_PASSWORD}
ARG MYSQL_DB_NAME=${MYSQL_DB_NAME}

# Start app
EXPOSE 80 443
COPY ./.deploy/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]