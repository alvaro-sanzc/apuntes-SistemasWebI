//routes/chat.js
var express = require('express');
var router = express.Router();
var db = require('../database/appddbb');

router.get('/', function(req, res) {
    const userData = req.session.user;
    
    const mensajes = chat.getChat(chatTitle);

    res.render('chat', {
        chatTitle,
        username: userData.username,
        content: mensajes 
    })
});

// Enviar un mensaje al chat
router.post('/send-message', function(req, res) {
    const { chatTitle, message, username } = req.body;

    if (!message || !username || !chatTitle) {
        return res.status(400).send("Datos incompletos");
    }

    // Registrar el mensaje en la base de datos
    chat.registerMessage(chatTitle, username, message);
    res.status(200).send("Mensaje enviado");
});


module.exports = router;