let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');       // Módulo para trabajar con las sesiones

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let restrictedRouter = require('./routes/restricted');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,                                  // resave furza que se guarde la sesión aunque no se haya modificado
  saveUninitialized: false,                       // saveUninitialized fuerza a que se guarden sesiones no inicializadas
  secret: 'El secreto que queramos nosotros'      // Frase usada para cifrar y generar las cookies
}));

// Función que guarda en la sesión actual los errores y mensajes de la sesión anterior
// Se coloca antes de todas las demás para guardar la información
app.use(function(req, res, next) {
  let error = req.session.error;
  let message = req.session.message;

  // Borramos los objetos de la sesión
  delete req.session.error;
  delete req.session.message;

  // Modificamos las variables locales de la petición para trabajar con los mensajes definidos
  // OJO: la vida de res.locals se limita a UNA PETICIÓN, luego se pierde
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;

  // Continuamos la cadena
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/restricted', restrict, restrictedRouter);

// Ruta para logout
app.use('/logout', function(req, res, next) {
  // Borramos la sesión
  req.session.destroy(function() {
    res.redirect('/');
  });
});

// Función que filtra si el usuario está logeado o no
function restrict(req, res, next) {
  if (req.session.user) {
    // Si el usuario está logeado, se continúa
    next();
  } else {
    // Si no, se añade un mensaje de error a la sesión y se redirige a login
    req.session.error = "Acceso Restringido";
    res.redirect('/login');
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

module.exports = app;