// JavaScript para manejar el evento de clic en el botón "Agendar Cita"
document.getElementById("agendarCitaButton").addEventListener("click", function(event) {
        
    // Retrieve servicioID and usuarioID from LocalStorage
    var servicioID = localStorage.getItem('servicioID');
    var userData = JSON.parse(localStorage.getItem('usuario'));
    var usuarioID = userData ? userData.usuarioID : null;

    // Use servicioID and usuarioID as needed
    console.log('Servicio ID:', servicioID);
    console.log('Usuario ID:', usuarioID);
    
    // Prevenir el envío predeterminado del formulario
    event.preventDefault();

    // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
    var fechaActual = new Date().toISOString().split('T')[0];

    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("Email").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;

    // Combina fecha y hora en un formato DATETIME
    var fechaYHora = fecha + ' ' + hora;

    // Verificar si la fecha es anterior al día de hoy
    if (fecha < fechaActual) {
        alert("No puedes seleccionar una fecha anterior al día de hoy.");
        return;
    }

    // Verificar si la hora es anterior a la actual (solo para el día de hoy)
    if (fecha === fechaActual) {
        var horaActual = new Date().getHours();
        var horaSeleccionada = parseInt(hora.split(":")[0]);

        if (horaSeleccionada < horaActual) {
            alert("No puedes seleccionar una hora anterior a la actual para el día de hoy.");
            return;
        }
    }

    // Verificar si la hora ya está ocupada en la tabla "fecha y hora"
    if (horaOcupada(fechaYHora)) {
        alert("La hora seleccionada ya está ocupada. Por favor, elige otra.");
        return;
    }

    // Enviar los datos al archivo PHP utilizando AJAX
    $.ajax({
        type: "POST",
        url: "php/FReserva.php",
        data: {
            nombre: nombre,
            email: email,
            fechaYHora: fechaYHora,
            servicioID: servicioID,
            usuarioID: usuarioID
        },
        success: function(response) {
            alert(response); // Muestra la respuesta del servidor en una alerta (puedes cambiar esto)
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + status, error);
        }
    });
});

// Función para verificar si la hora está ocupada en la tabla "fecha y hora"
function horaOcupada(fechaYHora) {
    var ocupada = false;

    // Hacer una solicitud AJAX para verificar si la hora ya está ocupada en la base de datos
    $.ajax({
        type: "POST",
        async: false,
        url: "php/verificarHoraOcupada.php",
        data: { fechaYHora: fechaYHora },
        success: function(response) {
            ocupada = response === "ocupada";
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + status, error);
        }
    });

    return ocupada;
}

// Función para cargar las horas disponibles basándose en las fechas existentes
function cargarHorasDisponibles() {
    var fechaSeleccionada = document.getElementById("fecha").value;

    // Obtener las horas ya ocupadas para la fecha seleccionada
    $.ajax({
        type: "POST",
        url: "php/horasOcupadas.php",
        data: { fechaSeleccionada: fechaSeleccionada },
        success: function(response) {
            // Parsear la respuesta como JSON
            var horasOcupadas = JSON.parse(response);

            // Obtener el elemento del selector de horas
            var selectorHora = document.getElementById("hora");

            // Limpiar las opciones existentes
            selectorHora.innerHTML = "";

            // Añadir las opciones disponibles
            for (var i = 8; i <= 19; i++) {
                var horaFormateada = i.toString().padStart(2, '0') + ":00";

                // Solo añadir la hora si no está ocupada
                if (!horasOcupadas.includes(horaFormateada)) {
                    var opcion = document.createElement("option");
                    opcion.value = horaFormateada;
                    opcion.text = horaFormateada;
                    selectorHora.add(opcion);
                }
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + status, error);
        }
    });
}

// Evento al cambiar la fecha para cargar las horas disponibles
document.getElementById("fecha").addEventListener("change", function() {
    cargarHorasDisponibles();
});

// Cargar las horas disponibles al cargar la página
cargarHorasDisponibles();
