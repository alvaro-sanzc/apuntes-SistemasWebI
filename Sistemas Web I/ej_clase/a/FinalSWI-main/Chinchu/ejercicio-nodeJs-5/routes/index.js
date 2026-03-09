const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    res.render('index', { title: 'Chatter' });
  }
});

module.exports = router;
