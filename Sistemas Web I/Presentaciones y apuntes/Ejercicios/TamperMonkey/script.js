// ==UserScript==
// @name         Personalización de Google
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Oculta la pestaña de "Imágenes" y añade un mensaje de bienvenida en Google
// @author       Álvaro Sanz Cortés
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ocultar la pestaña de "Imágenes"
    const pestañaImagenes = document.querySelector('a[href*="tbm=isch"]');
    if (pestañaImagenes) {
        pestañaImagenes.style.display = 'none';
    }

    // Añadir mensaje de bienvenida
    const mensajeBienvenida = document.createElement('div');
    mensajeBienvenida.innerText = "¡Bienvenido a Google!";
    mensajeBienvenida.style = "padding: 10px; background-color: #4285F4; color: white; font-size: 18px; text-align: center;";
    document.body.prepend(mensajeBienvenida);

})();
//Este script se encarga de ocultar la pestaña y añadir el mensaje en Google
