let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');     // Para trabajar con contraseñas cifradas

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'My Web',  user: req.session.user });
});

router.post('/', function(req, res, next) {
  let user = req.body.user;
  if (users[user]) {
    let password = req.body.password;
    // Comparamos la contraseña
    bcrypt.compare(password, users[user].hash, function(err, result) {
      if (result) {
        // Si las credenciales son correctas, se guarda la información en la sesión del
        // usuario y se redirige a /restricted
        req.session.user = users[user];
        req.session.message = "Welcome!";     // Se da la bienvenida  
        res.redirect('/restricted');
      } else {
        // Si las credenciales son incorrectas, se añade un mensaje de error a la sesión
        // se redirige a /login de nuevo
        req.session.error = "Incorrect user or password";
        res.redirect('/login');
      }
    });
  } else {
    // Si las credenciales son incorrectas, se añade un mensaje de error a la sesión
    // se redirige a /login de nuevo
    req.session.error = "Incorrect user or password";
    res.redirect('/login');
  }
});

let users = {
  admin: {username: "admin"}
}

// Hasehamos la contraseña del admin
bcrypt.hash("admin", 10, function(err, hash) {
  users["admin"].hash = hash;
});

module.exports = router;
