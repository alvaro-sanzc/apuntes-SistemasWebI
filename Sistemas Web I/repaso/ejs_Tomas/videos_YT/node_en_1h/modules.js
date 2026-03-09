// var sayHello = function () {

// }

// window.sayHello();

// console.log(module);    // module no es un objeto global aunque lo parezca

// cargar un modulo - con el archivo logger.js

const log = require('./logger');     // no hace falta poner la extension pero se puede -> require('./logger.js'); (RUTA RELATIVA AL ARCHIVO)

// console.log(logger);    // -> { log: [Function: log] }
// logger.log('message');  // -> message    (con la primera opcion de modules.exports.log = log)
log('message')
