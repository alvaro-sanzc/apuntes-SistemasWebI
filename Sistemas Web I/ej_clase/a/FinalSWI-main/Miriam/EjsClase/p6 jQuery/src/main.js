$(document).ready(function() {
    $("#registerButton").click(function() {
      $("#container").hide();
      $("#registrationForm").show();
    });

    $("#cancelButton").click(function() {
      $("#container").show();
      $("#registrationForm").hide();
    });

    $("#form").validate({
      rules: {
        name: {
          required: true,
          minTwoWords: true,
          lettersonly: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true,
          minlength: 9,
          number: true
        },
        password: {
          required: true,
          minlength: 8,
          strongPassword: true
        }
      },
      messages: {
        name: {
          required: "Por favor, introduce tu nombre y apellidos.",
          minTwoWords: "El nombre y apellidos deben tener al menos dos palabras.",
          lettersonly: "El nombre y apellidos solo pueden contener letras."
        },
        email: {
          required: "Por favor, introduce tu email.",
          email: "Por favor, introduce un email válido."
        },
        phone: {
          required: "Por favor, introduce tu teléfono.",
          minlength: "Por favor, introduce un número válido con 9 dígitos",
          number: "El teléfono debe contener solo números."
        },
        password: {
          required: "Por favor, introduce tu contraseña.",
          minlength: "La contraseña debe tener al menos 8 caracteres.",
          strongPassword: "La contraseña debe contener al menos una mayúscula, una minúscula y un número."
        }
      },
      submitHandler: function(form) {
        alert("¡Registro exitoso!");
        form.submit();
      }
    });

    $.validator.addMethod("lettersonly", function(value, element) {
      return this.optional(element) || /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value);
    }, "Solo se permiten letras.");

    $.validator.addMethod("strongPassword", function(value, element) {
      return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
    }, "La contraseña debe contener al menos una mayúscula, una minúscula y un número.");

    $.validator.addMethod("minTwoWords", function(value, element) {
      var words = value.split(" ").filter(word => word.length > 0);
      return this.optional(element) || words.length >= 2;
    }, "El nombre y apellidos deben tener al menos dos palabras.");
  });