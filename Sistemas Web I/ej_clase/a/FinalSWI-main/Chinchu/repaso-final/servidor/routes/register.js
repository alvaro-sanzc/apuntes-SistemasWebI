const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserGateway = require('../model/db-manager').UserGateway;
const factories = require('../model/factories');

// GET -> muestra la página de login
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Registrarse' });
});

// POST -> gestiona la petición de registro
router.post('/', function(req, res, next) {
  // Buscamos el usuario en la base de datos
  const username = req.body.username;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;

  // Repetimos la validación de la contraseña
  if (password.length >= 8 && password === repeatPassword) {
    // Comprobamos que el usuario no existe
    UserGateway.loadUser(username, function(user) {
      if (!user) {
        // Si no existe, lo registramos
        factories.userFactory(username, password, function(user) {
          // Una vez registrado, iniciamos sesión y redirigimos al índice
          req.session.user = user;
          res.redirect('/');
        });
      } else {
        // Si se ha encontrado usuario, se redirige a register con un mensaje de error
        req.session.error = "El usuario ya existe";
        res.redirect('/register');
      }
    });
  } else {
    // Si la contraseña no es válida, se redirige al usuario a regiter
    req.session.error = "La contraseña tiene menos de 8 caracteres y/o las contraseñas introducidas no son iguales";
    res.redirect('/register');
  }
});

module.exports = router;
