$("document").ready(function(){
    // Botón Registro
    $('#botonRegistroJS').click(function(){
        console.log("Funciona botón registro")
        $('#requisistosJS').hide()
        $('#formularioJS').show() 
    });

    // Botón Cancelar
    $('#cancelBtn').click(function(){
        console.log("Funciona botón cancelar")
        $('#formularioJS').hide()
        $('#requisistosJS').show() 
    });

    $('#enviar').click(function(){
        console.log("Funciona botón enviar")
        let nombreValue = $('#nombre').val();
        let numeroPalabras = nombreValue.trim().split(/\s+/).length;
        if (numeroPalabras > 1){
        }
    });

});