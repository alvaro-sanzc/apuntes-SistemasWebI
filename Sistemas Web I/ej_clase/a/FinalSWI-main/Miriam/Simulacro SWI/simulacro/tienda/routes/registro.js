const express = require('express');
const router = express.Router();
const users = require('../users');
const { use } = require('bcrypt/promises');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    let pass = req.body.pass;
    if(users[user]){ //esta registrado
        //noo registra
        req.session.error = "Usuario ya registrado"
        console.log('ya registrado',user);
        res.redirect("/registro");
    }else{
        //registra
        users.register(user,pass,function(){
            req.session.user = user;
            req.session.pass = pass;
            res.redirect("/restricted");
        });
        console.log('registrado',user);
    }}
    );
    
module.exports = router;