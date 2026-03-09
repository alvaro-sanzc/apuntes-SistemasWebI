//routes/login.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const user = req.session.user;
    const userRole = req.cookies.role 
    res.render('login', {user: user, role:userRole});
  });

module.exports = router;