var express = require('express');
var router = express.Router();
const logger = require('../logger');              // Cargamos la ruta en la que se encuentra el

/* GET home page. */
router.get('/', function(req, res, next) {
  // Se loggea cada vez que se carga el index.js
  logger.info('Un usuario ha accedido a /index');

  res.render('index', { title: 'Express' });
});

module.exports = router;
