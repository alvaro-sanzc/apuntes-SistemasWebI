const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  // Se crea un identificador aleatorio para el chat
  const channel = getRandomId()

  // Se reenvía al usuario al chat grupal
  req.session.chat = channel;
  res.redirect("/chat");
});

// Función que obtiene una identificación aleatoria para el chat
function getRandomId() {
    let id = "";

    for (let i = 0; i < 5; i++) {
        // Obtenemos un número aleatorio
        const num = Math.floor(Math.random() * 10);
        id += num;
    }

    return id;
}

module.exports = router;