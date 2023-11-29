<?php
include("conexion.php");

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'get') {
    $sql = "SELECT * FROM proveedores";
    $result = $conn->query($sql);

    $providers = array();
    while ($row = $result->fetch_assoc()) {
        $providers[] = $row;
    }

    echo json_encode($providers);
} elseif ($action == 'add') {
    $data = json_decode(file_get_contents("php://input"));

    $nombre = $data->nombre;
    $telefono = $data->telefono;
    $email = $data->email;
    $direccion = $data->direccion;

    $sql = "INSERT INTO proveedores (Nombre, Telefono, Email, Direccion) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nombre, $telefono, $email, $direccion);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'getById') {
    $prodID = $_GET['id'];
    $sql = "SELECT * FROM proveedores WHERE ProdID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $prodID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $provider = $result->fetch_assoc();
        echo json_encode($provider);
    } else {
        echo json_encode(['error' => 'Provider not found']);
    }

    $stmt->close();
} elseif ($action == 'update') {
    $data = json_decode(file_get_contents("php://input"));

    $prodID = $data->id;
    $nombre = $data->nombre;
    $telefono = $data->telefono;
    $email = $data->email;
    $direccion = $data->direccion;

    $sql = "UPDATE proveedores SET Nombre=?, Telefono=?, Email=?, Direccion=? WHERE ProdID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $telefono, $email, $direccion, $prodID);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'delete') {
    $prodID = $_GET['id'];
    $sql = "DELETE FROM proveedores WHERE ProdID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $prodID);
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
