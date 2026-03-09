$(window).on("load", () => {
    // Ocultamos las alertas
    $("div.alert").hide();
});

// Cuando se pulse el botón de aceptar, se realizará la consulta
$("#scrape-button").on("click", function() {
    // Ocultamos las alertas
    $("div.alert").hide();
    $("input").removeClass("is-invalid");

    // Colocamos el cursor de espera
    $("body").css("cursor", "progress");

    // Obtenemos el enlace y el puerto
    let url = $("#url-text-field").val();
    let port = $("#port-text-field").val();
    console.log(url + " " + port);

    // Comprobamos que ninguno de los valores está vacío
    if (url === "") {
        $("#url-alert").show();
        $("#url-text-field").addClass("is-invalid");
    }
    else if (port === "" || isNaN(Number(port)) || Number(port) > 65536 || Number(port) < 1024) {
        $("#port-alert").show();
        $("#port-text-field").addClass("is-invalid");
    }
    // Si todo es correcto, enviamos la petición
    else {
        sendRequest(url, port);
    }
});

// Función que envía la petición
function sendRequest(url, port) {
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        body: url,
        method: "POST"
    };

    fetch(`http://127.0.0.1:${port}`, options)
    .then((response) => {
        // Si se ha recibido un error, se lanza una excepción
        if (!response.ok) {
            return Promise.reject(response);
        }

        return response.text();
    })
    .then((data) => {
        showMovie(data);
    })
    .catch((error) => {
        error.text().then(showError);
    });
}

// Función que actualiza el documento para mostrar la película recibida
function showMovie(movieHTML) {
    // Ocultamos el HTML anterior
    $("#div-buscador").hide();

    // Devolvemos el cursor a la normalidad
    $("body").css("cursor", "default");

    // Creamos un div y añadimos la película en su interior
    $("#main-div").append("<div id='movie-div'></div>");
    $("#movie-div").addClass("rounded p-5");
    $("#movie-div").css("background-color", "white");
    $("#movie-div").append(movieHTML);

    // Añadimos un botón para volver atrás
    $("#movie-div").append("<button id='volver-btn' class='btn btn-primary'>Volver</button>");
    $("#volver-btn").on("click", function() {
        // Mostramos el buscador y borramos el div añadido
        $("#div-buscador").show();
        $("#movie-div").remove();
    });
}

// Función que actualiza el documento para mostrar un error
function showError(error) {
    // Ocultamos el HTML anterior
    $("#div-buscador").hide();

    // Creamos un div y añadimos la película en su interior
    $("#main-div").append("<div id='error-div'></div>");
    $("#error-div").addClass("rounded p-5");
    $("#error-div").css("background-color", "white");
    $("#error-div").append("<div id='alert-div' class='alert alert-danger'></div>");
    $("#alert-div").html(error);

    // Añadimos un botón para volver atrás
    $("#error-div").append("<button id='volver-btn' class='btn btn-primary'>Volver</button>");
    $("#volver-btn").on("click", function() {
        // Mostramos el buscador y borramos el div añadido
        $("#div-buscador").show();
        $("#error-div").remove();
    });
}