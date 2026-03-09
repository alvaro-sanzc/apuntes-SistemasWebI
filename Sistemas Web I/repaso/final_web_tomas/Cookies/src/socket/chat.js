//Chat Server Logic
//socket/chat.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../chatingApp.db');

//Detectar la conexión de un nuevo cliente
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Un usuario se ha conectado");

        // Obtener chat_id desde el cliente
        const chat_id = socket.handshake.query.chat_id;
        console.log(chat_id);
        if (!chat_id) {
            console.error("Chat ID no proporcionado");
            socket.emit("error", { message: "Chat ID requerido" });
            return;
        }

        //Cargar historial de mensajes
        const messagesHistQuery = "SELECT content, user_id FROM messages WHERE chat_id = ?";
        db.all(messagesHistQuery, [chat_id], (err, messages) => {
            if (err) {
                console.error("Error loading chat history", err.message);
                res.status(500).send("Server error");
            }
            //Sacar los user_id de los mensajes
            const user_ids = messages.map(message => message.user_id);

            //Sacar los nombres de los usuarios
            const placeholders = user_ids.map(() => '?').join(',');
            const userEnvolvedQuery = `SELECT id, name FROM users WHERE id IN (${placeholders})`;

            db.all(userEnvolvedQuery, user_ids, (err, users) => {
                if (err) {
                    console.error("Error loading user names", err.message);
                    socket.emit("error", { message: "Server error while loading chat history" });
                }

                messages = messages.map(message => {
                    const user = users.find(u => u.id === message.user_id);
                    message.username = user ? user.name : 'Unknown'; 
                    return message;
                });

                //Enviar historial de mensajes al cliente
                socket.emit("chat history", messages);


                socket.on("new message", (messageData) => {
                    // Guardar el mensaje en la base de datos
                    console.log("Nuevo mensaje:", messageData);
                    const { content, chat_id, user_id } = messageData;
                    const insertMessageQuery = "INSERT INTO messages (chat_id, user_id, content) VALUES (?, ?, ?)";
                    const user = users.find(u => u.id === user_id);
                    db.run(insertMessageQuery, [chat_id, user_id, content], function (err) {
                        if (err) {
                            console.error("Error inserting message:", err.message);
                            socket.emit("error", { message: "Error sending message" });
                        } else {
                            // Emitir el mensaje a todos los clientes
                            io.emit("new message", { username: user.name, content: content });
                        }
                    });
                });
            });
        });

        //Desconexión de un cliente
        socket.on("disconnect", () => {
            console.log("Un usuario se ha desconectado");
        });
    });
};

