
// PROMESAS
const promesaCumplida = true;   // para realizaar el ejemplo en vez de usar if
const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(promesaCumplida) resolve('Promesa cumplida');
        else reject('Promesa rechazada'); 
    }, 1000);
});
// manejar el caso de exito 
// miPromesa.then((valor) => { // valor es el valor qu e pusimos como argumento en resolve('AQUI')
//     console.log(valor);
// });

// Para manejar caso de exito y rechazo 
const manejarPromesaCumplida = (valor) => {
    console.log(valor);
}

const manejarPromesaRechazada = (razonRechazo) => {
    console.log(razonRechazo);
}

// miPromesa.then(manejarPromesaCumplida, manejarPromesaRechazada);


// EJEMPLO ------------------------------------------------------------------------------------------------------------------------------------
const statusPedido = () => {
    return Math.random() < 0.8;
}

const miPedidoDePizza = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (statusPedido()) resolve('Pedido exitoso.');
        else reject('Ocurio un error.');
    }, 3000);
});

// const manejarPedido = (mensajeDeConfirmacion) => {
//     console.log(mensajeDeConfirmacion);
// }

// const rechazarPedido = (mensajeDeError) => {
//     console.log(mensajeDeError);
// }

// miPedidoDePizza.then(manejarPedido, rechazarPedido);

// sintaxis alternativa

miPedidoDePizza
    .then(mensajeDeConfirmacion => {
        console.log(mensajeDeConfirmacion);
    })
    // .then(null, (mensajeDeError) => {
    //     console.log(mensajeDeError);
    // });
    .catch(mensajeDeError => {
        console.log(mensajeDeError);
    });