/* SIN EJS const express = require('express');
const { matematicas } = require('../datos/cursos').infoCursos;  // para obtener directamente la propiedad matematicas de infoCursos
const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultado = matematicas.filter(curso => curso.tema === tema);
    if (resultado.length === 0) return res.status(404).send(`No se encontraron cursos de ${tema}`);

    res.send(JSON.stringify(resultado));
});

module.exports = routerMatematicas;*/

const express = require('express');
const { infoCursos } = require('../datos/cursos');
const { matematicas } = require('../datos/cursos').infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    let categorias = Object.keys(infoCursos)
  res.render('matematicas', { cursos: matematicas, categoria: categorias[1] });
});

routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema.toLowerCase();
  const resultado = matematicas.filter(curso => curso.tema === tema);
  if (resultado.length === 0) {
    return res.status(404).render('error', { message: `No se encontraron cursos de ${tema}` });
  }
  res.render('matematicas', { cursos: resultado, tema });
});

module.exports = routerMatematicas;
