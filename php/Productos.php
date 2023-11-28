<?php
include("conexion.php");

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action == 'get') {
    // Obtener la lista de productos
    $sql = "SELECT * FROM producto";
    $result = $conn->query($sql);

    $productos = array();
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    echo json_encode($productos);
} elseif ($action == 'add') {
    // Agregar un nuevo producto
    $data = json_decode(file_get_contents("php://input"));

    $nombre = $data->nombre;
    $descripcion = $data->descripcion;
    $precio = $data->precio;
    $cantidad = $data->cantidad;

    $sql = "INSERT INTO producto (Nombre, Descripcion, Precio, Cantidad) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdi", $nombre, $descripcion, $precio, $cantidad);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'getById') {
    // Obtener detalles de un producto por ID para la edición
    $prodID = $_GET['id'];
    $sql = "SELECT * FROM producto WHERE ProdID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $prodID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $producto = $result->fetch_assoc();
        echo json_encode($producto);
    } else {
        echo json_encode(['error' => 'Product not found']);
    }

    $stmt->close();
} elseif ($action == 'update') {
    // Actualizar un producto
    $data = json_decode(file_get_contents("php://input"));

    $prodID = $data->id;
    $nombre = $data->nombre;
    $descripcion = $data->descripcion;
    $precio = $data->precio;
    $cantidad = $data->cantidad;

    $sql = "UPDATE producto SET Nombre=?, Descripcion=?, Precio=?, Cantidad=? WHERE ProdID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdii", $nombre, $descripcion, $precio, $cantidad, $prodID);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'delete') {
    // Eliminar un producto
    $prodID = $_GET['id'];
    $sql = "DELETE FROM producto WHERE ProdID = ?";
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
