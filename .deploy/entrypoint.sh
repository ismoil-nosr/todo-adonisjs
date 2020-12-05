#!/bin/sh

echo "🎬 entrypoint.sh"

cp .env.example .env

echo "🎬 run production"

node ace build --production
cd build/server
npm i
node server.jsd