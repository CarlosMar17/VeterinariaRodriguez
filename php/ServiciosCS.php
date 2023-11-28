<?php
include("conexion.php");

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'get') {
    // Obtener la lista de servicios
    $sql = "SELECT * FROM servicio";
    $result = $conn->query($sql);

    $services = array();
    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }

    echo json_encode($services);
} elseif ($action == 'add') {
    // Agregar un nuevo servicio
    $data = json_decode(file_get_contents("php://input"));

    $nombre = $data->nombre;
    $descripcion = $data->descripcion;
    $precio = $data->precio;

    $sql = "INSERT INTO servicio (Nombre, Descripcion, Precio) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nombre, $descripcion, $precio);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'getById') {
    // Obtener detalles de un servicio por ID para la edición
    $servID = $_GET['id'];
    $sql = "SELECT * FROM servicio WHERE ServID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $servID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $service = $result->fetch_assoc();
        echo json_encode($service);
    } else {
        echo json_encode(['error' => 'Service not found']);
    }

    $stmt->close();
} elseif ($action == 'update') {
    // Actualizar un servicio
    $data = json_decode(file_get_contents("php://input"));

    $servID = $data->id;
    $nombre = $data->nombre;
    $descripcion = $data->descripcion;
    $precio = $data->precio;

    $sql = "UPDATE servicio SET Nombre=?, Descripcion=?, Precio=? WHERE ServID=?";    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdi", $nombre, $descripcion, $precio, $servID);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'delete') {
    // Eliminar un servicio
    $servID = $_GET['id'];
    $sql = "DELETE FROM servicio WHERE ServID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $servID);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} 

$conn->close();
?>
