const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  const channel = getRandomId()

  req.session.chat = channel;
  res.redirect("/chat");
});

function getRandomId() {
    let id = "";

    for (let i = 0; i < 5; i++) {
        const num = Math.floor(Math.random() * 10);
        id += num;
    }
    return id;
}

module.exports = router;