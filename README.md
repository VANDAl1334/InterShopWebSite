# InterShopWebSite

Для того, чтобы развернуть данное веб-приложение на nginx создайте конфигурационный файл сайта следующего вида:

server
{
        location / {
                root $dir;
                autoindex on;
        }
        location /api/ {
                proxy_pass http://localhost:xxxx;
        }
}

где $dir это путь к папке wwwroot, xxxx - порт WebAPI-сервера