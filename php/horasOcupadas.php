<?php
include("conexion.php");

$fechaSeleccionada = $_POST['fechaSeleccionada'];

$sqlHorasOcupadas = "SELECT HOUR(`Descripcion`) AS hora FROM `fecha y hora` WHERE DATE(`Descripcion`) = '$fechaSeleccionada'";
$resultHorasOcupadas = $conn->query($sqlHorasOcupadas);

$horasOcupadas = array();

if ($resultHorasOcupadas->num_rows > 0) {
    while ($row = $resultHorasOcupadas->fetch_assoc()) {
        $horasOcupadas[] = str_pad($row['hora'], 2, '0', STR_PAD_LEFT) . ":00";
    }
}

echo json_encode($horasOcupadas);

$conn->close();
?>