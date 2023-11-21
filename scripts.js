$(document).ready(function(){
    $("#registerMbutton").on("click", function(){
        $("#loginModal").modal("hide"); // Cierra el modal de inicio de sesión
    });

    // Evento que se dispara cuando el modal de inicio de sesión se cierra completamente
    $('#loginModal').on('hidden.bs.modal', function (e) {
        $("#registerModal").modal("show"); // Muestra el modal de registro
    });

    // Evento que se dispara cuando el modal de registro se cierra completamente
    $('#registerModal').on('hidden.bs.modal', function (e) {
        $('.modal-backdrop').remove(); // Elimina el fondo oscuro del modal
    });
});