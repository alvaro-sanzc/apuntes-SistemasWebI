const express = require('express');
const router = express.Router();

// Ejemplo de datos para cargar en la página inicial
const items = [
  { name: "Item 1", image: "/images/item1.jpg" },
  { name: "Item 2", image: "/images/item2.jpg" },
  { name: "Item 3", image: "/images/item3.jpg" }
];

/* GET página inicial */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial', items });
});

module.exports = router;
