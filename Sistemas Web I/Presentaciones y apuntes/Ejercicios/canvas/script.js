// Configuración inicial del canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Cargar imagen del personaje
const characterImage = new Image();
characterImage.src = 'https://via.placeholder.com/50';  // Cambia a la URL de tu imagen

// Posición inicial del personaje
let characterX = canvas.width / 2 - 25;
let characterY = canvas.height / 2 - 25;

// Velocidad del personaje (Aumentar el número para mayor velocidad)
const speed = 10;  // Antes era 5, ahora es 10 para que se mueva más rápido

// Teclas presionadas
const keysPressed = {};

// Detectar teclas presionadas
window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

// Actualizar posición del personaje
function updateCharacterPosition(deltaTime) {
    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
        characterX -= speed * deltaTime;
    }
    if (keysPressed['d'] || keysPressed['ArrowRight']) {
        characterX += speed * deltaTime;
    }
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
        characterY -= speed * deltaTime;
    }
    if (keysPressed['s'] || keysPressed['ArrowDown']) {
        characterY += speed * deltaTime;
    }

    // Limitar el personaje dentro del canvas
    characterX = Math.max(0, Math.min(canvas.width - 50, characterX));
    characterY = Math.max(0, Math.min(canvas.height - 50, characterY));
}

// Dibujar el frame
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(characterImage, characterX, characterY, 50, 50);
}

// Controlar el tiempo para ajustar la tasa de refresco
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    updateCharacterPosition(deltaTime);
    drawFrame();

    requestAnimationFrame(gameLoop);
}

// Iniciar la animación cuando la imagen esté cargada
characterImage.onload = () => {
    requestAnimationFrame(gameLoop);
};
