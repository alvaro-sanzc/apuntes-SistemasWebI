// Necesita jQuery
$("#register-form").on("submit", function(e) {
    // Eliminamos mensajes previos
    resetFeedbackMessages();

    if (!validatePassword()) {
        e.preventDefault();
    }
});

// Función que valida la contraseña
function validatePassword() {
    let password = $("#password-input").val();
    let repeatPassword = $("#repeat-password-input").val();
    let valid = true;

    if (password.length < 8) {
        let message = "La contraseña debe tener al menos 8 caracteres";
        $("#password-input").addClass("is-invalid");
        $(createErrorFeedback(message)).insertAfter("#password-input");
        valid = false;
    }

    if (password !== repeatPassword) {
        let message = "Las contraseñas deben ser iguales";
        $("#repeat-password-input").addClass("is-invalid");
        $(createErrorFeedback(message)).insertAfter("#repeat-password-input");
        valid = false;
    }

    return valid;
}

function createErrorFeedback(message) {
    return `<div class="invalid-feedback">${message}</div>`
}

function resetFeedbackMessages() {
    $("input").removeClass("is-invalid");
    $(".invalid-feedback").remove();
}