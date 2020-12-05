#!/bin/sh

echo "🎬 entrypoint.sh"

cp .env.example .env
npm i

echo "🎬 run "

node ace serve --watch