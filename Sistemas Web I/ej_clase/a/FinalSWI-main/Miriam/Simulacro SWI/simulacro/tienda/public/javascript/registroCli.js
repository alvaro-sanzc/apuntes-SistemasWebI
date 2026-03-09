
function validarFormulario() {
    console.log('validar');
    var password = document.getElementById('pass1').value;
    var confirmPassword = document.getElementById('pass2').value;

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    } else if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    } else {
        document.getElementById('myform').submit();
        return true;
    }
}

