const express = require('express');
const path = require('path');

const app = express();

// Configurar el motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Carpeta de vistas
app.set('view engine', 'pug');                   // Motor de plantillas

// Continúa con el resto de la configuración del servidor
