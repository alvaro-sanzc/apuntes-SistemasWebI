const sqlite3 = require('sqlite3');
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

const User = require('./user');

const UserGateway = class UserGateway {
    /**
     * Inserta un usuario en la base de datos y ejecuta el callback al finalizar
     * @param {User} user Usuario a insertar
     * @param {function} callback callback a ejecutar. Toma como parámetro el usuario
     */
    static saveUser(user, callback) {
        const sql = `INSERT INTO Users VALUES ('${user.id}', '${user.username}', '${user.password}');`;
        db.run(sql, function(err) {
            if (!err) {
                callback(user);
            } else {
                console.log(err);
            }
        });
    }

    /**
     * Busca un usuario en la base de datos y ejecuta el callback sobre el usuario creado (null
     * si no lo encuentra).
     * @param {string} username Usuario a buscar
     * @param {function} callback Acción a realizar sobre el usuario
     */
    static loadUser(username, callback) {
        const sql = `SELECT UUID, Username, Password FROM Users WHERE Username = ?;`;
        const params = [username]
        db.get(sql, params, (err, row) => {
            // Creamos un usuario (sólo si existe)
            let user = null;
            console.log(err);
            if (row) {
                user = new User(row.UUID, row.Username, row.Password);
            }
            callback(user);
        });
    }
}

module.exports = {
    UserGateway
}