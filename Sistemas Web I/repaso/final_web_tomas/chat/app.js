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
var loginRouter = require('./routes/login');

var app = express();

app.locals.title = "Capitana O";
app.locals.cookie = false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "Una frase muy secreta",
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);


//Cookies
app.get('/check-cookies', (req, res) => {
  const cookiesAccepted = req.session.cookiesAccepted || false
  res.json({cookiesAccepted});
});

app.post('/accept-cookies', (req, res) => {
  req.session.user = { name: 'invitado'};
  res.cookie('role', 'invitado' ,{httpOnly: false}); //, { maxAge: 60 * 60 * 1000 }); // Expira en 1 hora);
  app.locals.cookie = true;
  res.sendStatus(200);
});

app.get('/cookies-rejected', (req, res) => {
  res.send(200); 
});

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

module.exports = app;
