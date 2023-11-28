<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el UsuarioID del POST
    $usuarioID = $_POST["usuarioID"];
    echo "Usuario ID: " . $usuarioID;

    // Hacer una consulta para obtener las citas del usuario desde la base de datos
    $sql = "SELECT * FROM cita WHERE UsuarioID = $usuarioID";
    $result = $conn->query($sql);
    echo "Número de filas: " . $result->num_rows;

    if ($result->num_rows > 0) {
        // Convertir el resultado a un array asociativo
        $citas = array();
        while ($row = $result->fetch_assoc()) {
            $citas[] = $row;
        }

        // Devolver el array como JSON
        echo json_encode($citas);
    } else {
        // No hay citas para este usuario
        echo json_encode(array());
    }
} else {
    // La solicitud no es de tipo POST
    echo "Error: Método de solicitud incorrecto.";
}

$conn->close();
?>