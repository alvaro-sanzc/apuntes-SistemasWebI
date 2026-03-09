const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('rol', {user: req.session.user, title:"Rolazo - Proyecto"});
});

module.exports = router;