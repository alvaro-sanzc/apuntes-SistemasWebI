// Importar los módulos necesarios
const http = require('http');
const os = require('os');
const fs = require('fs');

// Leer la configuración desde el archivo config.json
let config;
try {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (error) {
    console.error("Error al leer el archivo de configuración:", error);
    process.exit(1);
}

// Obtener la versión de Node.js y la información del sistema
console.log("Servidor iniciado");
console.log("Versión de Node.js:", process.version);
console.log("Sistema operativo:", os.type());
console.log("Versión del sistema operativo:", os.release());
console.log("Arquitectura de CPU:", os.arch());

// Función para mostrar información periódica
function mostrarInfoSistema() {
    // Uso de CPU
    const cpus = os.cpus();
    const usoCPU = cpus.map((cpu, i) => {
        const tiempos = cpu.times;
        const uso = ((1 - tiempos.idle / (tiempos.user + tiempos.nice + tiempos.sys + tiempos.irq + tiempos.idle)) * 100).toFixed(2);
        return `CPU ${i}: ${uso}%`;
    }).join(", ");

    // Uso de memoria
    const usoMemoria = ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2);

    // Tiempo activo del sistema
    const tiempoSistema = os.uptime();

    // Tiempo activo de Node.js
    const tiempoNode = process.uptime();

    // Mostrar la información en consola
    console.log(`\n--- Información del sistema ---`);
    console.log("Uso de CPU:", usoCPU);
    console.log(`Uso de memoria: ${usoMemoria}%`);
    console.log(`Tiempo que el sistema lleva activo: ${tiempoSistema} segundos`);
    console.log(`Tiempo que Node.js lleva ejecutándose: ${tiempoNode.toFixed(2)} segundos`);
}

// Crear un servidor HTTP básico
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor de información del sistema en ejecución\n');
});

// Configurar el intervalo de tiempo para mostrar la información
const intervaloMs = config.intervaloSegundos * 1000;
setInterval(mostrarInfoSistema, intervaloMs);

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
