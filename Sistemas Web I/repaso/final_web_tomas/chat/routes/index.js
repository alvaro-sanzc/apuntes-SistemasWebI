var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user
  const userRole = req.cookies.role 
  res.render('index', {user: user, role:userRole});
});

module.exports = router;
