const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    res.render('registro', { title: 'Registro', user: req.session.user });
});

router.post('/', function(req, res, next) {
    const user = req.body.user;
    const pass = req.body.pass;
    const confirmPass = req.body.confirmPass;

    // Verifica si el usuario ya existe
    if (database.user.data.hasOwnProperty(user)) {
        req.session.error = `El usuario: ${user} ya existe.`;
        res.redirect("/registro");
    } else {
        // Intenta registrar al usuario
        database.user.register(user, pass);
        // Registro exitoso
        req.session.user = {username: user};
        req.session.message = "¡Registro correcto!";
        res.redirect("/restricted");
    }
});

module.exports = router;
