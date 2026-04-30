// ---------------------------------------------
// Importación de módulos
// ---------------------------------------------
import express from "express";           // Framework para levantar el servidor web
import Ajv2020 from "ajv/dist/2020.js";  // Versión de Ajv compatible con draft 2020-12
import addFormats from "ajv-formats";    // Soporte para formatos (date, email, etc.)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------
// Configuración inicial
// ---------------------------------------------
const app = express();
app.use(express.json()); // Permite interpretar cuerpos de peticiones en formato JSON

// Crear instancia de Ajv (validador JSON Schema)
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

// ---------------------------------------------
// Cargar el esquema JSON desde archivo
// ---------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al esquema
const schemaPath = path.join(__dirname, "schema", "moviesSchema.json");

// Leer y convertir el esquema en objeto JavaScript
const moviesSchema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

// Compilar validadores
const validateMovies = ajv.compile(moviesSchema);            // Para colecciones de películas
const validateMovie = ajv.compile(moviesSchema.$defs.movie); // Para una sola película

// ---------------------------------------------
// Rutas POST
// ---------------------------------------------

// Ruta para validar una colección de películas: body debe tener { "movies": [ ... ] }
app.post("/validate/movies", (req, res) => {
  const valid = validateMovies(req.body);
  if (!valid) {
    return res.status(400).json({
      ok: false,
      errors: validateMovies.errors
    });
  }
  res.json({ ok: true, message: "Movies JSON is valid ✅" });
});

// Ruta para validar una sola película: body debe ser el objeto de la película
app.post("/validate/movie", (req, res) => {
  const valid = validateMovie(req.body);
  if (!valid) {
    return res.status(400).json({
      ok: false,
      errors: validateMovie.errors
    });
  }
  res.json({ ok: true, message: "Single movie JSON is valid ✅" });
});

// ---------------------------------------------
// Iniciar el servidor
// ---------------------------------------------
app.listen(3000, () => {
  console.log("\n✅ Server running on [localhost](http://localhost:3000\n)");
  console.log("➡️  Usa /validate/movie o /validate/movies desde Postman");
});
