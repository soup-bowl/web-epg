#!/bin/sh
set -e

mkdir -p /usr/share/nginx/html/bgm
node /opt/list-bgm.mjs /usr/share/nginx/html/bgm /usr/share/nginx/html/playlist.json

exec /docker-entrypoint.sh "$@"
