// const curso = require("./curso.json");

const { info } = require("console");

// console.log(curso);

let infoCurso = {
    "titulo": "aprende Node",
    "Nº de vistas": 0,
    "Nº de likes": 1,
    "temas": ["JS", "node.js"],
    "esPublico": true
}

let infoCursoJSON = JSON.stringify(infoCurso);  // JSON a texto

let infoCursoObjeto = JSON.parse(infoCursoJSON);     // texto a JSON

console.log(infoCursoObjeto);