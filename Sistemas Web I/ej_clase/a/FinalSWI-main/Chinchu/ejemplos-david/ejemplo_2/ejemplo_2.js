// Ejemplo método GET
const https = require("https");

https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", (resp) => {
  let data = "";

  // Al recibir datos, los añadimos a data
  resp.on("data", chunk => {
    data += chunk;
  });

  // Al recibir todos los datos, se muestra el json por consola
  resp.on("end", () => {
    console.log(JSON.parse(data));
  });
}).on("error", err => {
  // Al haber un error, se muestra por consola
  console.log("Error: " + err.message);
});
