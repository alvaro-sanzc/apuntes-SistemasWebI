const canal = "tomasYT";

function sumar(n1, n2) {
    return n1 + n2
}

function restar(n1, n2) {
    return n1 - n2
}

function multiplicar(n1, n2) {
    return n1 * n2
}

//module.exports.sumar = sumar;   // exportar bajo el nombre sumar (module.exports.sumar) la funcion sumar (= sumar)
//module.exports.canalYT = canal;

module.exports = { 
    canalYT: canal, 
    sumar: sumar, 
    restar: restar, 
    multiplicar: multiplicar,
    dividir: function(n1, n2){
        return n1 / n2;
    }};