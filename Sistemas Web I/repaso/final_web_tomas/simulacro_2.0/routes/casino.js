const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('casino', {user: req.session.user, title:"Konguitos Casino"});
});

module.exports = router;