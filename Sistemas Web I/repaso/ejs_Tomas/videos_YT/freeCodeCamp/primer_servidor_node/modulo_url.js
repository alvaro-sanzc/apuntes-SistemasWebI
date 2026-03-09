const miURL = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(miURL.hostname);        // www.ejemplo.org
console.log(miURL.pathname);        // /cursos/programacion
console.log(miURL.searchParams);    // URLSearchParams { 'ordenar' => 'vistas', 'nivel' => '1' } --> tipo object
console.log(miURL.searchParams.get('ordenar')); // vistas