$(document).ready(function() {
    $("#loginForm").submit(function(event) {
      event.preventDefault();
  
      const email = $("#email").val();
      const password = $("#password").val();
  
    $.post("/login", { email, password }, function(data) {
        if (data.success) {
          window.location.href = "/inicio";
        } else {
          alert("Inicio de sesión fallido. Verifica tus credenciales.");
        }
      });
    });
});
