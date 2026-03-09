// Añadimos el listener al botón
let boton = document.getElementById("boton_generar");
boton.addEventListener("click", generarPassword);

// Añadimos un listener al checkbox check_repetir
let repetir = document.getElementById("check_repetir");
repetir.addEventListener("click", avisarUsuario);

const PASS_SPOT = document.getElementById("pass_spot");
const ALERT = document.getElementById("alert_error");
const NOTA = document.getElementById("alert_info");

const COLORS = [
    'IndianRed',
    'PaleVioletRed',
    'DarkOrange',
    'Gold',
    'DarkKhaki',
    'MediumOrchid',
    'SlateBlue',
    'MediumSeaGreen',
    'MediumTurquoise',
    'Chocolate'
];

// Al cargar la ventana, ocultamos la alerta
window.addEventListener("load", () => {
        ALERT.style.display = "none";
        NOTA.style.display = "none";
    }
);

// Función que genera una contraseña aleatoria sin palabras repetidas
async function generarPassword() {
    // En caso de que la alerta esté activa la escondemos
    ALERT.style.display = "none";
    NOTA.style.display = "none";

    // En caso de que ya sea haya generado una password, borramos la anterior
    for (let i = 0; i < PASS_SPOT.childElementCount; i++) {
        PASS_SPOT.removeChild(PASS_SPOT.firstChild);
    }

    // Obtenemos el número de palabras necesarias
    let num_words = validarInput();

    // Obtenemos las opciones
    let opciones = obtenerOpciones();

    // Obtenemos un array de palabras del diccionario
    let dict = await leerDiccionario();

    // Extraemos num_words palabras aleatorias y diferentes del diccionario y las añadimos a la solución
    let password = '';
    let colors = (opciones.colores) ? [].concat(COLORS) : [];

    let p_password = document.createElement("p");
    p_password.textContent = `La contraseña generada es: ${password}`

    for (let i = 0; i < num_words; i++) {
        // Añadimos una palabra aleatoria a la contraseña, con un color aleatorio
        let span_node = document.createElement("span");
        span_node.setAttribute("style", `color: ${colors.splice( Math.floor( Math.random() * colors.length ), 1 )};`);
        
        let index = Math.floor( Math.random() * dict.length );
        let word = (opciones.repetir_palabras) ? dict[index] : dict.splice(index, 1)[0];
        span_node.textContent = (opciones.mayusculas) ? word.charAt(0).toUpperCase() + word.slice(1, word.length) : word;
        
        // Añadimos la palabra al párrafo con la contraseña
        p_password.append(span_node);
    }

    // Añadimos una línea de texto con la contraseña generada
    PASS_SPOT.appendChild(p_password);
}

// Función que valida el número de palabras introducidas
function validarInput() {
    let num_words = Number(document.getElementById("num_palabras").value);

    if (num_words === 0 || num_words > 10) {
        ALERT.style.display = "block";
        throw "Número de palabras no válido";
    }
    else {
        return num_words;
    }
}

// Función que obtiene las opciones
function obtenerOpciones() {
    return {
        'repetir_palabras': document.getElementById('check_repetir').checked,
        'colores': document.getElementById('check_colores').checked,
        'mayusculas': document.getElementById('check_mayusculas').checked
    }
}

// Función que obtiene el diccionario
async function leerDiccionario() {
    // Leemos un diccionario público y lo añadimos a dict
    let response = await fetch("https://raw.githubusercontent.com/JorgeDuenasLerin/diccionario-espanol-txt/master/0_palabras_todas.txt");
    let dictAsText = await response.text();

    // Convertimos el diccionario de String a Array 
    let dict = dictAsText.split("\n");

    // Devolvemos el diccionario (eliminando el '(' en la posición 0)
    dict.splice(0, 1);

    return dict;
}

// Función que muestra la alerta informativa en función del estado del checkbox check_repetir
function avisarUsuario() {
    // Obtenemos el estado del checkbox
    repetir_palabras = repetir.checked;

    if (repetir_palabras) {
        NOTA.style.display = "block";
    }
    else {
        NOTA.style.display = "none";
    }
}