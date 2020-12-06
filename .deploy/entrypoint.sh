#!/bin/sh

echo "🎬 entrypoint.sh"
cp $APP_PATH/.env.example $APP_PATH/.env

npm run-script build
cp $APP_PATH/.env $APP_PATH/build/.env

echo "🎬 node commands"

node $APP_PATH/build/server.js