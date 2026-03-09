const http = require('http');
const os = require('os');
const fs = require('fs');

const port = 3000;

// Leer la configuración desde un archivo JSON
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const interval = config.interval;

// Función para mostrar información del sistema y versión de Node.js
function showSystemInfo() {
    console.log(`Sistema operativo: ${os.platform()} ${os.release()}`);
    console.log(`Versión de Node.js: ${process.version}`);
}

//Funcion que muestra por consola la información
function showInfo() {
    console.log(`Uso de CPU: ${os.loadavg()[0].toFixed(2)}%`);
    console.log(`Uso de memoria: ${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`);
    console.log(`Tiempo activo del sistema: ${os.uptime().toFixed(0)} segundos`);
    console.log(`Tiempo activo de Node.js: ${process.uptime().toFixed(0)} segundos`);
    console.log('------------------');
}

//Funcion que muestra la info de forma periódica
function periodic(){
    setInterval(showInfo, interval);
}

//Creamos servidor httpd
const server = http.createServer((req, res) => {
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');
});

// Iniciar el servidor en el puerto 3000
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
    showSystemInfo();
    periodic();
});
