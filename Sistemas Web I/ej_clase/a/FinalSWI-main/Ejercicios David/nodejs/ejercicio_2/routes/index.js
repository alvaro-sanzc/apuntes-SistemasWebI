const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Si el usuario no está logeado, se redirige a login
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    // Si el usuario está loggeado, se enseña la lista de chats
    res.render('index', { title: 'Chatter' });
  }
});

module.exports = router;
