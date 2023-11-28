<?php
include("conexion.php");

// Obtiene los parámetros de la solicitud AJAX
$citaID = $_POST['citaID'];
$nuevaFechaHora = $_POST['nuevaFechaHora'];

// Obtén el FyHID actual de la cita
$sqlSelectFyHID = "SELECT FyHID FROM cita WHERE CitaID = $citaID";
$resultSelectFyHID = $conn->query($sqlSelectFyHID);

if ($resultSelectFyHID->num_rows > 0) {
    $row = $resultSelectFyHID->fetch_assoc();
    $viejoFyHID = $row['FyHID'];

    // Actualiza la descripción en la tabla 'fecha y hora'
    $sqlUpdateFechaHora = "UPDATE `fecha y hora` SET Descripcion = '$nuevaFechaHora' WHERE FyHID = $viejoFyHID";

    if ($conn->query($sqlUpdateFechaHora) === TRUE) {
        echo "Fecha y hora actualizadas con éxito.";

        // Ahora, actualiza la cita en la tabla 'cita' con el nuevo FyHID
        $sqlUpdateCita = "UPDATE cita SET FyHID = (SELECT FyHID FROM `fecha y hora` WHERE Descripcion = '$nuevaFechaHora') WHERE CitaID = $citaID";

        if ($conn->query($sqlUpdateCita) === TRUE) {
            echo " Cita actualizada con éxito.";
        } else {
            echo "Error al actualizar la cita: " . $conn->error;
        }
    } else {
        echo "Error al actualizar la fecha y hora: " . $conn->error;
    }
} else {
    echo "Error: No se encontró el FyHID de la cita.";
}

// Cierra la conexión
$conn->close();
?>
