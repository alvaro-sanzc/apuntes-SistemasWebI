const http = require('http');
const fs = require('fs');

// Función para generar la contraseña aleatoria
function generarContrasenna(numPalabras) {
    // Lectura del archivo diccionario.json
    const palabras = JSON.parse(fs.readFileSync('diccionario.json'));

    // A traves del url podemos indicar el numero de palabras que queremos que tenga la contraseña
    // Ejemplo: http://localhost:3000/?numPalabras=5
    const contrasennaArray = [];
    for (let i = 0; i < numPalabras; i++) {
        const palabraIndex = Math.floor(Math.random() * palabras.length);
        contrasennaArray.push(palabras[palabraIndex]);
    }

    // Unir las palabras escogidas del diccionario y unirlas para crear la contraseña aleatoria
    const contrasenna = contrasennaArray.join('');

    return contrasenna;
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    // Obtener el parámetro 'numPalabras' de la query
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    // Por defecto generara una contraseña con 3 palabras
    const numPalabras = parseInt(urlParams.searchParams.get('numPalabras')) || 3;

    // Generar la contraseña
    const contrasenna = generarContrasenna(numPalabras);

    // Respuesta JSON
    const jsonResponse = {
        Contrasenna: contrasenna,
        NumeroDePalabras: numPalabras
    };

    // Enviar la respuesta al cliente
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(jsonResponse));
});

const port = 3000;
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
