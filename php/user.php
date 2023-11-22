<?php
// Conectar a la base de datos
include("conexion.php");

// Obtener los datos del formulario de inicio de sesión
$username = $_POST["usuario"];
$password = $_POST["password"];

// Verificar si el usuario existe
$sql = "SELECT * FROM usuario WHERE NombreU='$username'";
$result = $conn->query($sql);

// Verificar si hay errores en la consulta SQL
if (!$result) {
    echo "Error en la consulta: " . $conn->error;
    return;
}

// Verificar si se encontró un usuario
if ($result->num_rows === 0) {
    echo "Usuario no encontrado";
    return;
}

// Obtener la fila de resultados
$row = $result->fetch_assoc();

// Validar que la contraseña sea correcta
if ($password !== $row['Contraseña']) {
    echo "Contraseña incorrecta";
    return;
}

// Inicio de sesión exitoso
echo "Exito";
?>