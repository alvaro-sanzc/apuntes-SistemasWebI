const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserGateway = require('../model/db-manager').UserGateway;

// GET -> muestra la página de login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// POST -> gestiona la petición de login
router.post('/', function(req, res, next) {
  // Buscamos el usuario en la base de datos
  const username = req.body.username;
  const password = req.body.password;
  UserGateway.loadUser(username, function(user) {
    if (user) {
      // Si el usuario existe, comprobamos si la contraseña es correcta
      bcrypt.compare(password, user.password, function(err, result) {
        // Si la contraseña es correcta, se loggea al usuario y se redirige al índice
        if (result) {
          req.session.user = user;
          res.redirect('/');
        } else {
          // Si no, se redirige a login con un mensaje de error
          req.session.error = "Usuario y/o Contraseña incorrectos";
          res.redirect('/login');
        }
      });
    } else {
      // Si no se ha encontrado usuario, se redirige a login con un mensaje de error
      req.session.error = "Usuario y/o Contraseña incorrectos";
      res.redirect('/login');
    }
  });
});

module.exports = router;
