// Código servidor para atender a peticiones
const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
  // Al recibir datos, los mostramos por pantalla
  req.on("data", d => {
    process.stdout.write(d);
  });
  
  // Al recibir la indicación de final, se muestra un mensaje
  req.on("end", () => {
    process.stdout.write("\nNo more data");
  });
  
  // Establecemos los parámetros de la respuesta
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World!</h1>");
});

// Arrancamos el servidor
server.listen(port, () => { console.log(`Server running at port ${port}`); });
