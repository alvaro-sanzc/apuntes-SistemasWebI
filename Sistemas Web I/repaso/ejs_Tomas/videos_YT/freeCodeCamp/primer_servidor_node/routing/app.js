// manejar rutas del servidor
const http = require('http');
const cursos = require('./cursos');     // const { infoCursos } = require('./cursos'); --> para acceder directamente al objeto
const PORT = 3000;

const server = http.createServer((req, res) => {
    const { method } = req;  // sintaxis de desestructuracion - extraemos la propiedad method
    // const metodo = req.method    // para cambiar el nombre de la variable a lo q queramos 
    switch(method) {
        case 'GET':
            return manejarSolicitudGET(req, res);
        case 'POST':
            return manejarSolicitudPOST(req, res);
        case 'PUT':
            return manejarSolicitudPUT(req, res);
        case 'DELETE':
            return manejarSolicitudDELETE(req, res);
        default:
            res.statusCode = 501;
            res.end(`El metodo ${method} no puede ser manejado por el servidor.`);
            // break;   // se puede incluir al ser switch
    }

    res.end('Chanchito feliz');
});

function manejarSolicitudGET(req, res) {
    const path = req.url;

    console.log(res.statusCode);    // 200 OK por defecto

    if(path === '/') {
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.statusCode = 200;   // este codigo de estado esta por defecto por lo q no es necesario ponerlo explicitamente
        return res.end('Bienvenidos  mi primer servidor y API creados con Node.js');
    } else if (path === '/cursos') {
        // res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos));     // cursos es el nombre del modulo no del objeto con la info
    } else if (path === '/cursos/programacion') {
        // res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    } else if (path === '/cursos/matematicas') {
        // res.statusCode = 200;
        return res.end(JSON.stringify(cursos.infoCursos.matematicas));
    }

    res.statusCode = 404;
    res.end('El recurso solicitado no existe...');
}

function manejarSolicitudPOST(req, res) {
    const path = req.url;

    if (path === '/cursos/programacion') {
        // res.statusCode = 200;

        let cuerpo = '';
        req.on('data', contenido => {
            cuerpo += contenido.toString();
        });

        req.on('end', () => {
            console.log(cuerpo);
            console.log(typeof cuerpo);

            cuerpo = JSON.parse(cuerpo);
            console.log(typeof cuerpo);
            console.log(cuerpo.titulo);

            res.end('El servidor recibio una solicitud POST para /cursos/programacion');
        })

        // return res.end('El servidor recibio una solicitud POST para /cursos/programacion');
    }
}

function manejarSolicitudPUT(req, res) {
    const path = req.url;

    if (path === '/cursos/programacion') {
        // res.statusCode = 200;
        return res.end('El servidor recibio una solicitud PUT para /cursos/programacion');
    }
}

function manejarSolicitudDELETE(req, res) {
    const path = req.url;

    if (path === '/cursos/programacion') {
        // res.statusCode = 200;
        return res.end('El servidor recibio una solicitud DELETE para /cursos/programacion');
    }
}

server.listen(PORT, () => {
    console.log(`El servidor esta escuchando en: http://localhost:${PORT}.`);
});