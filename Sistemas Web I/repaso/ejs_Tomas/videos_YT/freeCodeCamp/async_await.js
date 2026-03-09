function ordenarProducto(producto) {
    return new Promise((resolve, reject) => {
        console.log(`Ordenando: ${producto}`);
        setTimeout(() => {
            if (producto === 'taza') resolve('Ordenando una taza');
            else reject('Este producto no esta disponible');
        }, 2000);
    });
}

function procesarPedido(respuesta) {
    return new Promise((resolve /*, reject*/) => {  // no es necesario ponerlo entre () ya que seria oslo un valor y si no necesitamos reject podemos omitirlo
        console.log('Procesando respuesta');
        console.log(`La respuesta fue: "${respuesta}"`);
        setTimeout(() => {
            resolve('Gracias por la compra');
        }, 4000);
    });
}

// ordenarProducto('taza')
//     .then(respuesta => {
//         console.log('Respuesta recibida');
//         console.log(respuesta); // no es necesario ya que la mostramos en procesarPedido()
//         return procesarPedido(respuesta);    // para encadenar las funciones en un orden concreto (primero ordenarPedido y despues procesarPedido)
//     })
//     .then(respuestaProcesada => {   // realizamos un proceso con la nueva procesa (Encadenar promesas)
//         console.log(respuestaProcesada);    // el valor del resolve de la respectiva promesa 
//     })
//     .catch(error => {
//         console.log(error);
//     });

// Ordenando: taza
// Respuesta recibida
// Ordenando una taza
// Procesando respuesta
// La respuesta fue: "Ordenando una taza"
// Gracias por la compra

// equivalene con async - await

async function realizarPedido(producto) {
    try {
        const respuesta = await ordenarProducto(producto);
        console.log('Respuesta recibida');
        console.log(respuesta);
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (error) {
        console.log(error);
    }
}

realizarPedido('taza');