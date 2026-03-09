const express = require('express');
const { programacion } = require('../datos/cursos').infoCursos;
const routerProgramacion = express.Router();

// MIDDLEWARE
routerProgramacion.use(express.json());     // para procesar el cuerpo de la solicitud en formato JSON en nuestro codigo

routerProgramacion.get('/', (req, res) => {     // porque la ruta ya esta definida como /api/cursos/programacion y solo se añadiria lo siguiente
    res.send(JSON.stringify(programacion));
});

// manejar solicitudes de lenguajes de programacion (teniendo en cuenta que hay cientos)
// app.get('/api/cursos/programacion/python', (req, res) => {});    // esto no pq habria q hacer uno por cada lenguaje
// habria que hacer con parametros URL -> permiten generalizar un valor
routerProgramacion.get('/:lenguaje', (req, res) => {   // parametro URL -> :lenguaje (se identifica por ':')
    const lenguaje = req.params.lenguaje;   // lenguaje en req.params.lenguaje es el que hemos puesto como parametro URL
    const resultado = programacion.filter(curso => curso.lenguaje === lenguaje);
    // puede estar vacio asi q lo comprobamos
    if (resultado.length === 0) return res.status(204).send(`No se encontraron cursos de ${lenguaje}`);

    // PARAMETRO QUERY -> ordenar segun el numero de vistas de cada lenguaje
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultado.sort((a, b) => a.vistas - b.vistas))); // orden ascendente
    }

    res.send(JSON.stringify(resultado));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultado = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if (resultado.length === 0) return res.status(204).send(`No se encontraron cursos de ${lenguaje}`);
        // return res.status(404).end();   // para no enviar cuerpo
    // res.send(resultado);    // no es necesario hacer: JSON.stringify(resultado) pq se hace automaticamente con JS
    res.json(resultado);       // para asegurarse que envias la respuesta en formato JSON (los convierte)
    // res.send() acepta diferentes valores para enviar como respuesta
});

routerProgramacion.post('/', (req, res) => {
    const cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));     // sin el middleware añadiria 'null'
});

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);     // no es === pq estaria comparando int con string y el comparador estricto siempre devolveria falso
    // comprobar que la salida ha sido exitosa (-1 = error)
    if (indice >= 0) programacion[indice] = cursoActualizado;   // cambia el objeto entero
    else res.status(204);   // añadir codigos de estado a las funciones - SABER CUAL ES 

    res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        const cursoAModificar = programacion[indice];
        Object.assign(cursoAModificar, infoActualizada);    // cambiar solo unas propiedas en concreto no el objeto entero
    }

    res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) programacion.splice(indice, 1);    // aliminar desde el indice un solo elemento
    res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;