const socket = io(); // Conexión al servidor

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Manejo del envío de mensajes
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar recargar la página
    if (input.value) {
        socket.emit('chat', input.value); // Enviar mensaje al servidor
        input.value = ''; // Limpiar el campo de entrada
    }
});

// Escuchar mensajes del servidor
socket.on('chat', (msg) => {
    const item = document.createElement('li'); // Crear un nuevo elemento de lista
    item.textContent = msg; // Asignar el mensaje recibido como texto
    messages.appendChild(item); // Añadir el mensaje al final de la lista
    window.scrollTo(0, document.body.scrollHeight); // Desplazar hacia el último mensaje
});

