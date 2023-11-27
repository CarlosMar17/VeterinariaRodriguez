<?php
include("conexion.php");

// Verificar si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener los datos del formulario
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $email = mysqli_real_escape_string($conn, $_POST['Email']);
    $fecha = mysqli_real_escape_string($conn, $_POST['fecha']);
    $hora = mysqli_real_escape_string($conn, $_POST['hora']);

    // Recuperar el servicioID desde LocalStorage
    $servicioID = $_POST['servicioID'];

    // Sentencia SQL para insertar datos en la tabla cita (asumiendo que CitaID es autoincremental)
    $sql = "INSERT INTO cita (Nombre, `Fecha y hora`, Email, ServID) VALUES ('$nombre', '$fecha $hora', '$email', '$servicioID')";

    if ($conn->query($sql) === TRUE) {
        echo "Cita agendada correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Acceso no permitido.";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>