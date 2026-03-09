const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('restricted', {user: req.session.user, title:"Restricted - Proyecto"});
});

module.exports = router;