const vehiclesUrl = 'https://swapi.dev/api/vehicles/';


async function fetchAllVehicles(url) {
    let allVehicles = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allVehicles = allVehicles.concat(data.results);
            nextUrl = data.next; 
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; 
        }
    }

    return allVehicles;
}


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


function showVehicleByModel() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const select = document.getElementById('model-select');
        const models = [...new Set(vehicles.map(v => v.model))]; 
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


function sortByCargoCapacity() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        vehicles.sort((a, b) => b.cargo_capacity - a.cargo_capacity);
        displayVehicles(vehicles);
    });
}

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


function showVehicleByClass() {
    fetchAllVehicles(vehiclesUrl).then(vehicles => {
        const select = document.getElementById('class-select');
        const classes = [...new Set(vehicles.map(v => v.vehicle_class))]; 
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


fetchAllVehicles(vehiclesUrl).then(displayVehicles);
