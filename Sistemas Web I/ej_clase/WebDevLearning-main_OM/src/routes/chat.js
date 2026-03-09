//routes/chat.js
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../chatingApp.db');

router.get('/:chatId', function(req, res) {
    const userData = req.session.user;
    const chatId = req.params.chatId;
    res.render('chat', {user_id : userData.id, user_name : userData.username, chat_id : chatId, user:userData});
});

// Enviar un mensaje al chat
router.post('/send-message', function(req, res) {
    const { chat_id, message, user_id } = req.body;
    const insertMessageQuery = "INSERT INTO messages (chat_id, user_id, content) VALUES (?, ?, ?)";
    
    db.run(insertMessageQuery, [chat_id, user_id, message], function(err) {
        if (err) {
            console.error("Error sending message:", err.message);
            res.status(500).send("Error sending message");
        } else {
            res.status(200).send("Message sent successfully");
        }
    });
});

module.exports = router;