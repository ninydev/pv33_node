const http = require('http');

// Читаем переменные окружения
const PORT = process.env.PORT || 3000;
const SERVER_NAME = process.env.SERVER_NAME || 'Default-Server';

const server = http.createServer((req, res) => {
    // Устанавливаем заголовок, что возвращаем JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Формируем ответ
    const data = {
        status: "OK",
        addCode: "This is additional code",
        server_name: SERVER_NAME,
        port: PORT,
        url: req.url, // какой путь запросили
        method: req.method // GET, POST и т.д.
    };

    // Отправляем JSON
    res.end(JSON.stringify(data, null, 2));
});

server.listen(PORT, () => {
    console.log(`🚀 Сервер "${SERVER_NAME}" запущен на порту ${PORT}`);
});