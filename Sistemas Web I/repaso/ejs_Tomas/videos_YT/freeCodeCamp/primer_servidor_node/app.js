const http = require('http');

const server = http.createServer((req, res) => {  
    console.log('===> res (respuesta)');
    console.log(res.statusCode);
    res.end('Chanchito feliz');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`El servidor esta escuchando en: http://localhost:${PORT}.`);
});