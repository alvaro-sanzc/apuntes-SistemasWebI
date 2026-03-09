const http = require('http');
const osUtils = require('os-utils');
const fs = require('fs');
const os = require("os");

// Cargar configuración desde un archivo JSON
const config = JSON.parse(fs.readFileSync("config.json"));

// Función para mostrar información del sistema y versión de Node.js al inicio
function showSystemInfo() {
    console.log(`Sistema operativo: ${process.platform}`);
    console.log(`Versión de Node.js: ${process.version}`);
}

// Función para mostrar estadísticas periódicas
function showStats() {
    osUtils.cpuUsage(function (cpuUsage) {
        console.log(`Uso de CPU: ${cpuUsage * 100}%`);
        console.log(`Uso de memoria: ${osUtils.freememPercentage()}% libre`);
        console.log(`Tiempo que el sistema lleva activo: ${os.uptime()} segundos`);
        console.log(`Tiempo que lleva ejecutándose Node.js: ${process.uptime()} segundos`);
    });
}

// Crear y configurar el servidor HTTP
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor en ejecucion.');
});

server.listen(3000, 'localhost', () => {
    console.log('Servidor en ejecucion en http://localhost:3000');
    showSystemInfo();

    // Mostrar estadísticas periódicamente según la configuración
    setInterval(showStats, config.updateInterval * 1000);
});
