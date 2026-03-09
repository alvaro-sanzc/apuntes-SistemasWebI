# imdb\_scraper

## Instalación
El código requiere una versión de `Node.js` igual o superior a la `14.0.0` para poder
ejecutarse. Si no se dispone de dicha versión, se puede instalar mediante:

```bash
$ nvm install latest
```

Antes de poder ejecutar el código, se debe instalar las dependencias:

```bash
$ npm install
```

## Ejecución
El scraper se compone de un servidor web que atenderá peticiones POST (fichero `scraper.js` y
una interfaz web para interactual con él (fichero `cliente.html`). Para ejecutar el programa,
se deben seguir los siguientes pasos

1. Iniciar el servidor. Opcionalmente se puede indicar un puerto:
  ```bash
  $ node scraper.js
  ```
  o
  ```bash
  $ node scraper.js <puerto>
  ```
2. Abrir el fichero `cliente.html` en cualquier navegador. Ejemplo:
  ```bash
  $ firefox cliente.html
  ```

3. Especificar la url que se desea consultar y el puerto. La url debe tener el siguiente formato:
  ```pl
  [http[s]://][www.]imdb.com/title/<identificador>
  ```

4. Indicar el puerto en el que se ejecuta el servidor. Por defecto, será el 3000. Si se ha arrancado
el servidor en otro puerto, se deberá indicar dicho puerto en lugar del 3000.
