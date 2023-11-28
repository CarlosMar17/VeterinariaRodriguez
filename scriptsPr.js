document.addEventListener('DOMContentLoaded', function () {
    renderProductos();
});

function renderProductos() {
    const productList = document.getElementById('productList');

    // Realizar una solicitud AJAX para obtener los productos
    fetch('php/Productos.php')
        .then(response => response.json())
        .then(data => {
            
            productList.innerHTML = '';

            data.forEach(producto => {
                const productContainer = document.createElement('div');

                
                const productButton = document.createElement('button');
                productButton.classList.add('btn', 'btn-link', 'btn-block', 'text-left');
                productButton.setAttribute('type', 'button');
                productButton.setAttribute('data-toggle', 'collapse');
                productButton.setAttribute('data-target', `#collapse${producto.ProdID}`);
                productButton.setAttribute('aria-expanded', 'false');
                productButton.setAttribute('aria-controls', `collapse${producto.ProdID}`);
                productButton.innerHTML = producto.Nombre;

                // Contenido desplegable
                const collapseDiv = document.createElement('div');
                collapseDiv.classList.add('collapse');
                collapseDiv.setAttribute('id', `collapse${producto.ProdID}`);

                // Tabla de información
                const table = document.createElement('table');
                table.classList.add('table', 'mt-2');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${producto.Nombre}</td>
                            <td>${producto.Descripcion}</td>
                            <td>${producto.Precio}</td>
                            <td>${producto.Cantidad}</td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editProduct(${producto.ProdID})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${producto.ProdID})">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                `;

                collapseDiv.appendChild(table);
                productContainer.appendChild(productButton);
                productContainer.appendChild(collapseDiv);

                productList.appendChild(productContainer);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
        function addProduct() {
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const cantidad = document.getElementById('cantidad').value;
        
            fetch('php/Productos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    cantidad: cantidad,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    document.getElementById('nombre').value = '';
                    document.getElementById('descripcion').value = '';
                    document.getElementById('precio').value = '';
                    document.getElementById('cantidad').value = '';
        
                    
                    renderProductos();
                } else {
                    console.error('Error adding product:', data.error);
                }
            })
            .catch(error => console.error('Error adding product:', error));
        }
        
        function editProduct(prodID) {

            fetch(`php/Productos.php${prodID}`)
                .then(response => response.json())
                .then(data => {
                    
                    const editedProductID = data.ProdID;
        
                    document.getElementById('editProductID').value = editedProductID;
                    document.getElementById('editNombre').value = data.Nombre;
                    document.getElementById('editDescripcion').value = data.Descripcion;
                    document.getElementById('editPrecio').value = data.Precio;
                    document.getElementById('editCantidad').value = data.Cantidad;
        
                    $('#editProductModal').modal('show');
                })
                .catch(error => console.error('Error fetching product details:', error));
        }
        
        function updateProduct() {
            const prodID = document.getElementById('editProductID').value;
            const nombre = document.getElementById('editNombre').value;
            const descripcion = document.getElementById('editDescripcion').value;
            const precio = document.getElementById('editPrecio').value;
            const cantidad = document.getElementById('editCantidad').value;
        
            // Realizar una solicitud AJAX para actualizar el producto
            fetch('php/Productos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: prodID,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    cantidad: cantidad,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    
                    $('#editProductModal').modal('hide');
                    
                    renderProductos();
                } else {
                    console.error('Error updating product:', data.error);
                }
            })
            .catch(error => console.error('Error updating product:', error));
        }
        
        function deleteProduct(prodID) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                // Realizar una solicitud AJAX para eliminar el producto
                fetch(`php/Productos.php${prodID}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            
                            renderProductos();
                        } else {
                            console.error('Error deleting product:', data.error);
                        }
                    })
                    .catch(error => console.error('Error deleting product:', error));
            }
        }
}

