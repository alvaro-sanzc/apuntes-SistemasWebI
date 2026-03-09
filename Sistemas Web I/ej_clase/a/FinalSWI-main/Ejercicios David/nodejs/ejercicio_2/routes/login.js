const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Answer POST -> login user or show error */
router.post('/', function(req, res, next) {
  // Recuperamos los parámetros enviados
  let username = req.body.username;
  let password = req.body.password;

  // Comprobamos si las credenciales proporcionadas son correctas
  if (users[username]){
    bcrypt.compare(password, users[username].hash, function(err, result) {
      if (result) {
        // Si todo está correcto, creamos una sesión para el usuario y le redirigimos a index
        req.session.user = users[username];
        res.redirect('/');
      }
      else {
        req.session.error = "Incorrect Username or Password";
        res.redirect('/login');
      }
    });
  } else {
    // Si las credenciales no son válidas, se redirige a login con un mensaje de error
    req.session.error = "Incorrect Username or Password";
    res.redirect('/login');
  }
});

let users = {
  david: {username: "david"},
  juan: {username: "juan"},
  pepe: {username: "pepe"},
  ana: {username: "ana"},
  isabel: {username: "isabel"}
};

// hasheamos la contraseña de los usuarios (contraseña = nombre usuario)
for (let user of Object.keys(users)) {
  bcrypt.hash(users[user].username, 10, function(err, hash) {
    users[user].hash = hash;
  });
}

module.exports = router;
