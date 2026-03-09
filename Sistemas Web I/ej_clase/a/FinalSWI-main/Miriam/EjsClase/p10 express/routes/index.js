var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'La Pagina de Miriam sobre conejitos :)', 
    imageList: ['images/A.jpeg', 'images/B.jpeg']
  });
});


module.exports = router;
