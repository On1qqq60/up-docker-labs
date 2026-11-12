# Задание 1. Команды

Docker Desktop уже установлен (проверяется `docker version`). Ниже те же шаги, что в методичке.

```bash
docker run hello-world
docker run --name MyUbuntu2204 ubuntu:22.04
docker rm MyUbuntu2204
docker run -it --name MyUbuntu2204 ubuntu:22.04 /bin/bash
docker run -it -e "MyVar=TTIT" --name MyUbuntu2304 ubuntu:23.04 /bin/bash
# внутри контейнера: echo $MyVar
docker run -it -v "/home/user/app_docker/:/mnt" --name MyUbuntu2304_1 ubuntu:23.04 /bin/bash
docker ps -a
docker run --name MyWebServer -p 8080:80 -d nginx
# браузер: http://127.0.0.1:8080  затем удалить контейнер
docker rm -f MyWebServer
docker volume create mysql_volume
docker run -v mysql_volume:/var/lib/mysql --name MySQL -e MYSQL_ROOT_PASSWORD=passwd -d mysql:8.0
docker run --name PhpMyAdmin -d --link MySQL:db -p 8081:80 phpmyadmin/phpmyadmin
docker network create -d bridge docker_network
docker stop MySQL PhpMyAdmin
docker rm MySQL PhpMyAdmin
docker run -v mysql_volume:/var/lib/mysql --network docker_network --name MySQL -e MYSQL_ROOT_PASSWORD=passwd -d mysql:8.0
docker run --name PhpMyAdmin -d --network docker_network -e PMA_HOST=MySQL -p 8081:80 phpmyadmin/phpmyadmin
```

Порт phpMyAdmin в этих командах — 8081, чтобы не пересечься с Nginx на 8080. В методичке оба примера используют 8080 по очереди: сначала контейнер Nginx удаляют.

Остановить и убрать учебные контейнеры:

```bash
docker rm -f MyWebServer MySQL PhpMyAdmin MyUbuntu2204 MyUbuntu2304 MyUbuntu2304_1
docker network rm docker_network
```
