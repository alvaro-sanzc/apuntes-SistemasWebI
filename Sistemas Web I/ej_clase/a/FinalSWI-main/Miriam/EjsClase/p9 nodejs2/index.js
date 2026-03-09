const http = require('http');
const fs = require('fs');

const port = 3000;
const dictionary = 'dictionary.txt';

//Función para generar una contraseña aleatoria:
function generatePasswd(wordCount, callback){
    //Leer el fichero 
    fs.readFile(dictionary, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el diccionario:", err);
            return callback("Error al generar la contraseña");
        }

        const words = data.split('\n').filter(Boolean);
        const passwd = [];

        for (let i = 0; i < wordCount; i++){
            const randomIndex =  Math.floor(Math.random() * words.length);
            passwd.push(words[randomIndex]);
        }

        const generatePasswd = passwd.join('-');
        callback(generatePasswd);
    });
}

const server = http.createServer((req, res) => {
    if(req.url.startsWith('')){
        const query = new URLSearchParams(req.url.slice(req.url.indexOf('?') + 1));
        const wordCount = parseInt(query.get('count')) || 2;

        generatePasswd(wordCount, (passwd) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(passwd);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('Pagina no encontrada');
    }
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

