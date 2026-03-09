const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  // Se extrae el chat al que se desea conectar el usuario
  req.session.chat = req.body.roomId;
  res.redirect("/chat");
});

module.exports = router;