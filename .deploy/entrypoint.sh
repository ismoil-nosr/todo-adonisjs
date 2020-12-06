#!/bin/sh
ls
echo "🎬 entrypoint.sh"
cp $APP_PATH/.env.example $APP_PATH/.env

npm run-script build
cp $APP_PATH/.env $APP_PATH/build/.env

echo "🎬 run production"
cd build
npm ci --production
node server.js