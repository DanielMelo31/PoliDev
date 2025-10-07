document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadAdminServices();
    setupEventListeners();
});

// Verificar autenticación
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    }
}

// Cargar servicios en la tabla de administración
function loadAdminServices() {
    const tableBody = document.querySelector('#admin-services-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const services = JSON.parse(localStorage.getItem('services')) || [];
    
    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>$${service.price.toLocaleString()}</td>
            <td>${service.stock}</td>
            <td>${service.promotion ? 'Sí' : 'No'}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${service.id}">Editar</button>
                <button class="action-btn delete-btn" data-id="${service.id}">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.id);
            editService(serviceId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.id);
            deleteService(serviceId);
        });
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Add service button
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', addService);
    }
}

function editService(serviceId) {
    // Implementar lógica de edición
    alert(`Editar servicio con ID: ${serviceId}`);
}

function deleteService(serviceId) {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(service => service.id !== serviceId);
        localStorage.setItem('services', JSON.stringify(services));
        loadAdminServices();
    }
}

function addService() {
    // Implementar lógica para agregar servicio
    alert('Agregar nuevo servicio');
}

function restoreAllServices() {
    if (confirm('¿Está seguro de que desea restaurar todos los servicios desde el archivo JSON original?')) {
        // Cargar el JSON original (puedes hacerlo de varias formas)
        
        // Opción 1: Si tienes el JSON en una variable
        const originalServices = {
            "services": [
           {
      "id": 1,
      "name": "Desarrollo Web",
      "price": 1200000,
      "image": "https://picsum.photos/id/1/300/200",
      "stock": 15,
      "description": "Desarrollo de sitios web responsivos y aplicaciones web modernas utilizando las últimas tecnologías.",
      "promotion": false
    },
    {
      "id": 2,
      "name": "Aplicaciones Móviles",
      "price": 2500000,
      "image": "https://picsum.photos/id/20/300/200",
      "stock": 10,
      "description": "Desarrollo de aplicaciones nativas e híbridas para iOS y Android.",
      "promotion": false
    },
    {
      "id": 3,
      "name": "Consultoría IT",
      "price": 800000,
      "image": "https://picsum.photos/id/28/300/200",
      "stock": 20,
      "description": "Asesoramiento especializado en tecnología para optimizar tus procesos empresariales.",
      "promotion": false
    },
    {
      "id": 4,
      "name": "Diseño UX/UI",
      "price": 900000,
      "image": "https://picsum.photos/id/39/300/200",
      "stock": 12,
      "description": "Diseño de interfaces de usuario centradas en la experiencia del cliente.",
      "promotion": true
    },
    {
      "id": 5,
      "name": "E-commerce",
      "price": 1800000,
      "image": "https://picsum.photos/id/42/300/200",
      "stock": 8,
      "description": "Desarrollo de tiendas online con pasarelas de pago integradas.",
      "promotion": false
    },
    {
      "id": 6,
      "name": "SEO y Marketing Digital",
      "price": 600000,
      "image": "https://picsum.photos/id/48/300/200",
      "stock": 25,
      "description": "Estrategias de posicionamiento web y marketing digital para aumentar tu visibilidad.",
      "promotion": true
    },
    {
      "id": 7,
      "name": "Hosting y Dominio",
      "price": 150000,
      "image": "https://picsum.photos/id/60/300/200",
      "stock": 50,
      "description": "Servicios de hosting confiable y registro de dominios para tu presencia online.",
      "promotion": false
    },
    {
      "id": 8,
      "name": "Mantenimiento Web",
      "price": 300000,
      "image": "https://picsum.photos/id/65/300/200",
      "stock": 18,
      "description": "Mantenimiento preventivo y correctivo para asegurar el funcionamiento óptimo de tu sitio web.",
      "promotion": false
    },
    {
      "id": 9,
      "name": "Sistemas CRM",
      "price": 3000000,
      "image": "https://picsum.photos/id/84/300/200",
      "stock": 5,
      "description": "Implementación de sistemas de gestión de relaciones con clientes personalizados.",
      "promotion": true
    },
    {
      "id": 10,
      "name": "Seguridad Informática",
      "price": 1500000,
      "image": "https://picsum.photos/id/96/300/200",
      "stock": 7,
      "description": "Soluciones de seguridad para proteger tus datos y sistemas de posibles amenazas.",
      "promotion": false
    }
            ],
            "users": [
                {
                    "id": 1,
                    "username": "admin",
                    "password": "admin123"
                }
            ]
        };

        // Restaurar solo los servicios
        localStorage.setItem('services', JSON.stringify(originalServices.services));
        
        // Recargar la vista
        loadAdminServices();
        
        alert('Todos los servicios han sido restaurados correctamente.');
    }
}