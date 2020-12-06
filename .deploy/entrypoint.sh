#!/bin/sh

echo "🎬 entrypoint.sh"
node ace migration:run --force
node server.js