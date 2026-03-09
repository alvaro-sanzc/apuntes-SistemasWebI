# SISTEMAS WEB I

## Credenciales 
```
i.martinpena

i.martinpena@usp.ceu.es

NI
```


## Configuración GIT
1º Paso: configuración
```
git config --global user.name "i.martinpena"
git config --global user.email i.martinpena@usp.ceu.es
```
2º Paso: commit 
```
git commit -am "comentarios"
```
3º Paso: push
```
git push
```

## Crear proyecto nuevo desde cero 
```
node -v
mkdir nombre_carpeta
npm init -y
```

## Crear proyecto con express generator
```
npx express-generator -v ejs "nombre_que_quiero_poner_al_proyecto"
cd "nombre_que_quiero_poner_al_proyecto"
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan winston sequelize sqlite3 socket.io
npm audit fix
npm audit fix --force
npm fund
```

## Arrancar proyecto
```
npm install
npm i bcrypt cookie-parser debug ejs express express-session http-errors morgan winston sequelize sqlite3 socket.io
npm audit fix
npm audit fix --force
npm fund
npm start
```

## Añadir script para iniciar proyecto con npm start (package.json)
```
// Debajo de la linea private
"scripts": {
    "start": "node ./bin/www"
  },
```

## Indicar donde se encuentra el fichero main del proyecto (package.json)
```
vi package.json
"main": "app.js",
```

## Para cambiar el puerto (bin/www)
```
vi bin/www
// Buscar la linea -> var port = normalizePort(process.env.PORT || '3000');
// Por ejemplo si queremos cambiar el puerto a 4000 seria asi:
var port = normalizePort(process.env.PORT || '4000');
```

## Indicar puerto al levantar proyecto port=3010 npm start (bin/www)
```
const port = process.env.port;
```

## Estructura codigo HTML simple
```
<!DOCTYPE html >
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="title" content="Mi primer HTML5">
    <meta name="description" content="Ejemplo de HTML5">
    <meta name="keywords" content="HTML5, CSS, Javascript">
    <title>Mi primer HTML5</title>
  </head>
  <body>
    Cuerpo de la página
  </body>
</html>
```

## Para añadir nuevas paginas (REGISTRO) a un proyecto 
1º Paso: Crear ficheros .js y ejs
```
vi views/registro.ejs
vi routes/registro.js
```
2º Paso: cargar rutas.
```
vi app.js
const registroRouter = require('./routes/registro');
app.use('/registro', registroRouter);
```
3º Paso: crear codigo HTML para página de registro (registro.ejs)
```
// copiamos codigo de login.ejs que va a ser parecido y añadir nuevos elementos
vi views/registro.ejs
<%- include("header", {}) %>
<h1>Login</h1>
// Cambiamos ruta de login a registro
<form method="post" action="/registro">
    <label>Username: </label> <input type="text" name="user"><br>
    <label>Password: </label> <input type="password" name="pass"><br>
    // Añadimos nueva celda para confirmar contraseña
    <label>Confirm Password: </label> <input type="password" name="confirmPass"><br>
    <button type="submit">Submit</button>
</form>
<%- include("footer", {}) %>
```
4º Paso: Crear funcionalidad de registro (registro.js)
```
vi routes/registro.js
const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registro', { title: 'Registro', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    let pass = req.body.pass;
    let confirmPass = req.body.confirmPass;

    if (pass.length >= 8 && pass === confirmPass) {
        if(!users[user]){
            users.register(user, pass, function() {
                req.session.user = users[user];
                req.session.message = "Welcome!";
                res.redirect("/restricted");
            });
        } else {
            req.session.error = "El usuario ya existe";
            res.redirect("/registro");
        }
    } else {
        req.session.error = "Las constraseñas no coinciden o tiene menos de 8 caracteres";
        res.redirect("/registro");
        }
    });

module.exports = router;
```

5º Paso: añadir en la barra de navegacion la opcion de registro (header.ejs)
```
vi views/header.ejs
// Debajo de login
<li class="nav-item">
    <a class="nav-link" href="/registro">Registro</a>
</li>
```

6º Paso: crear pagina html estatica (registro.html)
```
<!DOCTYPE html>
<html>
<head>
    <title>login</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Armazón</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                < if (user) { >
                <li class="nav-item">
                    <a class="nav-link" href="/restricted">Restricted</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
                < } else { >
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/registro">Registro</a>
                </li>
                < }>
            </ul>
            < if (user) { >
            <div class="d-flex">Welcome <= user.username >!</div>
            < } >
        </div>
    </div>
</nav>
<div class="container">
    <h1><= title ></h1>
    <form method="post" action="/login">
        <label>Username:</label>
        <input type="text" id="user" name="user"><br>
        <label>Password:</label>
        <input type="password" id="pass" name="pass"><br>
        <label>Confirm Password:</label>
        <input type="password" id="confirmPass" name="confirmPass"><br>
        <button type="submit">Submit</button>
    </form>
</div> <!-- End container -->
<% if (message) { %>
<div class="alert alert-primary alert-dismissible" role="alert">
    <div><%- message %></div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
<% } if (error) { %>
<div class="alert alert-danger alert-dismissible" role="alert">
    <div><%- error %></div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
<% } %>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>
```

## Para añadir SOCKET.IO a un proyecto.

1º Paso: conectar socket con el servidor (bin/www)
```
// Cargar socket arriba del fichero
const { Server } = require("socket.io");

// Añadir siguiente codigo debajo de la linea: 
// Create HTTP server.
// var server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat', (msg)=>{
    io.emit('chat', msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
```
2º Paso: añadir javascript crear fichero chat.js (public/javascripts/chat.js)
```
const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit("chat",input.value);
        input.value = "";
    }
});
socket.on("chat", (msg) =>{
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
});
```
3º Paso: cargar pagina chat (app.js)
```
// cada linea de codigo en su correspondiente lugar
var chatRouter = require('./routes/chat');
app.use('/chat', chatRouter);
```
4º Paso: añadir fichero chat.js (routes/chat.js)
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});

module.exports = router;
```
5º Paso: añadir fichero chat.ejs (views/chat.ejs)
```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/chat.css' />
    <script src="/socket.io/socket.io.js" defer></script>
    <script src="/javascripts/chat.js" defer></script>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form">
        <input id="input">
        <button>Send</button>
    </form>
  </body>
</html>
```
6º Paso: añadir css chat.css, para poner bonito el chat (public/stylesheets/chat.css)
```
form{
    background: lightgray;
    padding: 5px;
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
}
#input{
    flex-grow: 1;
}
#messages{
    list-style-type: none;
}
#messages > li:nth-child(odd){
    background: lightblue;
}
```

## Crear una pagina (usuarios) con una tabla dinamica donde se muestren los usuarios

1º Paso: Crear ficheros .js y ejs
```
vi views/usuarios.ejs
vi routes/usuarios.js
```
2º Paso: cargar rutas.
```
vi app.js
const usuariosRouter = require('./routes/usuarios');
app.use('/usuarios', usuariosRouter);
```
3º Paso: crear funcion para obtener usuarios. (users.js)
```
// Encima de register
users.getAllUsers = function() {
    return Object.values(users);
}
```

4º Paso: crear codigo HTML para página de usuarios (usuarios.ejs)
```
<%- include("header", {}) %>
<h1><%= title %></h1>
<table>
    <thead>
    <tr>
        <th>Username</th>
        <th>Password (Hashed)</th>
    </tr>
    </thead>
    <tbody>
    <% for (let i = 0; i < allUsers.length; i++) { %>
        <tr>
            <td><%= allUsers[i].username %></td>
            <td><%= allUsers[i].hash %></td>
        </tr>
    <% } %>
    </tbody>
</table>
<%- include("footer", {}) %>
```
5º Paso: Crear funcionalidad de usuarios (usuarios.js)
```
const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', function(req, res, next) {
    const allUsers = users.getAllUsers();
    res.render('usuarios', { title: 'Usuarios', allUsers, user: req.session.user });
});

module.exports = router;
```
6º Paso: añadir en la barra de navegacion la opcion de usuarios (header.ejs)
```
vi views/header.ejs
// Debajo de logout
<li class="nav-item">
  <a class="nav-link" href="/usuarios">Usuarios</a>
</li>
```

## Añadir a la pagina usuarios una columna nueva donde se le añada un boton para que unicamente el usuario admin pueda eliminar usuarios.

1º Paso: crear funcion para eliminar usuarios. (users.js)
```
// Debajo de register
users.deleteUser = function(username) {
    return new Promise((resolve, reject) => {
        if (users[username]) {
            delete users[username];
            resolve();
        } else {
            reject(new Error(`Usuario ${username} no encontrado`));
        }
    });
};
```
2º Paso: crear fichero para alerta de confirmacion para eliminar usuario (/public/deleteUser.js)
```
// vi /public/deleteUser.js
const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    if(!deleteUser(username)){
        event.preventDefault();
    }
});
function deleteUser(username) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${username}?`)) {
        fetch(`/usuarios/deleteUser?username=${username}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Puedes recargar la página o actualizar la tabla según tus necesidades
                    location.reload();
                } else {
                    console.error('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
```


3º Paso: crear codigo HTML para página de usuarios (usuarios.ejs)
```
// Borrar contenido y pegar todo lo siguiente
<%- include("header", {}) %>
<h1><%= title %></h1>
<table>
    <thead>
    <tr>
        <th>Username</th>
        <th>Password (Hashed)</th>
        <% if (user.username === 'admin') { %>
            <th>Action</th>
        <% } else if (user.username !== 'admin') { %>
            <th></th>
        <% } %>
    </tr>
    </thead>
    <tbody>
    <% for (let i = 0; i < allUsers.length; i++) { %>
        <tr>
            <td><%= allUsers[i].username %></td>
            <td><%= allUsers[i].hash %></td>
            <% if (user.username === 'admin') { %>
            <td>
                <% if (allUsers[i].username !== 'admin' && allUsers[i].username !== undefined) { %>
                    <button type="submit" class="delete-button" onclick="deleteUser('<%= allUsers[i].username %>')">Delete</button>
                <% } %>
            </td>
            <% } else { %>
                <td></td>
            <% } %>
        </tr>
    <% } %>
    </tbody>
</table>
<script type="text/javascript" src="/deleteUser.js"></script>
<%- include("footer", {}) %>
```
4º Paso: Crear nueva funcionalidad de usuarios (usuarios.js)
```
// Borrar contenido y pegar todo lo siguiente
const express = require('express');
const router = express.Router();
const users = require('../users');

router.get('/', function(req, res, next) {
    const allUsers = users.getAllUsers();
    const currentUser = req.session.user;
    res.render('usuarios', { title: 'Usuarios', currentUser, allUsers, user: req.session.user});
});

router.post('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.body.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await users.deleteUser(usernameToDelete);
            res.redirect('/usuarios');
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar usuario: ${error.message}`);
    }
});

router.delete('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.query.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await users.deleteUser(usernameToDelete);
            res.json({ success: true, message: `Usuario ${usernameToDelete} eliminado correctamente.` });
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar usuario: ${error.message}` });
    }
});

module.exports = router;
```





