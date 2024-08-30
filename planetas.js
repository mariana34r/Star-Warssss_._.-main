const planetsUrl = 'https://swapi.dev/api/planets/';

// Cache para almacenar los planetas
let cachedPlanets = [];

// Función para obtener todos los planetas
async function fetchAllPlanets(url) {
    if (cachedPlanets.length > 0) return cachedPlanets;

    let allPlanets = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allPlanets = allPlanets.concat(data.results);
            nextUrl = data.next;
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null;
        }
    }

    cachedPlanets = allPlanets; // Cachea los planetas
    return allPlanets;
}

// Función para mostrar los planetas
function displayPlanets(planets) {
    const container = document.getElementById('planets');
    container.innerHTML = '';

    planets.forEach(planet => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${planet.name}</h3>
            <p>Población: ${planet.population}</p>
            <p>Terreno: ${planet.terrain}</p>
            <p>Clima: ${planet.climate}</p>
            <p>Residentes: ${planet.residents.length}</p>
        `;
        container.appendChild(card);
    });
}

// Función para ordenar por población
async function sortByPopulation() {
    const planets = await fetchAllPlanets(planetsUrl);
    planets.sort((a, b) => b.population - a.population);
    displayPlanets(planets);
}

// Función para filtrar por residentes
async function filterByPlanetResidents() {
    const planets = await fetchAllPlanets(planetsUrl);
    const planetId = document.getElementById('planet-select').value;
    if (!planetId) return;

    const selectedPlanet = planets.find(planet => planet.url === planetId);
    if (!selectedPlanet) return;

    const residentsPromises = selectedPlanet.residents.map(url => fetch(url).then(res => res.json()));
    const residents = await Promise.all(residentsPromises);

    const container = document.getElementById('planets');
    container.innerHTML = `<h2>Residentes de ${selectedPlanet.name}</h2>`;
    residents.forEach(resident => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${resident.name}</h3>
            <p>Altura: ${resident.height} cm</p>
            <p>Color de ojos: ${resident.eye_color}</p>
            <p>Fecha de nacimiento: ${resident.birth_year}</p>
            <p>Género: ${resident.gender}</p>
        `;
        container.appendChild(card);
    });
}

// Función para filtrar por tipo de terreno
async function filterByTerrain() {
    const planets = await fetchAllPlanets(planetsUrl);
    const terrain = document.getElementById('terrain-select').value;
    const filteredPlanets = planets.filter(planet => planet.terrain === terrain || terrain === '');
    displayPlanets(filteredPlanets);
}

// Función para filtrar por clima
async function filterByClimate() {
    const planets = await fetchAllPlanets(planetsUrl);
    const climate = document.getElementById('climate-select').value;
    const filteredPlanets = planets.filter(planet => planet.climate === climate || climate === '');
    displayPlanets(filteredPlanets);
}

// Función para cargar y mostrar opciones en el menú
async function populateSelectMenu(menuId, getOptionValue) {
    const planets = await fetchAllPlanets(planetsUrl);
    const select = document.getElementById(menuId);
    select.innerHTML = '<option value="">Seleccionar</option>';
    const options = new Set(planets.map(getOptionValue));
    options.forEach(option => {
        if (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        }
    });
}

// Función para alternar la visibilidad del menú de residentes
function toggleResidentsMenu() {
    const menu = document.getElementById('residents-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        populateSelectMenu('planet-select', planet => planet.url);
    }
}

// Función para alternar la visibilidad del menú de terreno
function toggleTerrainMenu() {
    const menu = document.getElementById('terrain-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        populateSelectMenu('terrain-select', planet => planet.terrain);
    }
}

// Función para alternar la visibilidad del menú de clima
function toggleClimateMenu() {
    const menu = document.getElementById('climate-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        populateSelectMenu('climate-select', planet => planet.climate);
    }
}

// Inicializar la página cargando los planetas
fetchAllPlanets(planetsUrl).then(displayPlanets);