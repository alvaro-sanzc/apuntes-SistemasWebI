/**
 * Módulo con los middleware personalizados
 * 
 * @author David Gilarranz Ortega
 */

/**
 * Guarda las variables de sesión para que estén disponibles para la respuesta.
 */
function sessionHandler(req, res, next) {
    // Obtenemos las variables de sesión

    // Limpiamos las variables de la sesión

    // Hacemos disponibles las variables para la sesión

    next();
}

/**
 * Si el usuario no ha iniciado sesión, se redirige a /login
 */
function gateKeeper(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = {
    sessionHandler,
    gateKeeper
}