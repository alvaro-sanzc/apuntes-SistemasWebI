const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    const allUsers = database.user.getAllUsers();
    const currentUser = req.session.user;
    res.render('usuarios', { title: 'Usuarios', currentUser, allUsers, user: req.session.user });
});

router.post('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.body.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await database.user.deleteUser(usernameToDelete);
            res.redirect('/usuarios');
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar usuario: ${error.message}`);
    }
});

router.delete('/deleteUser', async function(req, res, next) {
    const currentUser = req.session.user;
    const usernameToDelete = req.query.username;

    try {
        if (currentUser && currentUser.username === 'admin' && usernameToDelete) {
            await database.user.deleteUser(usernameToDelete);
            res.json({ success: true, message: `Usuario ${usernameToDelete} eliminado correctamente.` });
        } else {
            res.status(403).json({ success: false, message: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar usuario: ${error.message}` });
    }
});

module.exports = router;
