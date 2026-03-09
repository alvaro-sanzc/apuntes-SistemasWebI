function saludar(nombre) {
    return `Hola ${nombre}`;
}

// console.log(saludar("freeCodeCamp"));

function saludarHolaMundo(){
    return 'Hola Mundo!';
}

// module.exports.saludar = saludar;
// module.exports.saludarHolaMundo = saludarHolaMundo;
// es lo mismo pero mas consistente el objeto
module.exports = { saludar: saludar, saludarHolaMundo: saludarHolaMundo };