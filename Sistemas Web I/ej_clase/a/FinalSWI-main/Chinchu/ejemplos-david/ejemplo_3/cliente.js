// El cliente envía un mesnaje POST al servidor y muestra la respuesta
const http = require("http");
const data = "Mensaje";
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/todos",
  method: "POST",
  headers: {
    "Content-Type": "text/html",
    "Content-Length": data.length
  }
};

// Enviamos el mensaje
const req = http.request(options, res => {
  // Mostramos el código de respuesta
  console.log(`statusCode: ${res.statusCode}`);

  // Mostramos el mensaje recibido
  res.on("data", d => { process.stdout.write(d + "\n"); });
});

// Si hay un error, lo mostramos por la salida de error
req.on("error", error => { console.error(error); });

// Enviamos los datos
req.write(data);
req.end();
