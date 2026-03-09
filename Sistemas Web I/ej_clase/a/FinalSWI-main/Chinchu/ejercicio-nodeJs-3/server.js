const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

// Ruta para descargar y procesar la información
app.get('/scrape', async (req, res) => {
    try {
        // Descargar el HTML de la página web
        const { data } = await axios.get('https://www.npmjs.com/package/cheerio');

        // Procesar el HTML con cheerio para extraer información específica
        const $ = cheerio.load(data);
        const informacionExtraida = $('._6d9832ac').text();

        // Mostrar el contenido html de la pagina en consola.
        console.log('Información extraída:', informacionExtraida);

        res.send('Proceso completado. Dirijase a la consola para que te muestre el contenido de la pagina.');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error en el servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}/scrape`);
});
