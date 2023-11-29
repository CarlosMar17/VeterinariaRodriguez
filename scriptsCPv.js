document.addEventListener('DOMContentLoaded', function () {
    renderProviders();
});

function renderProviders() {
    const providerList = document.getElementById('providerList');

    fetch('php/Proveedores.php?action=get')
        .then(response => response.json())
        .then(data => {
            providerList.innerHTML = '';

            data.forEach(provider => {
                const providerContainer = document.createElement('div');

                const providerButton = document.createElement('button');
                providerButton.classList.add('btn', 'btn-link', 'btn-block', 'text-left');
                providerButton.setAttribute('type', 'button');
                providerButton.setAttribute('data-toggle', 'collapse');
                providerButton.setAttribute('data-target', `#collapse${provider.ProdID}`);
                providerButton.setAttribute('aria-expanded', 'false');
                providerButton.setAttribute('aria-controls', `collapse${provider.ProdID}`);
                providerButton.innerHTML = provider.Nombre;

                const collapseDiv = document.createElement('div');
                collapseDiv.classList.add('collapse');
                collapseDiv.setAttribute('id', `collapse${provider.ProdID}`);

                const table = document.createElement('table');
                table.classList.add('table', 'mt-2');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Email</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${provider.Nombre}</td>
                            <td>${provider.Telefono}</td>
                            <td>${provider.Email}</td>
                            <td>${provider.Direccion}</td>
                            <td>
                                <button class="btn btn-primary btn-sm" onclick="editProvider(${provider.ProdID})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteProvider(${provider.ProdID})">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                `;

                collapseDiv.appendChild(table);
                providerContainer.appendChild(providerButton);
                providerContainer.appendChild(collapseDiv);

                providerList.appendChild(providerContainer);
            });
        })
        .catch(error => console.error('Error fetching providers:', error));
}

function addProvider() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;

    fetch('php/Proveedores.php?action=add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('email').value = '';
            document.getElementById('direccion').value = '';

            renderProviders();
        } else {
            console.error('Error adding provider:', data.error);
        }
    })
    .catch(error => console.error('Error adding provider:', error));
}

function editProvider(prodID) {
    fetch(`php/Proveedores.php?action=getById&id=${prodID}`)
        .then(response => response.json())
        .then(data => {
            const editedProviderID = data.ProdID;

            document.getElementById('editProviderId').value = editedProviderID;
            document.getElementById('editNombre').value = data.Nombre;
            document.getElementById('editTelefono').value = data.Telefono;
            document.getElementById('editEmail').value = data.Email;
            document.getElementById('editDireccion').value = data.Direccion;
            $('#editModal').modal('show');
        })
        .catch(error => console.error('Error fetching provider details:', error));
}

function updateProvider() {
    const prodID = document.getElementById('editProviderId').value;
    const nombre = document.getElementById('editNombre').value;
    const telefono = document.getElementById('editTelefono').value;
    const email = document.getElementById('editEmail').value;
    const direccion = document.getElementById('editDireccion').value;
    fetch('php/Proveedores.php?action=update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: prodID,
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            $('#editModal').modal('hide');
            renderProviders();
        } else {
            console.error('Error updating provider:', data.error);
        }
    })
    .catch(error => console.error('Error updating provider:', error));
}

function deleteProvider(prodID) {
    if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
        fetch(`php/Proveedores.php?action=delete&id=${prodID}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderProviders();
                } else {
                    console.error('Error deleting provider:', data.error);
                }
            })
            .catch(error => console.error('Error deleting provider:', error));
    }
}
