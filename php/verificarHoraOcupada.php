<?php
include("conexion.php");

$fechaYHora = $_POST['fechaYHora'];

// Verificar si la hora ya está ocupada en la tabla "fecha y hora"
$sqlHoraOcupada = "SELECT FyHID FROM `fecha y hora` WHERE `Descripcion` = '$fechaYHora'";
$resultHoraOcupada = $conn->query($sqlHoraOcupada);

if ($resultHoraOcupada->num_rows > 0) {
    echo "ocupada";
} else {
    echo "disponible";
}

// Cerrar la conexión
$conn->close();
?>
