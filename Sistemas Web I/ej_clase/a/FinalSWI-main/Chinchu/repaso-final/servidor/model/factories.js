const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('./user');
const List = require('./list');
const Movie = require('./movie');
const Genre = require('./genre');
const UserGateway = require('./db-manager').UserGateway;

function userFactory(username, password, callback) {
    // Generamos la contraseña
    bcrypt.hash(password, 10, function(err, hash) {
        const id = uuid.v4();
        let user = new User(id, username, hash);
        user.createWatchList("watched");
        user.createWatchList("pending");
        user.createWatchList("favourites");

        // Guardamos el usuario en la base de datos y ejecutamos el callback al finalizar
        UserGateway.saveUser(user, callback);
    });
}

function listFactory(name) {
    const id = uuid.v4();
    return new List(id, name);
}

module.exports = {
    userFactory,
    listFactory
}