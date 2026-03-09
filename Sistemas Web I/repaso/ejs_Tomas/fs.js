// METODO OPEN

// fs.open(path[, flags[, mode]], callback);
fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
//fd is our file descriptor
});

// LECTURA DE FICHEROS

const fs = require('fs');
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// ESCRITURA DE FICHEROS

const fs = require('fs');
const content = 'Algo de contenido del fichero';
fs.writeFile('test.txt', content, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('El fichero se ha escrito correctamente');
});

// PROMESAS

fs.promises
    .readFile("data.csv", "utf8")
    .then(processFileText)
    .catch(handleReadError);
// Alternativamente, usando async / await
async function processText(filename, encoding="utf8") {
    let text = await fs.promises.readFile("data.csv", "utf8");
    // Procesar el texto
}

// STAT

const fs = require("fs");
let stats = fs.statSync("diccionario.txt");
console.log(stats);
stats.isFile() // => true: this is an ordinary file
stats.isDirectory() // => false: it is not a directory
stats.size // file size in bytes
stats.atime // access time: Date when it was last read
stats.mtime // modification time: Date when it was last written
stats.uid // the user id of the file's owner
stats.gid // the group id of the file's owner
stats.mode.toString(8) // the file's permissions, as an octal string