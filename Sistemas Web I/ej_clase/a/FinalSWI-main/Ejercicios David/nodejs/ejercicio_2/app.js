const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const http = require('http');
const {Server} = require('socket.io');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');
const groupChatRouter = require('./routes/group-chat');
const createRoomRouter = require('./routes/create-room');
const joinRoomRouter = require('./routes/join-room');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Creamos una variable para los chats abiertos
app.locals.openChats = new Set();
app.locals.openChats.add('group-chat');

io.on('connection', (socket) => {
  console.log("New user connection");
  // Cuando se recibe un mensaje por un chat, se reenvía a todos los participantes
  app.locals.openChats.forEach(chat => {
    socket.on(chat, (msg) => {
      // Reenviamos el mensaje a todos los usuarios conectados
      io.emit(chat, msg);
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Usamos session
app.use(session({
  resave: false,
  secret: 'clave secreta para chats',
  saveUninitialized: false
}));

// Función que guarda la sesión actual para que no se borre entre peticiones
app.use(function (req, res, next) {
  let error = req.session.error;
  let chat = req.session.chat;
  
  // Si error no está vacío, lo borramos de la sesión
  delete req.session.error;

  // Si el chat al que se desea acceder no está en la lista de conexiones, se añade
  if (!app.locals.openChats.has(chat)) app.locals.openChats.add(chat);

  // Guardamos el error en res.locals (para que esté disponible esta petición)
  res.locals.error = '';

  if (error) res.locals.error = error;

  // Continuamos con la cadena
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);

// Se fuerza a estar logueado para acceder a los chats
app.use('/chat', restrict, checkRoomExists, chatRouter);
app.use('/group-chat', restrict, groupChatRouter);
app.use('/create-room', restrict, createRoomRouter);
app.use('/join-room', restrict, joinRoomRouter);

// Función que comprueba si un usuario está logueado. Si no, le reenvía a login
function restrict(req, res, next) {
  if (req.session.user) {
    // Si el usuario está logueado, se guarda su nombre de usuario y se continúa
    res.locals.user = req.session.user.username;
    next();
  } else {
    // Si los usuarios no están logeados, se reenvían a login
    req.session.error = 'Unauthorized Access';
    res.redirect('/login');
  }
}

// Función que comprueba si la sala a la que se desea unir el usuario existe
function checkRoomExists(req, res, next) {
  console.log(req.session.chat);
  console.log(app.locals.openChats);
  if (req.session.chat && app.locals.openChats.has(req.session.chat)) {
    next();
  } else {
    // Si la sala no existe, se muestra un mensaje de error
    req.session.error = 'Error: La sala indicada no existe';
    res.redirect('/');
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server };
