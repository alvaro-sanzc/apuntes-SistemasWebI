const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (users[username]){
    bcrypt.compare(password, users[username].hash, function(err, result) {
      if (result) {
        req.session.user = users[username];
        res.redirect('/');
      }
      else {
        req.session.error = "Incorrect Username or Password";
        res.redirect('/login');
      }
    });
  } else {
    req.session.error = "Incorrect Username or Password";
    res.redirect('/login');
  }
});

let users = {
  alvaro: {username: "alvaro"},
  gonzalo: {username: "gonzalo"},
  miriam: {username: "miriam"}
};


for (let user of Object.keys(users)) {
  bcrypt.hash(users[user].username, 10, function(err, hash) {
    users[user].hash = hash;
  });
}

module.exports = router;
