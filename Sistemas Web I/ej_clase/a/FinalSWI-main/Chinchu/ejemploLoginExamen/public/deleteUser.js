// vi /public/deleteUser.js
const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
    if(!deleteUser(username)){
        event.preventDefault();
    }
});
function deleteUser(username) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${username}?`)) {
        fetch(`/usuarios/deleteUser?username=${username}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Puedes recargar la página o actualizar la tabla según tus necesidades
                    location.reload();
                } else {
                    console.error('Error al eliminar el usuario');
                }
            })
            .catch(error => console.error('Error:', error));
    }
}