## Деплой на сервер руками

1. Зайти на сервер по ssh
`ssh username@ip`

2. Склонировать репозиторий

3. Сблидить образ
`docker build -t <image_name> -f config/prod/Dockerfile .`

4. Запустить контейнер
`docker run -d -p 3000:3000 --name <container_name> <image_name>`

5. Сконфигурировать nginx

Открыть файл nginx.conf. Обычно он где-то в /etc/nginx/nginx.conf. Можно найти командой
`which nginx`

Добавить конфигурацию чтобы для http 80 port по рутовому пути / запросы проксировались на frontend localhost:3000

```sh
http {

    upstream nextjs {
            server localhost:3000;  # Service name and port of the first instance
    }

    server {
        listen 80;

        location / {
            proxy_pass http://nextjs;  # Forward requests to the upstream group
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

Перезапустить nginx

## Дополнение к домашнему заданию

Сейчас переменные окружения лежат прямо в /config/prod/Dockerfile нужно вынести их отдельно в файл .env.prod который будет лежать только на проде, в гите его быть не должно