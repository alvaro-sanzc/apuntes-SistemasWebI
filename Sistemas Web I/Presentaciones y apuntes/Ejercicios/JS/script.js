// Diccionario de palabras en español
const diccionario = [
    "gato", "perro", "casa", "árbol", "auto", "sol", "luna", "mar", "fuego", "agua",
    "montaña", "río", "flor", "nube", "piedra", "viento", "nieve", "estrella", "camino", "bosque"
];

// Función para generar una contraseña
function generarContraseña() {
    const numPalabras = parseInt(document.getElementById("numPalabras").value);
    const capitalizar = document.getElementById("capitalizar").checked;
    const sinRepetir = document.getElementById("sinRepetir").checked;

    let palabrasDisponibles = [...diccionario]; // Copia del diccionario

    if (sinRepetir && numPalabras > palabrasDisponibles.length) {
        alert("No hay suficientes palabras únicas en el diccionario.");
        return;
    }

    let contraseña = [];
    for (let i = 0; i < numPalabras; i++) {
        // Seleccionar palabra aleatoria
        const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
        let palabra = palabrasDisponibles[indiceAleatorio];

        // Si se selecciona la opción de no repetir, eliminamos la palabra del diccionario
        if (sinRepetir) {
            palabrasDisponibles.splice(indiceAleatorio, 1);
        }

        // Si la opción está marcada, capitalizamos la primera letra de cada palabra
        if (capitalizar) {
            palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1);
        }

        contraseña.push(palabra);
    }

    // Mostrar la contraseña generada en el HTML
    document.getElementById("contraseña").textContent = contraseña.join("-");
}

// Evento para el botón de generar contraseña
document.getElementById("botonGenerar").addEventListener("click", generarContraseña);
