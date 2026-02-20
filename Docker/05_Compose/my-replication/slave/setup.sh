#!/bin/bash
echo "Waiting for master to start..."
sleep 10 # Даем время мастеру точно запуститься

mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CHANGE MASTER TO MASTER_HOST='mysql-master', MASTER_USER='replicator', MASTER_PASSWORD='repl_password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=157;"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "START SLAVE;"