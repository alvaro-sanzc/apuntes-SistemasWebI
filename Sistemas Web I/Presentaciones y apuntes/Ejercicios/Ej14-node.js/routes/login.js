const express = require('express');
const router = express.Router();

// GET login page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// Procesar el formulario de login
router.post('/', function(req, res, next) {
  const { username, password } = req.body;

  // Verificación sencilla de usuario
  if (username === 'admin' && password === 'password') {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login', error: 'Credenciales incorrectas' });
  }
});

module.exports = router;
