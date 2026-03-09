const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

// URL de la página que deseas extraer
const url = 'https://google.com';

// Función para descargar y procesar el HTML
async function descargarProcesarHTML() {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        // Aquí extraes la información específica
        // Ejemplo: extraer el texto de un elemento con una clase particular
        const extraerInfo = $('.clase-especifica').text();

        console.log(`Información extraída: ${extraerInfo}`);
    } catch (error) {
        console.error(`Error al extraer datos: ${error.message}`);
    }
}

// Configuración de la tarea programada (cada hora en este caso)
cron.schedule('0 * * * *', descargarProcesarHTML);

console.log('Scraper inicializado. Esperando próxima ejecución...');