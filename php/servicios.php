<?php
include("conexion.php");

// Consultar la base de datos para obtener los servicios
$sql = "SELECT ServID, Nombre, Descripcion, Precio FROM servicio";
$result = $conn->query($sql);

// Cerrar la conexión
$conn->close();

// Convertir resultados a JSON y enviarlos
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>