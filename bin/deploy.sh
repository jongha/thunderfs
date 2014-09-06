#!/usr/bin/env bash

pybabel compile -d /thunderfs/src/web/application/translations

cd /thunderfs/src/script

grunt

cd /thunderfs

/thunderfs/bin/stop.sh

sleep 3

/thunderfs/bin/start.sh

sleep 3

/usr/local/nginx/sbin/nginx -s stop

/usr/local/nginx/sbin/nginx