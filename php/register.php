<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"]) && isset($_POST["usuario"]) && isset($_POST["rolid"])) {
    $email = $_POST["email"];
    $usuario = $_POST["usuario"];
    $rolid = $_POST["rolid"];

    // Verificar existencia en la base de datos
    $sqlEmail = "SELECT * FROM usuario WHERE EmailU = '$email'";
    $resultEmail = $conn->query($sqlEmail);
    $sqlUsuario = "SELECT * FROM usuario WHERE NombreU = '$usuario'";
    $resultUsuario = $conn->query($sqlUsuario);

    $resultInsert = null;
    if ($resultEmail && $resultUsuario) {
        if ($resultEmail->num_rows > 0 && $resultUsuario->num_rows > 0) {
            echo "El usuario y el email ya existen en la base de datos";
        } elseif ($resultEmail->num_rows > 0) {
            echo "El email ya existe en la base de datos";
        } elseif ($resultUsuario->num_rows > 0) {
            echo "El usuario ya existe en la base de datos";
        } else {


            
            // Insertar nuevo usuario en la base de datos
            $password = $_POST["password"];
            $sqlInsert = "INSERT INTO usuario (NombreU, Contraseña, EmailU, Rolid) VALUES ('$usuario', '$password', '$email', '$rolid')";
            $resultInsert = $conn->query($sqlInsert);

            if ($resultInsert === TRUE) {
                echo "Registro exitoso";
            } else {
                echo "Error al registrar usuario: " . $conn->error;
            }
        }
    } else {
        echo "Error en la consulta a la base de datos";
    }
}


$conn->close();
?>
