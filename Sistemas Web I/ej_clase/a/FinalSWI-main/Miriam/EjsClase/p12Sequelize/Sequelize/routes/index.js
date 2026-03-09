var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina Inicio' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Registro' });
});

router.get('/inicio', (req, res) => {
  res.render('inicio', { title: 'Registro' });
});

module.exports = router;
