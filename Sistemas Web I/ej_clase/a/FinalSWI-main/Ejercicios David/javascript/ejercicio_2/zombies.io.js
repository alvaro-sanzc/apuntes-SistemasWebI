const BACKGROUND_COLOR = "#ffffff";
const PLAYER_COLOR = "#fcba03";
const BULLET_COLOR = "#fcba03";
const BULLET_COODOWN = 250;             // 4 balas por segundo
const BULLET_DAMAGE = 50;               // Daño que hacen las balas
const ZOMBIE_COLOR = "#42f557";
const CIRCLE_RADIUS = 5;
const PLAYER_SPEED = 2;
const ZOMBIE_SPEED = 0.5;
const BULLET_SPEED = 10;
const BULLET_SIZE = 3;
const ZOMBIE_GEN_COOLDOWN = 3000;       // 3 segundo
const ZOMBIE_INITIAL_LIFE = 100;
const MAX_ZOMBIES_PER_WAVE = 10;
const MAX_ZOMBIES_IN_GAME = 100;
const ZOMBIE_ATTACK_COOLDOWN = 1000;    // 1 segundo
const ZOMBIE_DAMAGE = 10;
const UI_FONT = "15px Impact";
const UI_FONT_COLOR = "#eb0800";
const GAME_OVER_FONT_COLOR = "#eb0800";
const GAME_OVER_RECT_COLOR = "#696969";
const GAME_OVER_TITLE_FONT = "40px Impact";
const GAME_OVER_CONTENT_FONT = "20px Impact";
const CONTROL_SCREEN_TITLE_FONT = "40px Impact";
const CONTROL_SCREEN_SUB_TITLE_FONT = "30px Impact";
const CONTROL_SCREEN_CONTENT_FONT = "20px Impact";
const CONTROL_SCREEN_FONT_COLOR = "#eb0800";
const CONTROL_OVER_RECT_COLOR = "#696969";
const GAME_OVER_INPUT_BLOCK_MS = 1000;  // Se bloquea el input 1 segundo después de morir

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let highScore = 0;
let playing = false;
let inputBlock = 0;

// Objeto jugador
let player = {
    life: 100,             // Vida inicial = 100%
    magazineSize: 10,      // 10 Balas

    pos: { x: canvas.width / 2, y: canvas.height / 2 },
    speed: { x: 0, y: 0 },
    pointer: { x: 1, y: 0 }   // Posición hacia la que está mirando el jugador
};

// Array de balas
let bullets = [];

// Array de Zombies
let zombies = []

// Iniciamos el juego al cargar el elemento
window.addEventListener("load", (event) => {
    showControls();
}
);

function showControls() {
    // Mostramos el primer frame del juego
    drawUI();
    drawPlayer();

    // Oscurecemos la pantalla
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = GAME_OVER_RECT_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Al iniciar el juego, se explican los controles
    ctx.globalAlpha = 1;
    ctx.font = CONTROL_SCREEN_TITLE_FONT;
    ctx.fillStyle = CONTROL_SCREEN_FONT_COLOR;
    ctx.fillText("CONTROLS", canvas.width/2 - 80, 100);

    ctx.font = CONTROL_SCREEN_SUB_TITLE_FONT;
    ctx.fillText("Movement:", canvas.width/2 - 360, 150);
    ctx.fillText("Firing:", canvas.width/2 + 260, 150);

    ctx.font = CONTROL_SCREEN_CONTENT_FONT;
    ctx.fillText("- W: Move Up", canvas.width/2 - 350, 180);
    ctx.fillText("- A: Move Left", canvas.width/2 - 350, 210);
    ctx.fillText("- S: Move Down:", canvas.width/2 - 350, 240);
    ctx.fillText("- D: Move Right", canvas.width/2 - 350, 270);

    ctx.fillText("- J: Shoot Up", canvas.width/2 + 270, 180);
    ctx.fillText("- I: Shoot Left", canvas.width/2 + 270, 210);
    ctx.fillText("- K: Shoot Down", canvas.width/2 + 270, 240);
    ctx.fillText("- L: Shoot Right", canvas.width/2 + 270, 270);
    ctx.fillText("- U: Shoot Up-Left", canvas.width/2 + 270, 300);
    ctx.fillText("- O: Shoot Up-Right", canvas.width/2 + 270, 330);
    ctx.fillText("- M: Shoot Down-Left", canvas.width/2 + 270, 360);
    ctx.fillText("- . : Shoot Down-Right", canvas.width/2 + 270, 390);

    ctx.fillText("< PRESS ANY KEY TO BEGIN >", canvas.width/2 - 100, canvas.height - 100);

}

function startGame() {
    // Valores iniciales
    playing = true;
    score = 0;
    player.life = 100;
    player.pos.x = canvas.width/2;
    player.pos.y = canvas.height/2;
    aliveZombies = 0;
    zombies.splice(0, zombies.length);
    bullets.splice(0, bullets.length);

    // Eliminamos la transparencia
    ctx.globalAlpha = 1;

    // Inicamos el bucle del juego
    window.requestAnimationFrame(loop);
}

// Función que dibuja al jugador
function drawPlayer() {
    // Si el jugador se sale de la pantalla, se impide su movimiento
    let newX = player.pos.x + player.speed.x;
    let newY = player.pos.y + player.speed.y;
    if (newX < CIRCLE_RADIUS || newX > canvas.width - CIRCLE_RADIUS) {
        player.speed.x = 0;
    }
    if (newY < CIRCLE_RADIUS || newY > canvas.height - CIRCLE_RADIUS) {
        player.speed.y = 0;
    }

    // Calculamos la nueva posición del jugador
    player.pos.x += player.speed.x;
    player.pos.y += player.speed.y;


    // Establecemos el color
    ctx.strokeStyle = "black";
    ctx.fillStyle = PLAYER_COLOR;
    ctx.beginPath();
    ctx.arc(player.pos.x, player.pos.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

// Movimiento del jugador
window.addEventListener("keydown", processKeyDown);
window.addEventListener("keyup", processKeyUp)

function processKeyDown(e) {
    if (playing) {
        // Gestiona el input durante el juego
        if (e.code === "KeyA") {
            player.speed.x = -1 * PLAYER_SPEED;
            player.pointer.x = -1;
            player.pointer.y = 0;
        }
        if (e.code === "KeyD") {
            player.speed.x = PLAYER_SPEED;
            player.pointer.x = 1;
            player.pointer.y = 0;
        }
        if (e.code === "KeyW") {
            player.speed.y = -1 * PLAYER_SPEED;
            player.pointer.y = -1;
            player.pointer.x = 0;
        }
        if (e.code === "KeyS") {
            player.speed.y = PLAYER_SPEED;
            player.pointer.y = 1;
            player.pointer.x = 0;
        }
        if (e.code === "KeyU") {
            // Disparar arriba a la izquierda
            fire(-1, -1);
        }
        if (e.code === "KeyI") {
            // Disparar arriba
            fire(0, -1);
        }
        if (e.code === "KeyO") {
            // Disparar arriba a la izquierda
            fire(1, -1);
        }
        if (e.code === "KeyJ") {
            // Disparar a la izquierda
            fire(-1, 0);
        }
        if (e.code === "KeyL") {
            // Disparar a la izquierda
            fire(1, 0);
        }
        if (e.code === "KeyM") {
            // Disparar abajo a la izquierda
            fire(-1, 1);
        }
        if (e.code === "KeyK") {
            // Disparar abajo
            fire(0, 1);
        }
        if (e.code === "Period") {
            // Disparar abajo a la derecha
            fire(1, 1);
        }
    }
    else {
        // Si desde cualquier otra pantalla que no sea la del juego, se pulsa una tecla
        // se inicia/reinicia el juego si no está bloqueado el input
        if (Date.now() - inputBlock > GAME_OVER_INPUT_BLOCK_MS) {
            startGame();
        }
    }
}

function processKeyUp(e) {
    switch (e.code) {
        case "KeyA":
        case "KeyD":
            player.speed.x = 0;
            break;
        case "KeyW":
        case "KeyS":
            player.speed.y = 0;
            break;
    }
}

// Función que dispara una bala
let lastFired = 0;
function fire(dirX, dirY) {
    // Si el tiempo entre balas es mayor que cooldown, se crea una nueva bala
    if (Date.now() - lastFired > BULLET_COODOWN) {
        lastFired = Date.now();
        bullets.push(
            {
                damage: BULLET_DAMAGE,
                pos: { x: player.pos.x, y: player.pos.y },
                speed: { x: dirX * BULLET_SPEED, y: dirY * BULLET_SPEED }
            }
        );
    }
}

// Función que dibuja las balas
function drawBullets() {
    // Para cada bala:
    bullets.forEach((bullet) => {
        // Actualizamos la posición de la bala
        bullet.pos.x += bullet.speed.x;
        bullet.pos.y += bullet.speed.y

        // Verificamos si la bala está dentro de los límites permitidos
        if (bullet.pos.x < 0 || bullet.pos.x > canvas.width || bullet.pos.y < 0 || bullet.pos.y > canvas.height) {
            // Si no, la borramos
            bullets.splice(bullets.indexOf(bullet), 1);
            return;
        }
        // Se comprueba si hay colisiones, si no, se dibuja la bala
        else if (!checkBulletImpact(bullet)) {
            ctx.strokeStyle = BULLET_COLOR;
            ctx.moveTo(bullet.pos.x, bullet.pos.y);
            ctx.lineTo(
                bullet.pos.x + bullet.speed.x * BULLET_SIZE,
                bullet.pos.y + bullet.speed.y * BULLET_SIZE,
            )
            ctx.stroke();
        }
    });
}

// Función que comprueba si la bala colisiona con algún objeto
function checkBulletImpact(bullet) {
    // Hallamos la línea que ha seguido la bala entre el frame anterior y el actual
    let path = {
        p1: {
            x: bullet.pos.x,
            y: bullet.pos.y
        },
        p0: {
            x: bullet.pos.x - bullet.speed.x,
            y: bullet.pos.y - bullet.speed.y
        }
    }

    let impact = false;
    for (let i = 0; i < zombies.length && !impact; i++) {
        // Comprobamos si la bala intersecta el zombie
        if (intersect(path, zombies[i])) {
            // Si la bala intersecta con el zombie, reducimos la vida del zombie
            zombies[i].life -= BULLET_DAMAGE;

            // Eliminamos la bala
            bullets.splice(bullets.indexOf(bullet), 1);
            impact = true;
        }
    }

    return impact;
}

// Función que devuelve si hay intersección entre una línea y un círculo
function intersect(line, circle) {
    // Hallamos el vector director de la recta
    let v = { x: line.p1.x - line.p0.x, y: line.p1.y - line.p0.y };

    // Para comprobar la intersección del segmento de la trayectoria de la bala y el círculo
    // hacemos una línea perpendicular al segmento que pasa por el centro del círculo y verificamos
    // si el punto de corte está dentro de la circunferencia
    let p = { x: v.y, y: v.x };

    // Normalizamos el vetor:
    let pn = {
        x: p.x / (Math.sqrt(p.x ** 2 + p.y ** 2)),
        y: p.y / (Math.sqrt(p.x ** 2 + p.y ** 2))
    }

    // Hallamos el segmento p1-p2 que pasa por el centro del círculo
    let p1_circle = { x: circle.pos.x + CIRCLE_RADIUS * pn.x, y: circle.pos.y + CIRCLE_RADIUS * pn.y };
    let p2_circle = { x: circle.pos.x - CIRCLE_RADIUS * pn.x, y: circle.pos.y - CIRCLE_RADIUS * pn.y };

    // Comprobamos si el segmento hallado intersecta con la bala:
    // CASOS (Ver diagrama_intersecciones.png)
    if (pn.x === 0 && Math.abs(pn.y) === 1) {
        // Si la bala viaja en horizontal (vn = [1,0] -> pn = [0,1]), habrá colisión si la componente
        // "x" de cualquier punto del círculo está entre los extremos de la trayectoria de la bala y
        // la componente "y" de cualquier punto de la trayectoria de la bala está entre los extremos
        // del segmento p1_circle --- p2_circle
        return between(p1_circle.x, line.p0.x, line.p1.x) && between(line.p0.y, p1_circle.y, p2_circle.y);
    }
    else if (Math.abs(pn.x) === 1 && pn.y === 0) {
        // Si la bala viaja en vertical (vn = [0,1] -> pn = [1,0]), habrá colisión si la componente "x"
        // de la trayectoria de la bala está entre los extremos del segmento p1_circle --- p2_circle y 
        // la componente "y" de cualquier punto del segmento está entre las componentes "y" de los extremos
        // de la trayectoria de la bala
        return between(line.p0.x, p1_circle.x, p2_circle.x) && between(p1_circle.y, line.p0.y, line.p1.y);
    }
    else {
        // En cualquier otro caso, hay colisión si al menos una de las componentes "x" de la trayectoria
        // de la bala está entre las componentes "x" de los extremos del segmento p1_circle --- p2_circle
        // y al menos una de las componentes "y" de la trayectoria de la bala está entre los extremos del
        // segmento
        return (
            (between(line.p0.x, p1_circle.x, p2_circle.x) || between(line.p1.x, p1_circle.x, p2_circle.x)) &&
            (between(line.p0.y, p1_circle.y, p2_circle.y) || between(line.p1.y, p1_circle.y, p2_circle.y))
        )

    }
}

// Función auxiliar que devuelve si un punto x está entre dos dados (a y b)
function between(a, x, y) {
    if (x < y) {
        return a >= x && a <= y;
    }
    else {
        return a >= y && a <= x;
    }
}

// Función que gestiona el código de los zombies
let lastWave = 0;
let aliveZombies = 0;
function drawZombies() {
    // Comprobamos si se debe generar una nueva ola
    if (Date.now() - lastWave > ZOMBIE_GEN_COOLDOWN) {
        generateWave();
        lastWave = Date.now();
    }

    // Actualizamos la dirección de cada zombie
    zombies.forEach((zombie) => {
        // Eliminamos los zombies muertos e incrementamos la puntuación del jugador
        if (zombie.life === 0) {
            zombies.splice(zombies.indexOf(zombie), 1);
            aliveZombies--;
            score++;        
            return;
        }

        // Hacemos que el zombie se dirija hacia el jugador
        let x = player.pos.x - zombie.pos.x;
        let y = player.pos.y - zombie.pos.y;

        // Hallamos la norma del vector
        zombie.dir.x = x / Math.sqrt(x ** 2 + y ** 2);
        zombie.dir.y = y / Math.sqrt(x ** 2 + y ** 2);

        // Calculamos la nueva posición del zombi
        zombie.pos.x += zombie.dir.x * ZOMBIE_SPEED;
        zombie.pos.y += zombie.dir.y * ZOMBIE_SPEED;

        // Comprobamos si hay intersección con el jugador.
        checkZombiIntersection(zombie);

        // Dibujamos el zombi
        ctx.strokeStyle = "black";
        ctx.fillStyle = ZOMBIE_COLOR;
        ctx.beginPath();
        ctx.arc(zombie.pos.x, zombie.pos.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill()
    });
}

// Función que comprueba
function checkZombiIntersection(zombie) {
    // Calculamos la distancia entre los centros del jugador y el zombie
    distanceToPlayer = Math.sqrt((player.pos.x - zombie.pos.x) ** 2 + (player.pos.y - zombie.pos.y) ** 2);

    // Si el zombie está en distancia de ataque y no está en cooldown, daña al jugador
    if (
        (distanceToPlayer <= 2 * CIRCLE_RADIUS) &&
        (Date.now() - zombie.lastAttack > ZOMBIE_ATTACK_COOLDOWN)
    ) {
        player.life -= ZOMBIE_DAMAGE;
        zombie.lastAttack = Date.now();
    }
}

// Función que genera una horda de zombies
function generateWave() {
    // Se escoge un número aleatorio de zombies a engendrar
    let numZombies = Math.floor(Math.random() * MAX_ZOMBIES_PER_WAVE);

    for (let i = 0; i < numZombies && aliveZombies < MAX_ZOMBIES_IN_GAME; i++, aliveZombies++) {
        // Escogemos una posición inicial
        startPos = getStartPoint();

        // Añadimos el zombie en la posición indicada
        zombies.push(
            {
                life: ZOMBIE_INITIAL_LIFE,
                pos: startPos,
                dir: { x: 0, y: 0 },
                lastAttack: 0
            }
        );
    }
}

// Función que calcula una posición inicial aleatoria para un zombie
function getStartPoint() {
    // Escogemos una posición aleatoria para el zombie (fuera de la pantalla visible)
    //       0 = arriba, 1 = derecha, 2 = abajo, 3 = izquierda
    let side = Math.floor(Math.random() * 4);
    let x, y;

    if (side === 0 || side === 2) {
        // Escogemos la x
        x = Math.floor(Math.random() * canvas.width);

        // Determinamos la y
        y = (side === 0) ? 0 : canvas.height;
    }
    else {
        // Escogemos la y
        y = Math.floor(Math.random() * canvas.height);

        // Determinamos la x
        x = (side === 1) ? canvas.width : 0;
    }

    return { x: x, y: y };
}

// Función que dibuja los textos de la UI
function drawUI() {
    ctx.font = UI_FONT;
    ctx.fillStyle = UI_FONT_COLOR;
    ctx.fillText(`Health: ${player.life}`, 20, 20);
    ctx.fillText(`Score: ${score}`, 20, 40);
}

// Función que gestiona la pantalla de GameOver:
function gameOverScreen() {
    // Bloqueamos el input
    inputBlock = Date.now();

    // Oscurecemos la pantalla
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = GAME_OVER_RECT_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Colocamos el mensaje
    ctx.fillStyle = GAME_OVER_FONT_COLOR;
    ctx.font = GAME_OVER_TITLE_FONT;
    ctx.fillText("GAME OVER", canvas.width/2 - 80, canvas.height/2 - 40);
    ctx.font = GAME_OVER_CONTENT_FONT;
    ctx.fillText(`High Score: ${highScore}`, canvas.width/2 - 40, canvas.height/2);
    ctx.fillText("< Press any key to restart >", canvas.width/2 - 100, canvas.height/2 + 40);
}

// Función que refresca la animación
function loop(timestamp) {
    if (playing) {
        // Limpiamos la pantalla
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujamos el fondo
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujamos las balas
        drawBullets();

        // Dibujamos al jugador
        drawPlayer();

        // Dibujamos los zombies
        drawZombies();

        // Dibujamos la UI
        drawUI();

        // Comprobamos si se ha terminado el juego (al morir el jugador)
        playing = player.life > 0;

        // Refescamos la pantalla
        window.requestAnimationFrame(loop);
    }
    else {
        // Actualizamos el HighScore
        highScore = Math.max(score, highScore);
        gameOverScreen();
    }
}