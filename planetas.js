const urlPlanetas = 'https://swapi.dev/api/planets/';

let planetass = [];


async function obtenerTodosLosPlanetas(url) {
    if (planetass.length > 0) return planetass;

    let todosLosPlanetas = [];
    let siguienteUrl = url;

    while (siguienteUrl) {
        try {
            const respuesta = await fetch(siguienteUrl);
            const datos = await respuesta.json();
            todosLosPlanetas = todosLosPlanetas.concat(datos.results);
            siguienteUrl = datos.next;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            siguienteUrl = null;
        }
    }

    planetass = todosLosPlanetas;
    return todosLosPlanetas;
}


function mostrarPlanetas(planetas) {
    const contenedor = document.getElementById('planets');
    contenedor.innerHTML = '';

    planetas.forEach(planeta => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${planeta.name}</h3>
            <p>Población: ${planeta.population}</p>
            <p>Terreno: ${planeta.terrain}</p>
            <p>Clima: ${planeta.climate}</p>
            <p>Residentes: ${planeta.residents.length}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}


async function ordenarPorPoblacion() {
    const planetas = await obtenerTodosLosPlanetas(urlPlanetas);
    planetas.sort((a, b) => b.population - a.population);
    mostrarPlanetas(planetas);
}


async function filtrarPorResidentesDelPlaneta() {
    const planetas = await obtenerTodosLosPlanetas(urlPlanetas);
    const idPlaneta = document.getElementById('planet-select').value;
    if (!idPlaneta) return;

    const planetaSeleccionado = planetas.find(planeta => planeta.url === idPlaneta);
    if (!planetaSeleccionado) return;

    const promesasResidentes = planetaSeleccionado.residents.map(url => fetch(url).then(res => res.json()));
    const residentes = await Promise.all(promesasResidentes);

    const contenedor = document.getElementById('planets');
    contenedor.innerHTML = `<h2>Residentes de ${planetaSeleccionado.name}</h2>`;
    residentes.forEach(residente => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${residente.name}</h3>
            <p>Altura: ${residente.height} cm</p>
            <p>Color de ojos: ${residente.eye_color}</p>
            <p>Fecha de nacimiento: ${residente.birth_year}</p>
            <p>Género: ${residente.gender}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

async function filtrarPorTerreno() {
    const planetas = await obtenerTodosLosPlanetas(urlPlanetas);
    const terreno = document.getElementById('terrain-select').value;
    const planetasFiltrados = planetas.filter(planeta => planeta.terrain === terreno || terreno === '');
    mostrarPlanetas(planetasFiltrados);
}


async function filtrarPorClima() {
    const planetas = await obtenerTodosLosPlanetas(urlPlanetas);
    const clima = document.getElementById('climate-select').value;
    const planetasFiltrados = planetas.filter(planeta => planeta.climate === clima || clima === '');
    mostrarPlanetas(planetasFiltrados);
}


async function llenarMenuDesplegable(menuId, obtenerValorOpcion) {
    const planetas = await obtenerTodosLosPlanetas(urlPlanetas);
    const select = document.getElementById(menuId);
    select.innerHTML = '<option value="">Seleccionar</option>';
    const opciones = new Set(planetas.map(obtenerValorOpcion));
    opciones.forEach(opcion => {
        if (opcion) {
            const elementoOpcion = document.createElement('option');
            elementoOpcion.value = opcion;
            elementoOpcion.textContent = opcion;
            select.appendChild(elementoOpcion);
        }
    });
}


function alternarMenuResidentes() {
    const menu = document.getElementById('residents-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        llenarMenuDesplegable('planet-select', planeta => planeta.url);
    }
}


function alternarMenuTerreno() {
    const menu = document.getElementById('terrain-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        llenarMenuDesplegable('terrain-select', planeta => planeta.terrain);
    }
}


function alternarMenuClima() {
    const menu = document.getElementById('climate-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        llenarMenuDesplegable('climate-select', planeta => planeta.climate);
    }
}


obtenerTodosLosPlanetas(urlPlanetas).then(mostrarPlanetas);