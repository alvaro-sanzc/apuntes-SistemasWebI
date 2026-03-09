const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registro', { title: 'Registro', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    let pass = req.body.pass;
    let confirmPass = req.body.confirmPass;

    if (pass.length >= 8 && pass === confirmPass) {
        if(!users[user]){
            users.register(user, pass, function() {
                req.session.user = users[user];
                req.session.message = "Welcome!";
                res.redirect("/restricted");
            });
        } else {
            req.session.error = "El usuario ya existe";
            res.redirect("/registro");
        }
    } else {
        req.session.error = "Las constraseñas no coinciden o tiene menos de 8 caracteres";
        res.redirect("/registro");
        }
    });

module.exports = router;