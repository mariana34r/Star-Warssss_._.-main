const urlVehiculos = 'https://swapi.dev/api/vehicles/';

async function obtenerTodosLosVehiculos(url) {
    let todosLosVehiculos = [];
    let vehiculoss = url;

    while (vehiculoss) {
        try {
            const respuesta = await fetch(vehiculoss);
            const datos = await respuesta.json();
            todosLosVehiculos = todosLosVehiculos.concat(datos.results);
            vehiculoss = datos.next; 
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            vehiculoss = null; 
        }
    }

    return todosLosVehiculos;
}
/*----------*/
function mostrarVehiculos(vehiculos) {
    const contenedor = document.getElementById('vehicles');
    contenedor.innerHTML = '';

    vehiculos.forEach(vehiculo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${vehiculo.name}</h3>
            <p>Modelo: ${vehiculo.model}</p>
            <p>Capacidad de Carga: ${vehiculo.cargo_capacity}</p>
            <p>Clase: ${vehiculo.vehicle_class}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function mostrarVehiculosPorModelo() {
    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        const select = document.getElementById('model-select');
        const modelos = [...new Set(vehiculos.map(v => v.model))]; 
        select.innerHTML = '<option value="">Seleccionar</option>';
        modelos.forEach(modelo => {
            const opcion = document.createElement('option');
            opcion.value = modelo;
            opcion.textContent = modelo;
            select.appendChild(opcion);
        });
        document.getElementById('model-menu').classList.remove('hidden');
    });
}

function mostrarVehiculoPorSeleccionModelo() {
    const modelo = document.getElementById('model-select').value;
    if (!modelo) return;

    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        const vehiculoSeleccionado = vehiculos.find(v => v.model === modelo);
        if (vehiculoSeleccionado) {
            const contenedor = document.getElementById('vehicles');
            contenedor.innerHTML = `<h2>Vehículo del modelo ${modelo}</h2>`;
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';
            tarjeta.innerHTML = `
                <h3>${vehiculoSeleccionado.name}</h3>
                <p>Modelo: ${vehiculoSeleccionado.model}</p>
                <p>Capacidad de Carga: ${vehiculoSeleccionado.cargo_capacity}</p>
                <p>Clase: ${vehiculoSeleccionado.vehicle_class}</p>
            `;
            contenedor.appendChild(tarjeta);
        }
    });
}

function ordenarPorCapacidadDeCarga() {
    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        vehiculos.sort((a, b) => b.cargo_capacity - a.cargo_capacity);
        mostrarVehiculos(vehiculos);
    });
}

function mostrarPeliculasPorVehiculo() {
    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        const select = document.getElementById('movies-vehicle-select');
        select.innerHTML = '<option value="">Seleccionar</option>';
        vehiculos.forEach(vehiculo => {
            const opcion = document.createElement('option');
            opcion.value = vehiculo.url;
            opcion.textContent = vehiculo.name;
            select.appendChild(opcion);
        });
        document.getElementById('movies-menu').classList.remove('hidden');
    });
}

function mostrarPeliculas() {
    const urlVehiculo = document.getElementById('movies-vehicle-select').value;
    if (!urlVehiculo) return;

    fetch(urlVehiculo).then(respuesta => respuesta.json()).then(vehiculo => {
        const promesasPeliculas = vehiculo.films.map(url => fetch(url).then(res => res.json()));
        Promise.all(promesasPeliculas).then(peliculas => {
            const contenedor = document.getElementById('vehicles');
            contenedor.innerHTML = `<h2>Películas en las que aparece ${vehiculo.name}</h2>`;
            peliculas.forEach(pelicula => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'card';
                tarjeta.innerHTML = `
                    <h3>${pelicula.title}</h3>
                    <p>Director: ${pelicula.director}</p>
                    <p>Fecha de lanzamiento: ${pelicula.release_date}</p>
                `;
                contenedor.appendChild(tarjeta);
            });
        });
    });
}

function mostrarVehiculosPorClase() {
    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        const select = document.getElementById('class-select');
        const clases = [...new Set(vehiculos.map(v => v.vehicle_class))]; 
        select.innerHTML = '<option value="">Seleccionar</option>';
        clases.forEach(clase => {
            const opcion = document.createElement('option');
            opcion.value = clase;
            opcion.textContent = clase;
            select.appendChild(opcion);
        });
        document.getElementById('class-menu').classList.remove('hidden');
    });
}

function mostrarVehiculosPorSeleccionClase() {
    const claseVehiculo = document.getElementById('class-select').value;
    if (!claseVehiculo) return;

    obtenerTodosLosVehiculos(urlVehiculos).then(vehiculos => {
        const vehiculosSeleccionados = vehiculos.filter(v => v.vehicle_class === claseVehiculo);
        const contenedor = document.getElementById('vehicles');
        contenedor.innerHTML = `<h2>Vehículos de la clase ${claseVehiculo}</h2>`;
        vehiculosSeleccionados.forEach(vehiculo => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';
            tarjeta.innerHTML = `
                <h3>${vehiculo.name}</h3>
                <p>Modelo: ${vehiculo.model}</p>
                <p>Capacidad de Carga: ${vehiculo.cargo_capacity}</p>
                <p>Clase: ${vehiculo.vehicle_class}</p>
            `;
            contenedor.appendChild(tarjeta);
        });
    });
}

obtenerTodosLosVehiculos(urlVehiculos).then(mostrarVehiculos);