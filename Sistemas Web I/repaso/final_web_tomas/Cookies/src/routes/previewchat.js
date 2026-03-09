///routes/previewschat.js
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../chatingApp.db');

//Si el usuario no tiene chats, tiene que haber una condición o algo, está fallando eso

router.get('/', function (req, res, next) {
    const userData = req.session.user;

    const selectChatsQuery = "SELECT chat_id FROM user_chat WHERE user_id = ?";
    db.all(selectChatsQuery, [userData.id], (err, chats) => {
        if (err) {
            console.error("Server Error: ", err.message);
            res.status(500).send("Server Error");
        }
        const chatIds = chats.map(chat => chat.chat_id);
        console.log(chatIds);

        if (chatIds.length === 0) {
            return res.render('previewchat', { chats: [], user: userData });
        }

        const placeholders = chatIds.map(() => '?').join(',');
        const selectChatInfoQuery = `SELECT id, title FROM chats WHERE id IN (${placeholders})`;
        
        db.all(selectChatInfoQuery, chatIds, (err, chatInfo) => {
            if (err) {
                console.error("Server Error: ", err.message);
                return res.status(500).send("Server Error");
            }

            res.render('previewchat', { chats: chatInfo, user: userData});
        });
    });
});

router.post("/selectChat", function (req, res) {
    const chatId = req.body.chat_id;
    console.log(chatId);
    res.redirect('/chat/' + chatId);
});

router.post("/createChat", function (req, res) {
    const chatId = req.body.chat_id;
    console.log(chatId);

    //Consulta a la bbdd para meter el chat nuevo en tablas user_chat (a todos los integrantes) y chat.

    //Tiene que redirigirlo al nuevo chat
    res.redirect('/chat/' + chatId);
});


module.exports = router;