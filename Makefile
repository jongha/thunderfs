DIR=/data/thunderfs

start:
	/usr/local/bin/uwsgi --ini $(DIR)/conf/uwsgi.ini 2>/dev/null; true

stop:
	/usr/local/bin/uwsgi --stop /tmp/thunderfs.pid 2>/dev/null; true

restart:
	make stop
	sleep 2
	make start
	sleep 2
	service nginx restart

deploy:
	pybabel compile -d $(DIR)/src/web/application/translations
	cd $(DIR)/src/script
	grunt
	cd $(DIR)
	$(DIR)/bin/stop.sh
	sleep 3
	$(DIR)/bin/start.sh
	sleep 3
	service nginx restart

clean:
	mongo localhost:27017/thunderfs $(DIR)/bin/clear-chunks.js

.PHONY: start stop restart deploy clean