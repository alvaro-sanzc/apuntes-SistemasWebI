const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Se crea una página para el chat seleccionado
  res.render('chat', { title: `Chat: ${req.session.chat}`, chat: req.session.chat });
});

module.exports = router;