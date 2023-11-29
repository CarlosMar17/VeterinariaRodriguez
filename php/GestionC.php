<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuarioID = $_POST["usuarioID"];

    $sql = "SELECT c.CitaID, c.Nombre, fh.Descripcion, c.Comentarios, c.Email, c.Telefono, s.Nombre AS NombreServicio, c.UsuarioID
            FROM cita c
            INNER JOIN `fecha y hora` fh ON c.FyHID = fh.FyHID
            INNER JOIN servicio s ON c.ServID = s.ServID
            WHERE c.UsuarioID = $usuarioID";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $citas = array();
        while ($row = $result->fetch_assoc()) {
            $citas[] = $row;
        }
        echo json_encode($citas);
    } else {
        echo json_encode(array());
    }
} else {
    echo "Error: Método de solicitud incorrecto.";
}

$conn->close();
?>
