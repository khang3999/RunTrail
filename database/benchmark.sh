sudo apt install mysql-client

sudo mysql -h 127.0.0.1 -P 3308 -u root -p

sysbench oltp_read_write --mysql-host=127.0.0.1 --mysql-port=3308 --mysql-user=root --mysql-password=runtrail123@ \
--mysql-db=sbtest --tables=10 --table-size=10000 prepare

sysbench oltp_read_write --mysql-host=127.0.0.1 --mysql-port=3308 --mysql-user=root --mysql-password=runtrail123@ \
--mysql-db=sbtest --tables=10 --table-size=10000 --threads=4 --time=60 run
