<?php
include("conexion.php");

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$descripcion = $_POST['descripcion'];
$fechaYHora = $_POST['fechaYHora'];
$servicioID = $_POST['servicioID'];
$usuarioID = $_POST['usuarioID'];

// Verificar si la fecha ya está capturada en la tabla
$sqlFechaExistente = "SELECT FyHID FROM `fecha y hora` WHERE `Descripcion` = '$fechaYHora'";
$resultFechaExistente = $conn->query($sqlFechaExistente);

if ($resultFechaExistente->num_rows > 0) {
    echo "La fecha y hora seleccionadas ya están ocupadas. Por favor, elige otra.";
} else {
    // Insertar datos en la tabla "fecha y hora"
    $sqlFechaHora = "INSERT INTO `fecha y hora` (`Descripcion`) VALUES ('$fechaYHora')";
    if ($conn->query($sqlFechaHora) === TRUE) {
        // Obtener el FyHID recién insertado
        $fyhID = $conn->insert_id;

        // Insertar datos en la tabla "cita"
        $sqlCita = "INSERT INTO `cita` (`Nombre`, `FyHID`, `Comentarios`, `Email`, `Telefono`, `ServID`, `UsuarioID`) VALUES ('$nombre', '$fyhID', '$descripcion', '$email', '$telefono', '$servicioID', '$usuarioID')";
        if ($conn->query($sqlCita) === TRUE) {
            echo "Cita agendada exitosamente";
        } else {
            echo "Error al agendar la cita: " . $conn->error;
        }
    } else {
        echo "Error al insertar fecha y hora: " . $conn->error;
    }
}

// Cerrar la conexión
$conn->close();
?>
