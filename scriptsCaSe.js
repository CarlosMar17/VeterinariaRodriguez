function mostrarOcultarBotonesSesion() {
    var storedUserData = localStorage.getItem("usuario");
    if (storedUserData) {
        var parsedUserData = JSON.parse(storedUserData);
        var rolid = parsedUserData.rolid;

        // Mostrar u ocultar botones según el tipo de usuario o condición
        if (rolid === "1" || rolid === "2" || rolid === "3") {
            // Mostrar botones solo para usuarios autenticados con roles 1, 2, o 3
            $('.solo-sesion').show();
        } else {
            // Ocultar botones para otros tipos de usuarios
            $('.solo-sesion').hide();
        }
    } else {
        // Ocultar botones si no hay usuario autenticado
        $('.solo-sesion').hide();
    }
}

$(document).ready(function () {
    cargarServicios();
});

// Función para cargar servicios mediante AJAX
function cargarServicios() {
    $.ajax({
        url: 'php/servicios.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Datos de servicios recibidos:', data);

            // Limpiar la tabla antes de agregar nuevos datos
            $('#tabla-servicios').empty();

            // Agregar cada servicio a la tabla
            $.each(data, function (index, servicio) {
                $('#tabla-servicios').append(
                    "<tr>" +
                    "<td>" + servicio.Nombre + "</td>" +
                    "<td>" + servicio.Descripcion + "</td>" +
                    "<td>" + servicio.Precio + " €</td>" +
                    '<td><button type="button" class="btn btn-primary agendar-cita solo-sesion" data-id="' + servicio.ServID + '">Agendar Cita</button></td>' +
                    "</tr>"
                );
            });

            // Agregar evento clic al botón de agendar cita
            $('.agendar-cita').click(function () {
                var servicioID = $(this).data('id');

                // Almacenar la ID del servicio en LocalStorage
                localStorage.setItem('servicioID', servicioID);

                // Redirigir a la página de formulario de reserva
                window.location.href = 'FReserva.html';
            });

            // Mostrar u ocultar botones según la sesión de usuario
            mostrarOcultarBotonesSesion();
        },
        error: function (xhr, status, error) {
            console.log('Error al cargar los servicios:', status, error);

            // Puedes agregar más detalles del error si es necesario
            console.log('Respuesta completa:', xhr.responseText);
        }
    });
}
