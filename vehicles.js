const vehiclesUrl = 'https://swapi.dev/api/vehicles/';

// Función para obtener todos los vehículos
async function fetchAllVehicles(url) {
    let allVehicles = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allVehicles = allVehicles.concat(data.results);
            nextUrl = data.next; // Obtén la URL de la siguiente página
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; // Termina el bucle en caso de error
        }
    }

    return allVehicles;
}

// Función para mostrar todos los vehículos
function displayVehicles(vehicles) {
    const container = document.getElementById('vehicles');
    container.innerHTML = '';

    vehicles.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${vehicle.name}</h3>
            <p>Modelo: ${vehicle.model}</p>
            <p>Capacidad de Carga: ${vehicle.cargo_capacity}</p>
            <p>Clase: ${vehicle.vehicle_class}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar vehículos por modelo
function showVehicleByModel() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const select = document.getElementById('model-select');
        const models = [...new Set(vehicles.map(v => v.model))]; // Extrae modelos únicos
        select.innerHTML = '<option value="">Seleccionar</option>';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            select.appendChild(option);
        });
        document.getElementById('model-menu').classList.remove('hidden');
    });
}

// Función para mostrar vehículo del modelo seleccionado
function showVehicleByModelSelection() {
    const model = document.getElementById('model-select').value;
    if (!model) return;

    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const selectedVehicle = vehicles.find(v => v.model === model);
        if (selectedVehicle) {
            const container = document.getElementById('vehicles');
            container.innerHTML = `<h2>Vehículo del modelo ${model}</h2>`;
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${selectedVehicle.name}</h3>
                <p>Modelo: ${selectedVehicle.model}</p>
                <p>Capacidad de Carga: ${selectedVehicle.cargo_capacity}</p>
                <p>Clase: ${selectedVehicle.vehicle_class}</p>
            `;
            container.appendChild(card);
        }
    });
}

// Función para ordenar vehículos por capacidad de carga de mayor a menor
function sortByCargoCapacity() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        vehicles.sort((a, b) => b.cargo_capacity - a.cargo_capacity);
        displayVehicles(vehicles);
    });
}

// Función para mostrar películas en las que aparece el vehículo
function showMoviesByVehicle() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const select = document.getElementById('movies-vehicle-select');
        select.innerHTML = '<option value="">Seleccionar</option>';
        vehicles.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.url;
            option.textContent = vehicle.name;
            select.appendChild(option);
        });
        document.getElementById('movies-menu').classList.remove('hidden');
    });
}

// Función para mostrar las películas del vehículo seleccionado
function showMovies() {
    const vehicleUrl = document.getElementById('movies-vehicle-select').value;
    if (!vehicleUrl) return;

    fetch(vehicleUrl).then(response => response.json()).then(vehicle => {
        const moviesPromises = vehicle.films.map(url => fetch(url).then(res => res.json()));
        Promise.all(moviesPromises).then(movies => {
            const container = document.getElementById('vehicles');
            container.innerHTML = `<h2>Películas en las que aparece ${vehicle.name}</h2>`;
            movies.forEach(movie => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${movie.title}</h3>
                    <p>Director: ${movie.director}</p>
                    <p>Fecha de lanzamiento: ${movie.release_date}</p>
                `;
                container.appendChild(card);
            });
        });
    });
}

// Función para mostrar vehículos por clase
function showVehicleByClass() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const select = document.getElementById('class-select');
        const classes = [...new Set(vehicles.map(v => v.vehicle_class))]; // Extrae clases únicas
        select.innerHTML = '<option value="">Seleccionar</option>';
        classes.forEach(vehicleClass => {
            const option = document.createElement('option');
            option.value = vehicleClass;
            option.textContent = vehicleClass;
            select.appendChild(option);
        });
        document.getElementById('class-menu').classList.remove('hidden');
    });
}

// Función para mostrar vehículos de la clase seleccionada
function showVehicleByClassSelection() {
    const vehicleClass = document.getElementById('class-select').value;
    if (!vehicleClass) return;

    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const selectedVehicles = vehicles.filter(v => v.vehicle_class === vehicleClass);
        const container = document.getElementById('vehicles');
        container.innerHTML = `<h2>Vehículos de la clase ${vehicleClass}</h2>`;
        selectedVehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${vehicle.name}</h3>
                <p>Modelo: ${vehicle.model}</p>
                <p>Capacidad de Carga: ${vehicle.cargo_capacity}</p>
                <p>Clase: ${vehicle.vehicle_class}</p>
            `;
            container.appendChild(card);
        });
    });
}

// Inicializar la página cargando todos los vehículos
fetchAllVehicles(vehiclesUrl).then(displayVehicles);
