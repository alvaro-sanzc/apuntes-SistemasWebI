// con el archivo modules.js

var url = 'https://mylogger.io/log';

function log(message) {
    // Send an HTTP request
    console.log(message);
}

// module.exports.log = log;
module.exports = log;
// module.exports.endPoint = url;   // no tiene por que llamarse de la misma manera