<?php
$servername = "localhost:3307"; // Puede ser "localhost" si está en el mismo servidor
$username = "root";
$password = "";
$dbname = "BDVeterinaria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
    echo("Conexion Exitosa");
// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
    
}
?>

 

<?php
include("conexion.php");

// Manejar el inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Realizar la verificación en la base de datos (puedes usar contraseñas con hash)
    $sql = "SELECT id FROM usuario WHERE NombreU = '$username' AND contraseña = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Inicio de sesión exitoso
        echo "Inicio de sesión exitoso";
    } else {
        // Credenciales incorrectas
        echo "Usuario o contraseña incorrectos";
    }
}

// Manejar el registro
elseif ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"]) && isset($_POST["password"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Insertar nuevo usuario en la base de datos
    $sql = "INSERT INTO usuario (NombreU, contraseña, EmailU) VALUES ('$username', '$password', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo "Registro exitoso";
    } else {
        echo "Error al registrar usuario: " . $conn->error;
    }
}

// Cerrar conexión
$conn->close();
?>