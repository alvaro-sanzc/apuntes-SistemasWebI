const http = require("http");
const https = require("https");
const { data } = require("jquery");
const jquery = require("jquery");
const jsdom = require("jsdom");
const { stdout } = require("process");

// Obtenemos el puerto de los argumentos. Si no se especifica, se toma el puerto 3000
const port = !isNaN(Number(process.argv[2])) ? Number(process.argv[2]) : 3000;

// Expresión regular que se usará para comprobar que los enlaces solicitados son correctos
const IMDB_REGEX = /^(?:https:\/\/www\.|http:\/\/www\.|www\.)?imdb.com\/title\/.+$/

// Creamos un servidor
const server = http.createServer((req, res) => {
    // Añadimos las cabeceras adecuadas para permitir peticiones de origen cruzado
    res.setHeader("Access-Control-Allow-Origin", "*");          // Se permite cualquier origen
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Si se recibe una petición, se comprueba que el tipo de petición es POST
    if (req.method == "POST") {
        // Si es una petición post, verificamos que la página solicitada es de IMDB
        req.on("data", d => {
            if (IMDB_REGEX.test(d)) {
                // Parseamos la URL solicitada
                scrapeMovie(d, res);
            }
            else {
                // Si no es una URL válida, se devuelve un error
                sendErrorResponse(res, 400, "La URL debe corresponderse a una página de película en IMDB");
            }
        });
    }
    else if (req.method == "OPTIONS") {
        // Permitimos métodos OPTIONS
        res.statusCode = 200;
        res.end();
    }    
    else {
        // Si no es una petición post u options, se devuelve un mensaje de error
        sendErrorResponse(res, 405, "El servidor solo permite métodos POST y OPTIONS");
    }
});

// Arrancamos el servidor
server.listen(port, () => {
    process.stdout.write(`Servidor lanzado en el puerto ${port}\n`);
});

// Función empleada para devolver mensajes de error
function sendErrorResponse(res, code, message) {
    res.statusCode = code;
    res.setHeader("Content-Type", "text/html");
    res.end(`<p><strong>Error</strong>: ${message}<p>`);
}

// Función que hace el scraping de una página IMBD para extraer los campos relevantes
function scrapeMovie(url, res) {
    // Obtenemos el html de la película, llamando a la función
    sendRequest(url).then((movieHTMLData) => {
        let response = "";

        // Obtenemos un DOM a partir del HTML, para poder parsearlo con jQuery
        const { JSDOM } = jsdom
        const dom = new JSDOM(movieHTMLData);
        const $ = jquery(dom.window);
    
        // Extraemos los datos deseados de la película
        response += `<h2>${$("h1").attr("data-testid", "hero-title-block__title").text()}</h2><hr>`;
        response += addEntry("Descripción", $("p").attr("data-testid", "plot").first().children()[0].textContent);
        
        // Extraemos el género de una página que puede estar en Inglés o en Español
        let generos = "";
        $("a").each(function() {
            if (/genre/.test($(this).attr("href")) && $(this).attr("role") == "button") {
                generos += $(this).text() + " ";
            }
        });
        response += addEntry("Géneros", generos.trimEnd());
        let puntuacion = $("div:contains('IMDb RATING') ~ a > div > div > div > div > span").first().text();
        response += addEntry("Puntuación", puntuacion);
    
        // Obetenemos la duración independientemente del idioma (se permiten español e inglés)
        response += addEntry("Duración", $("span:contains('Duración') ~ div, span:contains('duración') ~ div, span:contains('Runtime') ~ div, span:contains('runtime') ~ div").first().text());
        
        // Devolvemos la respuesta generada.
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(response);
    }).catch(error => {
        // Si ocurre algún error, devolvemos el mensaje de error recibido
        sendErrorResponse(res, 500, error);
    });
}

// Función que solicita una URL a IMDB y devuelve el contenido HTML de la página
async function sendRequest(url) {
    // Ajustamos la url al formato https://www.imbd.com/title/...
    url = url.toString().replace(/^.*imdb/,"https://www.imdb");

    // Creamos una promesa para esperar a recibir la respuesta a la petición antes de continuar
    return new Promise((resolve, reject) => {
        let data = "";
        https.get(String(url), res => {
            // Conforme se reciben trozos de la respuesta se añaden a data
            res.on("data", chunk => {
               data += chunk; 
            });
            res.on("end", () => {
                resolve(data);
            });
        }).on("error", error => {
            data = `Error al solicitar la url\nDetalles:\n\t${error}\n`;
            reject(data);
        });
    });
}

// Función que devuelve un elemento html compuesto por título y valor
function addEntry(title, value) {
    return `<p><strong>${title}</strong>: ${value}</p>`
}