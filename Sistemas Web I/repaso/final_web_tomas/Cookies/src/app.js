//src/app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { createServer } = require("http");
const { Server } = require("socket.io");

var indexRouter = require('./routes/index'); 
var chatRouter = require('./routes/chat');
var previewchatRouter = require('./routes/previewchat')
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
const chatSocket = require('./socket/chat'); 

const debug = require('debug')('appLogs'); // 'appLogs' es el namespace para los logs
debug('This is a verbose log');


var app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); // Inicializar Socket.IO

chatSocket(io); // Inicializar el servidor de chat

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "Learning Web Dev";

app.use(session({
  secret: 'CLAVE_SECRETA', 
  resave: false,
  saveUninitialized: true
}));


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/index', indexRouter); // obligatorio localhost:3000/index para que funcione pq solo no va
app.use('/login', loginRouter);
app.use('/previewchat', checkAuthenticated, previewchatRouter)
app.use('/chat', checkAuthenticated, chatRouter);
app.use('/register', registerRouter);


function checkAuthenticated(req, res, next){
  console.log(req.session); 
  if (!req.session.user) {  
    console.log("User not authenticated")
    return res.redirect('/login'); 
  }
  next();  
}

app.get('/check-cookies', (req, res) => {
  const cookiesAccepted = req.session.cookiesAccepted || false;
  res.json({ cookiesAccepted});
});

app.post('/accept-cookies', (req, res) => {
  req.session.cookiesAccepted = true;
  res.sendStatus(200);
});

app.get('/cookies-rejected', (req, res) => {
  res.send(200); //Debería redireccionarse de inmediato
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("==> Error: ", err) 
    }
    res.clearCookie('role');
    console.log("==> The user has log out")
    res.redirect('/index'); 
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
