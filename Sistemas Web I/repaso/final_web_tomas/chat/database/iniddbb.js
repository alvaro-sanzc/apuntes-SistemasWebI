const { users, chat } = require('./appddbb');  

(async function initializeData() {
    try {
        // Registrar el chat con título "chat_prueba"
        const chatTitle = 'chat_prueba';

        // Registrar algunos mensajes
        chat.registerMessage(chatTitle, 'user1', '¡Hola! ¿Cómo estás?');
        chat.registerMessage(chatTitle, 'user2', '¡Hola! Estoy bien, ¿y tú?');
        chat.registerMessage(chatTitle, 'user1', 'Todo bien, gracias. ¿Qué tal el proyecto?');
        chat.registerMessage(chatTitle, 'user2', 'Va muy bien, estoy terminando los últimos detalles.');

        console.log('Datos iniciales cargados con éxito.');

        // Verificar los datos del chat
        console.log('Mensajes en el chat:', chat.getChat(chatTitle));

        // Crear usuarios
        await users.register('user1', 'user1@example.com', 'password');
        await users.register('user2', 'user2@example.com', 'password');
        // Verificar los datos de los usuarios
        console.log('Usuarios registrados:', users.data);
    } catch (error) {
        console.error('Error al inicializar los datos:', error.message);
    }
})();
