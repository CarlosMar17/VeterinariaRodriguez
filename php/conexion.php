<?php
$servername = "localhost:3307"; // Puede ser "localhost" si está en el mismo servidor
$username = "root";
$password = "";
$dbname = "BDVeterinaria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>