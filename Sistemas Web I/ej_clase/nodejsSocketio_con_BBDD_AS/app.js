var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var http = require('http');
var { Server } = require('socket.io'); //Importa la clase Server de socket.IO.

// Rutas
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login')
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var restrictedRouter = require('./routes/restricted');

// Crear instancia de la app
var app = express();
var server = http.createServer(app); // Crear servidor HTTP
var io = new Server(server); // Conectar Socket.IO al servidor

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "Chat Álvaro Sanz";
app.locals.cookie = false;
// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Una frase muy secreta",
  resave: false,
  saveUninitialized: true
}));
// Rutas
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/logout', (req,res) =>{
  database.user.deletecookies(req.session.user.username);
  req.session.destroy();
  res.redirect("/");
});

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}

app.post('/savecookies', (req, res, next) => {
  req.session.consentCookie = true;
  app.locals.cookie = true;

  if(req.session.user){
    database.user.savecookies(req.session.user.username);
    console.log("SAVE IN DATABASE");
  }

  res.json({ success: true });
});

// Manejo de WebSockets
// Almacenar la relación entre usuarios y sockets
const userSocketMap = new Map(); // Mapeo de usuario -> socket.id

// Manejo de WebSockets
io.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  // Escuchar mensajes del cliente
  socket.on('chat', (msg) => {
    console.log(`Mensaje recibido de ${socket.id}: ${msg}`);
    io.emit('chat', msg); // Reenviar el mensaje a todos los clientes conectados
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});



// Configuración para compartir la sesión con el socket
const sharedSession = require("express-socket.io-session");

io.use(
  sharedSession(session, {
    autoSave: true,
  })
);


/* RESULTADO
PS C:\Users\sanzc\trabajos_uni\examen_SWI\ej_clase\nodejsSocketio_con_BBDD_AS> npm start

> ejemploexpressgenerator@0.0.0 start
> node ./bin/www

Nuevo cliente conectado: iF_bCckdxQznciOaAAAB
Cliente desconectado: iF_bCckdxQznciOaAAAB
GET /chat 304 6.195 ms - -
GET /stylesheets/style.css 304 1.905 ms - -
GET /javascripts/chat.js 200 2.801 ms - 948
Nuevo cliente conectado: y9BD3r2HSn1lezh7AAAD
Mensaje recibido de y9BD3r2HSn1lezh7AAAD: hola
Mensaje recibido de y9BD3r2HSn1lezh7AAAD: qué tal estás?
Cliente desconectado: y9BD3r2HSn1lezh7AAAD
GET /chat 304 1.416 ms - -
GET /stylesheets/style.css 304 0.563 ms - -
GET /javascripts/chat.js 304 0.526 ms - -
GET /favicon.ico - - ms - -
Nuevo cliente conectado: 95V6AQH6qJI2OoDuAAAF
Mensaje recibido de 95V6AQH6qJI2OoDuAAAF: PATATA

*/


// Manejo de errores
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // Configuración de errores para desarrollo y producción
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar página de error
  res.status(err.status || 500);
  res.render('error');
});

// Exportar la aplicación y el servidor
module.exports = { app, server };
