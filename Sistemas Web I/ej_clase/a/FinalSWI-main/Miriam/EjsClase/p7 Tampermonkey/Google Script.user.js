// ==UserScript==
// @name         Google Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Miriam
// @match        https://www.google.es/*
// @icon        https://www.favicon.cc/logo3d/899820.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Cambiar color de fondo y texto del body
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = '#FDE7F5';
    body.style.color = '#FDE7F5';

    //Cambiar color del fondo de todas las etiquetas div
    // Obtiene todas las etiquetas div en la página
    var divs = document.getElementsByTagName("div");

    // Recorre todas las etiquetas div y cambia su color de fondo
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = "#FDE7F5";
    }

    //Elimino sección de búsquedas relacionadas
    var relatedSearches = document.getElementById('bres');
    if (relatedSearches) {
        relatedSearches.remove();
    }


})
();