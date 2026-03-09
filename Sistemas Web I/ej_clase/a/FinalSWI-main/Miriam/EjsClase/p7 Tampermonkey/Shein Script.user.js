// ==UserScript==
// @name         Shein Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://es.shein.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shein.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Cambiar color de fondo y letra
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = '#FDCBEB';
    body.style.color = '#572F49';

    // Elimino el carrusel
    var sideslipSection = document.querySelector('.sideslip.hasBottomSpace');
    if (sideslipSection) {
        sideslipSection.remove();
    }


})();