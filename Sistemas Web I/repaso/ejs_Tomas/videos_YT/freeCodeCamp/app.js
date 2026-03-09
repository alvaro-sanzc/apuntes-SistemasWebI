// const saludos = require('./saludos')
// const { saludar, saludarHolaMundo } = require('./saludos')   // desestructuracion

// console.log(saludos.saludar("tt"));  // no la puedo llamar por la desestructuracion (no esta definida)
// console.log(saludos.saludarHolaMundo()); -> se convierte en: console.log(saludarHolaMundo()); por la desestructuracion

// console.log(saludarHolaMundo()); 
// console.log(saludar("tt")); 

// console.log(process.env);
// console.log(process.argv);  // para ver los argumentos pasados por el terminal

function mostrarTema(tema) {
    console.log(`Estoy aprendiendo ${tema}`);
}

// mostrarTema('Node.js');
// setTimeout(mostrarTema, 1000, 'Node.js');

function sumar(a, b) {
    console.log(a + b);
}

setTimeout(sumar, 1000, 10, 35);
console.log('Antes de setImmediate()');
setImmediate(mostrarTema, 'node.js');
console.log('Despues de setImmediate()');

// RESULTADO DE LA CONSOLA
// Antes de setImmedaite()
// Despues de setImmedaite()
// Estoy aprendiendo node.js
// 45

// setInterval(sumar, 1000, 10, 35);    --> de forma infinita hasta detener el proceso de manera manual
