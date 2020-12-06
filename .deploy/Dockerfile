# Build AdonisJS
FROM node:13-alpine as builder
# Workaround for now, since bodyparser install relies on Git
RUN apk add --no-cache git
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
# Set directory for all files
WORKDIR /home/node
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN npm run build --production


# Install packages on different step,
# since bodyparser install requires git
# but runtime does not need it
FROM node:13-alpine as installer
# Workaround
RUN apk add --no-cache git
# Set directory for all files
WORKDIR /home/node
# Copy over package.json files
COPY package*.json ./
# Install only prod packages
RUN npm ci --only=production


# Build final runtime container
FROM node:13-alpine
# Set environment variables
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV HOST=${PORT}

ENV DB_CONNECTION=${DB_CONNECTION}
ENV MYSQL_HOST=${MYSQL_HOST}
ENV MYSQL_PORT=${MYSQL_PORT}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_DB_NAME=${MYSQL_DB_NAME}

# Disable .env file loading
ENV ENV_SILENT=true

# Install deps required for this project
RUN apk add --no-cache ffmpeg
# Use non-root user
USER node
# Make directory for app to live in
# It's important to set user first or owner will be root
RUN mkdir -p /home/node/app/
# Set working directory
WORKDIR /home/node/app
# Copy over required files from previous steps
# Copy over built files
COPY --from=builder /home/node/build ./build
# Copy over node_modules
COPY --from=installer /home/node/node_modules ./node_modules
# Copy over package.json files
COPY package*.json ./

# Expose port ${PORT} to outside world
EXPOSE ${PORT}
# Start server up
CMD [ "node", "./build/server.js" ]