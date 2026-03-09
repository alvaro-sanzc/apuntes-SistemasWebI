const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  req.session.chat = 'group-chat';
  res.redirect('/chat');
});

module.exports = router;
