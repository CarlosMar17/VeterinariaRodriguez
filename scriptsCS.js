document.addEventListener('DOMContentLoaded', function () {
    renderServices();
});

function renderServices() {
    const serviceList = document.getElementById('serviceList');

    // Realizar una solicitud AJAX para obtener los servicios
    fetch('php/ServiciosCS.php?action=get')
        .then(response => response.json())
        .then(data => {
            // Limpiar la lista de servicios
            serviceList.innerHTML = '';

            // Llenar la lista de servicios con los datos obtenidos
            data.forEach(servicio => {
                const serviceContainer = document.createElement('div');

                // Botón desplegable con estilos Bootstrap
                const serviceButton = document.createElement('button');
                serviceButton.classList.add('btn', 'btn-link', 'btn-block', 'text-left');
                serviceButton.setAttribute('type', 'button');
                serviceButton.setAttribute('data-toggle', 'collapse');
                serviceButton.setAttribute('data-target', `#collapse${servicio.ServID}`);
                serviceButton.setAttribute('aria-expanded', 'false');
                serviceButton.setAttribute('aria-controls', `collapse${servicio.ServID}`);
                serviceButton.innerHTML = servicio.Nombre;

                // Contenido desplegable
                const collapseDiv = document.createElement('div');
                collapseDiv.classList.add('collapse');
                collapseDiv.setAttribute('id', `collapse${servicio.ServID}`);

                // Tabla de información
                const table = document.createElement('table');
                table.classList.add('table', 'mt-2');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${servicio.Nombre}</td>
                            <td>${servicio.Descripcion}</td>
                            <td>${servicio.Precio}</td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editService(${servicio.ServID})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteService(${servicio.ServID})">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                `;

                // Agregar elementos al contenedor principal
                collapseDiv.appendChild(table);
                serviceContainer.appendChild(serviceButton);
                serviceContainer.appendChild(collapseDiv);

                serviceList.appendChild(serviceContainer);
            });
        })
        .catch(error => console.error('Error fetching services:', error));
}

function addService() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    // Realizar una solicitud AJAX para agregar el servicio
    fetch('php/ServiciosCS.php?action=add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Limpiar los campos después de agregar el servicio
            document.getElementById('nombre').value = '';
            document.getElementById('descripcion').value = '';
            document.getElementById('precio').value = '';

            // Volver a renderizar la lista de servicios
            renderServices();
        } else {
            console.error('Error adding service:', data.error);
        }
    })
    .catch(error => console.error('Error adding service:', error));
}

function editService(servID) {
    // Obtener los datos del servicio para editar
    fetch(`php/ServiciosCS.php?action=getById&id=${servID}`)
        .then(response => response.json())
        .then(data => {
            // Store the ServiceID in a variable
            const editedServiceID = data.ServID;

            // Rellenar los campos de edición con los datos del servicio
            document.getElementById('editServiceId').value = editedServiceID;
            document.getElementById('editNombre').value = data.Nombre;
            document.getElementById('editDescripcion').value = data.Descripcion;
            document.getElementById('editPrecio').value = data.Precio;

            // Abrir el modal de edición
            // (debes tener un modal con ID "editModal" en tu HTML)
            $('#editModal').modal('show');
        })
        .catch(error => console.error('Error fetching service details:', error));
}

function updateService() {
    const servID = document.getElementById('editServiceId').value;
    const nombre = document.getElementById('editNombre').value;
    const descripcion = document.getElementById('editDescripcion').value;
    const precio = document.getElementById('editPrecio').value;

    // Realizar una solicitud AJAX para actualizar el servicio
    fetch('php/ServiciosCS.php?action=update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: servID,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Cerrar el modal de edición
            $('#editModal').modal('hide');
            // Volver a renderizar la lista de servicios
            renderServices();
        } else {
            console.error('Error updating service:', data.error);
        }
    })
    .catch(error => console.error('Error updating service:', error));
}

function deleteService(servID) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
        // Realizar una solicitud AJAX para eliminar el servicio
        fetch(`php/ServiciosCS.php?action=delete&id=${servID}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Volver a renderizar la lista de servicios
                    renderServices();
                } else {
                    console.error('Error deleting service:', data.error);
                }
            })
            .catch(error => console.error('Error deleting service:', error));
    }
}
