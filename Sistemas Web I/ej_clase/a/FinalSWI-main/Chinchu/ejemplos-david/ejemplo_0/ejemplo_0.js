// Importamos el módulo http
const http = require("http");
const port = 3000;

// Creamos un servidor
const server = http.createServer((req, res) => {
  console.log("New connection");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello, World!</h1>");
});

// Ejecutamos el servidor
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
