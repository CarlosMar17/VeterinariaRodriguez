<?php
include("conexion.php");

$username = $_POST["usuario"];
$password = $_POST["password"];
// Validacion datos con base de datos
$sql = "SELECT * FROM usuario WHERE NombreU='$username'";
$result = $conn->query($sql);
if (!$result) {
    echo "Error en la consulta: " . $conn->error;
    return;
}
if ($result->num_rows === 0) {
    echo "Usuario no encontrado";
    return;
}
$row = $result->fetch_assoc();
if ($password !== $row['Contraseña']) {
    echo "Contraseña incorrecta";
    return;
}
$response = array(
    'status' => 'Exito',
    'rolid' => $row['RolID']
);

echo json_encode($response);
?>