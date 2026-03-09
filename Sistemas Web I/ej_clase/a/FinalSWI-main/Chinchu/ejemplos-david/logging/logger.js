const winston = require('winston');

// Creamos un fichero de configuración del LOGGER para poder exportar el objeto logger
// y usarlo en cualquier lugar de la aplicación
const logger = winston.createLogger({
  level: 'info',                                // Nivel asociado al logger (info o + más crítico)
  format: winston.format.json(),                // Formato del transporte
  defaultMeta: { service: 'user-service' },     // Metadatos por defecto para 
  transports: [                                 // Transportes -> lugares donde se guarda la información
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }) ],
});
if (process.env.NODE_ENV !== 'production') {    // Node ENV -> entorno en el que se está desarrollando (production o development)
  logger.add(new winston.transports.Console({
  format: winston.format.simple(),
  }));
}

// Exportamos el logger para poder usarlo en otras partes de la aplicación
module.exports = logger