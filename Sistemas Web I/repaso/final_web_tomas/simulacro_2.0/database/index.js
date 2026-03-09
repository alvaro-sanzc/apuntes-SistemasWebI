const database = {};

database.user = require('./models/user.model');

function initializeUsers(){
    const NAMES = ["alberto", "ana", "daniel", "silvia"];
    const roles = ["Admin", "Admin", "User", "IT"];
    NAMES.forEach(function(username, index){
        database.user.register(username, "1234", roles[index]);
    });
}

function initializeDB(){
    initializeUsers();
}

initializeDB();

module.exports = database;