# NODE JS EJERICIO 2    
- Crear un servidor en node.js que al cargar la página principal muestre una contraseña aleatoria generada a partir de X palabras aleatorias seleccionadas de un diccionario.

- El número de palabras (X) está definido como parámetro en la query
    - Accesible en req.url

- Por defecto, la contraseña tendrá 2 palabras. Para especificar el número de palabras que queremos que tenga la contraseña añadimos ?count=4 al final de la url.

## Arrancar el servidor

    $ node index.js

## Página de inicio

    http://localhost:3000   (2 palabras)

    http://localhost:3000/?count=X  (X palbras)