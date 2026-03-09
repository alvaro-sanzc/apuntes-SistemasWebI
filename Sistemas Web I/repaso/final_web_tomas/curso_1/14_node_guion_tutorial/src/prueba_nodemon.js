// const func_matematicas = require('./utils/func_matematicas');
import { sumar, restar } from "./utils/func_matematicas.js";
import NOMBRE_MIO from "./utils/consts.js";     // porque esta exportado por defecto / Se le puede llamar a la variable como quieras

const lenguajes = ["Dart", "Javascript", "PHP", "Python"];
let encontrado = false;

lenguajes.forEach((lenguaje) => {
    debugger;
    if(lenguaje === "PHP") encontrado = true;
    console.log(lenguaje);
});

console.log(encontrado);
console.log(sumar(15, 29));
console.log(restar(15, 29));
console.log(NOMBRE_MIO);
