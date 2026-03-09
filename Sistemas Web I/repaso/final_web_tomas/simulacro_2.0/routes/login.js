const express = require('express');
const router = express.Router();
const database = require('../database');

router.get("/", function(req, res, next) {
    res.render('login', {user: req.session.user, title:"Login - Proyecto"});
});

router.post('/', async function(req, res, next) {
    if(await database.user.isLoginRight(req.body.user, req.body.pass)) {
        req.session.user = { username : req.body.user };
        req.session.message = "¡Login correcto!";
        req.session.role = { role: database.user.data[req.body.user].role };
        // console.log(req.session);
        res.redirect("restricted");
    }
    else {
        req.session.error = "Incorrect username or password";
        res.redirect("login");
    }
});

module.exports = router;