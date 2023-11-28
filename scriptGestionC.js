$(document).ready(function () {
    // Obtener UsuarioID del LocalStorage
    var userData = JSON.parse(localStorage.getItem('usuario'));
    var usuarioID = userData ? userData.usuarioID : null;

    // Cargar citas del usuario desde la base de datos
    cargarCitas(usuarioID);
});

function cargarCitas(usuarioID) {
    // Hacer una solicitud AJAX para obtener las citas del usuario desde la base de datos
    $.ajax({
        type: "POST",
        url: "php/GestionC.php",
        data: { usuarioID: usuarioID },
        success: function (response) {
            // Parsear la respuesta como JSON
            var citas = JSON.parse(response);

            // Obtener el cuerpo de la tabla
            var citasTableBody = $("#citasTableBody");

            // Limpiar las filas existentes
            citasTableBody.empty();

            // Iterar sobre las citas y agregar filas a la tabla
            citas.forEach(function (cita) {
                var fila = $("<tr>");
                fila.append($("<td>").text(cita.CitaID));
                fila.append($("<td>").text(cita.Nombre));
                fila.append($("<td>").text(cita.Descripcion));
                fila.append($("<td>").text(cita.Comentarios));
                fila.append($("<td>").text(cita.Email));
                fila.append($("<td>").text(cita.Telefono));
                fila.append($("<td>").text(cita.ServID));
                fila.append($("<td>").html("<button class='btn btn-warning' onclick='reagendarCita(" + cita.CitaID + ")'>Reagendar Cita</button>"));
                citasTableBody.append(fila);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + status, error);
        }
    });
}

function reagendarCita(citaID) {
    // Implementa la lógica para reagendar la cita aquí
    // Puedes abrir un modal, por ejemplo, para que el usuario seleccione una nueva fecha y hora
    // Luego, actualiza la cita en la base de datos con la nueva fecha y hora
    // y vuelve a cargar las citas llamando a cargarCitas(usuarioID)
}
