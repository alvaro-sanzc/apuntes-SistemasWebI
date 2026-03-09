const http = require("http");
const url = require("url");

// Diccionario de palabras para generar la contraseña
const dictionary = [
    "cielo", "rojo", "tierra", "luz", "sonrisa", "fuego", "lluvia", 
    "viento", "piedra", "flor", "río", "sol", "estrella", "nieve", 
    "montaña", "libro", "mar", "noche", "deseo", "música"
];

// Función para generar una contraseña aleatoria con X palabras
function generatePassword(wordCount) {
    let password = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        password.push(dictionary[randomIndex]);
    }
    return password.join("-"); // Concatenamos las palabras con un guion
}

// Servidor HTTP
const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const wordCount = parseInt(queryObject.X) || 3; // Valor por defecto: 3 palabras

    // Genera la contraseña y muestra en la página principal
    if (req.url.startsWith("/")) {
        const password = generatePassword(wordCount);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Tu contraseña aleatoria es: ${password}`);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Página no encontrada");
    }
});

// Configuración del puerto
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
