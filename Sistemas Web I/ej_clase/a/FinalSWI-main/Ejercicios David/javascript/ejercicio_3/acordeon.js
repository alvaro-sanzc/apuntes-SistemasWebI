// Al cargar la ventana, ocultamos el formulario y las alertas
$(window).on("load", () => {
    $("#sign-up-form-div").hide();
    $("#finished-div").hide();
    $("div.alert").hide();
});

// Al pulsar el botón de registrarse, ocultamos el contenido y mostramos el formulario
$("#sign-up-btn").click(() => {
    $("#content").hide();
    $("#sign-up-form-div").show();
    $("body").css({"background-color":"darkred", "height":"100vh"});
});

// Al pulsar el botón de aceptar, validamos el contenido
$("#enviar-btn").click(() => {
    // Desactivamos todas las alertas y warnings de los campos
    $("div.alert").hide();
    $("input").removeClass("is-invalid");

    // Comprobamos si están rellenos todos los campos
    if (!allFieldsFilled()) {
        $("#required-alert").show();
        return;
    }

    // Verificamos el nombre
    if (!verifyName()) {
        $("#name-textfield").addClass("is-invalid");
        $("#name-alert").show();
        return;
    }
    else {
        $("#name-textfield").addClass("is-valid");
    }

    // Verificamos los apellidos
    if (!verifySurname()) {
        $("#surname-textfield").addClass("is-invalid");
        $("#surname-alert").show();
        return;
    }
    else {
        $("#surname-textfield").addClass("is-valid");
    }

    // Verificamos el correo
    if(!verifyEmail()) {
        $("#email-textfield").addClass("is-invalid");
        $("#email-alert").show();
        return;
    }
    else {
        $("#email-textfield").addClass("is-valid");
    }

    // Verificamos el teléfono
    if(!verifyPhone()) {
        $("#phone-textfield").addClass("is-invalid");
        $("#phone-alert").show();
        return;
    }
    else {
        $("#phone-textfield").addClass("is-valid");
    }

    // Verificamos la contraseña
    if(!verifyPassword()) {
        $("#password-textfield").addClass("is-invalid");
        $("#password-alert").show();
        return;
    }
    else {
        $("#password-textfield").addClass("is-valid");
    }

    // Si todos los campos se validan, se muestra el mensaje de aceptación
    $("#sign-up-form-div").hide();
    $("#finished-div").show();
})

function allFieldsFilled() {
    let filled = true;

    // Recorredmos los inputs marcados como required y comprobamos si están rellenos
    $("input").map(function() {
        if ($(this).attr("required") === "required") {
            // Si el input no está relleno, se marca como inválido
            if ($(this).val().length === 0) {
                $(this).addClass("is-invalid");
                filled &&= false;
            }
        }
    }); 

    return filled;
}

function verifyName() {
    // Comprobamos que el nombre sólo contiene caracteres
    return checkChars($("#name-textfield").val());
}

function verifySurname() {
    // Obtenemos el apellido
    let surname = $("#surname-textfield").val();

    // Comprobamos que hay al menos 2 palabras
    let strings = surname.split(" ");
    let valid = strings.length === 2;
    for (let i = 0; i < strings.length && valid; i++) {
        valid &&= checkChars(strings[i]);
    }

    return valid;
}

function checkChars(string) {
    let regex = /^[a-zA-Z\u00C0-\u017F]+$/;
    return regex.test(string);
}

function verifyEmail() {
    // Obtenenmos el correo
    let email = $("#email-textfield").val();

    // El correo debe contener al menos un carácter antes del @ y al menos dos grupos de
    // caracteres separados por un punto después del @
    let regex = /^.+@.+\..+$/;
    return regex.test(email);
}

function verifyPhone() {
    // El teléfono debe estar compuesto por 9 números sin espacios
    let phone = $("#phone-textfield").val();
    let regex = /^[0-9]{9}$/;
    return regex.test(phone);
}

function verifyPassword() {
    let password = $("#password-textfield").val();
    let regexNumber = /^.*[0-9]+.*$/;
    let regexCapital = /^.*[A-Z]+.*$/;
    let regexLowerCase = /^.*[a-z]+.*$/;

    return password.length >= 8 && regexNumber.test(password) && regexCapital.test(password) && regexLowerCase.test(password);
}

// Al pulsar los botones cancelar o aceptar, se vuelve a la página principal
$("#cancelar-btn").click(backToContent);
$("#aceptar-btn").click(backToContent);

// Función que devuelve el aspecto de la página al que tenía cuando se pulsó el botón registrarse
function backToContent() {
    $("#sign-up-form-div").hide();
    $("#finished-div").hide();
    $("div.alert").hide();
    $("#content").show();
    $("body").css({"background-color":"", "height":""});

    // Vaciamos los campos del formulario
    $("input").map(function() {
        $(this).val("");
        $(this).removeClass("is-valid");
        $(this).removeClass("is-invalid");
    });
}
