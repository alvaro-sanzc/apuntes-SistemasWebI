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

app.locals.openChats = new Set();
app.locals.openChats.add('group-chat');

io.on('connection', (socket) => {
  console.log("New user connection");
  app.locals.openChats.forEach(chat => {
    socket.on(chat, (msg) => {
      io.emit(chat, msg);
    });
  });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  secret: 'clave secreta para chats',
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  let error = req.session.error;
  let chat = req.session.chat;
  
  delete req.session.error;

  if (!app.locals.openChats.has(chat)) app.locals.openChats.add(chat);

  res.locals.error = '';

  if (error) res.locals.error = error;

  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.use('/chat', restrict, checkRoomExists, chatRouter);
app.use('/group-chat', restrict, groupChatRouter);
app.use('/create-room', restrict, createRoomRouter);
app.use('/join-room', restrict, joinRoomRouter);

function restrict(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user.username;
    next();
  } else {
    req.session.error = 'Unauthorized Access';
    res.redirect('/login');
  }
}

function checkRoomExists(req, res, next) {
  console.log(req.session.chat);
  console.log(app.locals.openChats);
  if (req.session.chat && app.locals.openChats.has(req.session.chat)) {
    next();
  } else {
    req.session.error = 'Error: La sala indicada no existe';
    res.redirect('/');
  }
}

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server };
