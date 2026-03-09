//routes/login.js
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../chatingApp.db');

router.get('/', function(req, res, next) {
    const user = req.session.user;
    res.render('login', {user});
  });

router.post("/loginUserDDBB", function(req, res){
    let useremail = req.body.email;
    let userpassword = req.body.password;

    console.log("User email: ", useremail);
    console.log("User password: ", userpassword);


    const checkEmailQuery = "SELECT id, name, password FROM users WHERE email = ?";
    
    db.get(checkEmailQuery, [useremail], (err, user) => {
        if (err) {
            console.error("Error al cargar el usuario: ", err);
            return res.status(500).send("Error del servidor");
        }

        if (!user) {
            console.log("El usuario no existe");
            return res.status(401).send("Credenciales inválidas");
        }

        if (user.password === userpassword) {
            console.log("User logged in");
        
        req.session.user = {
        id: user.id,
        username: user.name,
        };
  
        if (user.name === "admin"){
            res.cookie('role', 'admin', { maxAge: 60 * 60 * 1000 }); // Expira en 1 hora);
            console.log("rol asignado");
        } else {
            res.cookie('role', user.name); //{ httpOnly: true }  Si conservas el http el cliente no puede leerlo luego
            console.log("Rol personalizado asignado");
            // res.send('Usuario logueado como User');
          }

    return res.redirect('/previewchat');
}});
});

module.exports = router;