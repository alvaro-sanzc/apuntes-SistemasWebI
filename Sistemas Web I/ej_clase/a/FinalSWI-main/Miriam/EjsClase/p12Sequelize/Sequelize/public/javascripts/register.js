$(document).ready(function() {
    $('#registerForm').submit(function(event) {
      event.preventDefault();
  
      if (validateForm()) {
        // Enviar formulario si es válido
        alert('Registro exitoso');
        // Envio datos al servidor
      }
    });
  
    function validateForm() {
      //Validación de campos aquí
      const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
      const emailRegex = /^\S+@\S+\.\S+$/;
      const phoneRegex = /^\d{9}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
      const name = $('#name').val();
      const email = $('#email').val();
      const phone = $('#phone').val();
      const password = $('#password').val();
  
      if (!nameRegex.test(name)) {
        alert('Nombre y apellidos deben contener al menos dos palabras y solo letras');
        return false;
      }
  
      if (!emailRegex.test(email)) {
        alert('Formato de email inválido');
        return false;
      }
  
      if (!phoneRegex.test(phone)) {
        alert('Teléfono debe contener 9 dígitos numéricos');
        return false;
      }
  
      if (!passwordRegex.test(password)) {
        alert('Contraseña debe contener al menos 8 caracteres con una mayúscula, una minúscula y un número');
        return false;
      }
  
      return true; // El formulario es válido
    }
  });
  