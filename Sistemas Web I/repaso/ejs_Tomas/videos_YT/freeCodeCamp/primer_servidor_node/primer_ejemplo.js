const http = require('http');

const servidor = http.createServer((req, res) => {  // req -> request, res -> response
    // Proceso que queremos procesar al servidor??
    console.log('Solicitud nueva');
    res.end('Chanchito feliz'); // permite enviar la respuesta al cliente
});

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en: http://localhost:${PUERTO}.`);
});