// JavaScript para manejar el evento de clic en el botón "Agendar Cita"
document.getElementById("agendarCitaButton").addEventListener("click", function(event) {
    // Prevenir el envío predeterminado del formulario
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("Email").value;
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;

    // Obtener servicioID desde LocalStorage
    var servicioID = localStorage.getItem('servicioID');

    // Enviar los datos al archivo PHP utilizando AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/FReserva.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Preparar los datos a enviar
    var data = "nombre=" + encodeURIComponent(nombre) +
               "&Email=" + encodeURIComponent(email) +
               "&fecha=" + encodeURIComponent(fecha) +
               "&hora=" + encodeURIComponent(hora) +
               "&servicioID=" + encodeURIComponent(servicioID);

    // Manejar la respuesta del servidor
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // Muestra la respuesta del servidor en una alerta (puedes cambiar esto)
        }
    };

    // Enviar la solicitud
    xhr.send(data);
});