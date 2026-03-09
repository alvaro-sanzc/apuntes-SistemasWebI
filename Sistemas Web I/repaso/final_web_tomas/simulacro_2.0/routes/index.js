const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {user: req.session.user, title:"Index - Proyecto"});
});

module.exports = router;