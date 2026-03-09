const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  req.session.chat = req.body.roomId;
  res.redirect("/chat");
});

module.exports = router;