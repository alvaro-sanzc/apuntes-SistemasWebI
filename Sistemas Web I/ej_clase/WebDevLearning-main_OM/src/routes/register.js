var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../chatingApp.db');
//Middleware Functions
function checkUserExistence(email){
    return new Promise((resolve, reject) => {
      const sqlCheck = "SELECT email FROM users WHERE email = ?"
      db.get(sqlCheck, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    }); 
  };
  
  function registerUser(name, email, password){
    return new Promise((resolve, reject) => {
      const registryQuery = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
      db.run(registryQuery, [name, email, password], (err) => {
        if (err) reject (err);
        else resolve ();
      });
    });
  }

  
router.post("/registerUserDDBB", async (req, res) => {
    const username = req.body.name;
    const useremail = req.body.email;
    const userpassword = req.body.password;
  
    try {
      const userExist = await checkUserExistence(useremail);
  
      if (userExist) {
        console.log("The user is already registered");
        res.status(400).send("The user is already registered");
      }  
      await registerUser(username, useremail, userpassword);
      // res.status(200).send("User registered successfully.");
      res.redirect('/login');
      
    } catch (err) {
      console.error("Error processing registration:", err.message);
      res.status(500).send("Server error.");
    }
  });

  router.get('/', function(req, res, next) {
    const user = req.session.user;
    res.render('register', {user});
  });

module.exports = router;
