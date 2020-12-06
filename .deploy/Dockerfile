# Build AdonisJS
FROM node:13-alpine as builder
# Workaround for now, since bodyparser install relies on Git
RUN apk add --no-cache git
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add --no-cache ffmpeg

# Set directory for all files
RUN mkdir -p /home/node/app/
# Set working directory
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV HOST=${PORT}

ENV DB_CONNECTION=${DB_CONNECTION}
ENV MYSQL_HOST=${MYSQL_HOST}
ENV MYSQL_PORT=${MYSQL_PORT}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_DB_NAME=${MYSQL_DB_NAME}

# Install all packages
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN node ace generate:key

# Expose port ${PORT} to outside world
EXPOSE ${PORT}
# Start server up
CMD [ "node", "ace", "serve" ]