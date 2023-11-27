// Simulación de datos (puedes reemplazar esto con llamadas a una API o base de datos real)
let servicios = [
    { id: 1, nombre: 'Baño', productos: ['Shampoo', 'Acondicionador'], descripcion: 'El servicio incluye el baño de la mascota y peinado.', precio: 20, citas: 20 },
    { id: 2, nombre: 'Corte de Pelo', productos: ['Tijeras', 'Peine'], descripcion: 'Descripción del corte de pelo.', precio: 30, citas: 15 },
    { id: 3, nombre: 'Vacunación', productos: ['Vacuna', 'Jeringa'], descripcion: 'Descripción de la vacunación.', precio: 50, citas: 10 },
 // Puedes agregar más servicios según sea necesario
];

const formModal = document.getElementById('serviceFormModal');
const serviceList = document.getElementById('serviceList');

const itemsPerPage = 6;
let currentPage = 1;

// Función para mostrar los servicios en la tabla
function renderServices() {
    serviceList.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServices = servicios.slice(startIndex, endIndex);

    currentServices.forEach((servicio) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="service-cell" onclick="toggleDetails(${servicio.id})">
                    <span>${servicio.nombre}</span>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary"
                            onclick="editService(${servicio.id}, event)">Editar</button>
                        <button type="button" class="btn btn-danger"
                            onclick="deleteService(${servicio.id})">Eliminar</button>
                    </div>
                </div>
                <div class="details" id="details_${servicio.id}">
                    <!-- Nueva tabla para detalles -->
                    <table class="details-table">
                        <tr>
                            <th>Productos</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Agendados</th>
                        </tr>
                        <tr>
                            <td>
                                <ul>
                                    ${servicio.productos.map(product => `<li>${product}</li>`).join('')}
                                </ul>
                            </td>
                            <td>${servicio.descripcion}</td>
                            <td>$${servicio.precio}</td>
                            <td>${servicio.citas}</td>
                        </tr>
                    </table>
                </div>
            </td>
        `;
        serviceList.appendChild(row);
    });

    renderPagination();
}

// Función para abrir el modal al hacer clic en "Agregar Servicio"
function openServiceModal() {
    // Limpiar el formulario antes de mostrar el modal
    formModal.reset();
    document.getElementById('serviceIdModal').value = '';

    // Mostrar el modal
    $('#serviceModal').modal('show');
}

// Función para agregar o editar un servicio
formModal.addEventListener('submit', function (event) {
    event.preventDefault();

    const serviceName = document.getElementById('serviceNameModal').value;
    const productList = document.getElementById('productListModal').value.split(',').map(item => item.trim());
    const serviceDescription = document.getElementById('serviceDescriptionModal').value;
    const servicePrice = parseFloat(document.getElementById('servicePriceModal').value);
    const serviceAppointments = parseInt(document.getElementById('serviceAppointmentsModal').value);
    const serviceId = document.getElementById('serviceIdModal').value;

    if (serviceId) {
        // Editar servicio existente
        const existingService = servicios.find(s => s.id == serviceId);
        existingService.nombre = serviceName;
        existingService.productos = productList;
        existingService.descripcion = serviceDescription;
        existingService.precio = servicePrice;
        existingService.citas = serviceAppointments;
    } else {
        // Agregar nuevo servicio
        const newService = {
            id: servicios.length + 1,
            nombre: serviceName,
            productos: productList,
            descripcion: serviceDescription,
            precio: servicePrice || 0,
            citas: serviceAppointments || 0,
        };
        servicios.push(newService);
    }

    // Limpiar el formulario
    formModal.reset();
    document.getElementById('serviceIdModal').value = '';

    // Cerrar el modal
    $('#serviceModal').modal('hide');

    // Actualizar la tabla
    renderServices();
});

// Función para editar un servicio
function editService(id, event) {
    // Detener la propagación del evento para que no se muestren los detalles
    event.stopPropagation();

    const service = servicios.find(s => s.id == id);
    document.getElementById('serviceNameModal').value = service.nombre;
    document.getElementById('productListModal').value = service.productos.join(', ');
    document.getElementById('serviceDescriptionModal').value = service.descripcion;
    document.getElementById('servicePriceModal').value = service.precio;
    document.getElementById('serviceAppointmentsModal').value = service.citas;
    document.getElementById('serviceIdModal').value = service.id;

    // Mostrar el modal
    $('#serviceModal').modal('show');
}

// Función para eliminar un servicio
function deleteService(id) {
    servicios = servicios.filter(s => s.id != id);
    renderServices();
}

// Función para mostrar u ocultar los detalles al hacer clic en el botón
function toggleDetails(id) {
    const details = document.getElementById(`details_${id}`);
    details.style.display = (details.style.display === 'block') ? 'none' : 'block';
}

// Función para renderizar la lista de productos
function renderProductList(products) {
    return products.map(product => `<p>${product}</p>`).join('');
}

// Función para filtrar los servicios en la tabla
function filterServices() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase();

    const filteredServices = servicios.filter(service => service.nombre.toLowerCase().includes(searchText));

    // Actualizar la tabla con los servicios filtrados
    renderFilteredServices(filteredServices);
}

// Función para mostrar los servicios filtrados en la tabla
function renderFilteredServices(filteredServices) {
    serviceList.innerHTML = '';
    filteredServices.forEach((servicio) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <div class="service-cell" onclick="toggleDetails(${servicio.id})">
            <span>${servicio.nombre}</span>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary"
                    onclick="editService(${servicio.id}, event)">Editar</button>
                <button type="button" class="btn btn-danger"
                    onclick="deleteService(${servicio.id})">Eliminar</button>
            </div>
        </div>
        <div class="details" id="details_${servicio.id}">
            <!-- Nueva tabla para detalles -->
            <table class="details-table">
                <tr>
                    <th>Productos</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Agendados</th>
                </tr>
                <tr>
                    <td>
                        <ul>
                            ${servicio.productos.map(product => `<li>${product}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${servicio.descripcion}</td>
                    <td>$${servicio.precio}</td>
                    <td>${servicio.citas}</td>
                </tr>
            </table>
        </div>
    </td>
`;
        serviceList.appendChild(row);
    });
}

// Función para renderizar el paginador
function renderPagination() {
    const totalPages = Math.ceil(servicios.length / itemsPerPage);
    const maxVisiblePages = 10; // Número máximo de páginas visibles a la vez
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = '';

    const ul = document.createElement('ul');
    ul.classList.add('pagination');

    // Botón Página Anterior
    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    const prevButtonLink = document.createElement('button');
    prevButtonLink.textContent = 'Anterior';
    prevButtonLink.classList.add('page-link');
    prevButtonLink.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderServices();
        }
    });
    prevButton.appendChild(prevButtonLink);
    ul.appendChild(prevButton);

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('page-link');

        if (i === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentPage = i;
            renderServices();
            renderPagination(); // Añadir esta línea para actualizar la paginación después de cambiar la página
        });

        li.appendChild(button);
        ul.appendChild(li);
    }

    // Botón Página Siguiente
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    const nextButtonLink = document.createElement('button');
    nextButtonLink.textContent = 'Siguiente';
    nextButtonLink.classList.add('page-link');
    nextButtonLink.addEventListener('click', () => {
        const totalPages = Math.ceil(servicios.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderServices();
            renderPagination(); // Añadir esta línea para actualizar la paginación después de cambiar la página
        }
    });
    nextButton.appendChild(nextButtonLink);
    ul.appendChild(nextButton);

    paginationContainer.appendChild(ul);
}

// Función para ir a la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderServices();
    }
}

// Función para ir a la página siguiente
function nextPage() {
    const totalPages = Math.ceil(servicios.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderServices();
    }
}

// Mostrar servicios al cargar la página
renderServices();

