#!/bin/sh

echo "🎬 entrypoint.sh"
node ace migration:run --force --seed
node server.js