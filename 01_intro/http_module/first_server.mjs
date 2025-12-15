// 1. Импорт вместо require
import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Привет! Я работаю на ES Modules (import/export)');
});

server.listen(port, hostname, () => {
    console.log(`Сервер запущен на http://${hostname}:${port}/`);
});