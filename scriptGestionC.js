    var userData = JSON.parse(localStorage.getItem('usuario'));
    var usuarioID = userData ? userData.usuarioID : null;


$(document).ready(function () {

    cargarCitas(usuarioID);
});

function cargarCitas(usuarioID) {
    $.ajax({
        type: "POST",
        url: "php/GestionC.php",
        data: { usuarioID: usuarioID },
        success: function (response) {
            console.log("Respuesta del servidor:", response);
            var citas = JSON.parse(response);
            var now = moment();
            var citasPasadas = citas.filter(function (cita) {
                return now.isAfter(moment(cita.Descripcion));
            });

            var citasFuturas = citas.filter(function (cita) {
                return now.isBefore(moment(cita.Descripcion));
            });
            citasFuturas.sort(function (a, b) {
                return moment(a.Descripcion) - moment(b.Descripcion);
            });
            var citasOrdenadas = citasFuturas.concat(citasPasadas);
            var citasTableBody = $("#citasTableBody");
            citasTableBody.empty();

            function formatoFecha(fecha) {
                var momentFecha = moment(fecha);
                var fechaFormateada = momentFecha.format("DD-MMM.YYYY");
                var horaFormateada = momentFecha.format("HH:mm");

                return { fecha: fechaFormateada, hora: horaFormateada };
            }
            citasOrdenadas.forEach(function (cita) {
                var botonReagendar = now.isBefore(moment(cita.Descripcion))
                    ? "<button class='btn btn-warning' onclick='abrirModalReagendar(" + cita.CitaID + ")'>Reagendar Cita</button>"
                    : "";

                var fila = $("<tr>");
                fila.append($("<td>").text(cita.CitaID));
                fila.append($("<td>").text(cita.Nombre));
                var fechaHora = formatoFecha(cita.Descripcion);
                fila.append($("<td>").text(fechaHora.fecha));
                fila.append($("<td>").text(fechaHora.hora));
                fila.append($("<td>").text(cita.Comentarios));
                fila.append($("<td>").text(cita.Email));
                fila.append($("<td>").text(cita.Telefono));
                fila.append($("<td>").text(cita.NombreServicio));
                fila.append($("<td>").html(botonReagendar));
                citasTableBody.append(fila);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + status, error);
        }
    });
}



function abrirModalReagendar(citaID) {
    $('#modalReagendar').modal('show');
    $('#modalReagendar').data('citaID', citaID);
}

function reagendarCita() {
    var nuevaFecha = document.getElementById("nuevaFecha").value;
    var nuevaHora = document.getElementById("nuevaHora").value;
    var citaID = $('#modalReagendar').data('citaID');
    if (nuevaFecha && nuevaHora) {
        $.ajax({
            type: "POST",
            url: "php/ActualizarCita.php",
            data: { citaID: citaID, nuevaFechaHora: nuevaFecha + ' ' + nuevaHora },
            success: function (response) {
                console.log("Cita reagendada con éxito.");
                cargarCitas(usuarioID);
            },
            error: function (xhr, status, error) {
                console.error("Error al reagendar la cita: " + status, error);
            }
        });
    }
}


