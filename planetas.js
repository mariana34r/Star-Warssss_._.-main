const planetsUrl = 'https://swapi.dev/api/planets/';

// Función para obtener todos los planetas
async function fetchAllPlanets(url) {
    let allPlanets = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allPlanets = allPlanets.concat(data.results);
            nextUrl = data.next; // Obtén la URL de la siguiente página
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; // Termina el bucle en caso de error
        }
    }

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
function sortByPopulation() {
    fetchAllPlanets(planetsUrl).then(planets => {
        planets.sort((a, b) => b.population - a.population);
        displayPlanets(planets);
    });
}

// Función para filtrar por residentes
function filterByPlanetResidents() {
    fetchAllPlanets(planetsUrl).then(planets => {
        const planetId = document.getElementById('planet-select').value;
        if (!planetId) return;

        const selectedPlanet = planets.find(planet => planet.url === planetId);
        if (!selectedPlanet) return;

        // Fetch residents
        const residentsPromises = selectedPlanet.residents.map(url => fetch(url).then(res => res.json()));
        Promise.all(residentsPromises).then(residents => {
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
        });
    });
}

// Función para filtrar por tipo de terreno
function filterByTerrain() {
    fetchAllPlanets(planetsUrl).then(planets => {
        const terrain = document.getElementById('terrain-select').value;
        const filteredPlanets = planets.filter(planet => planet.terrain === terrain || terrain === '');
        displayPlanets(filteredPlanets);
    });
}

// Función para filtrar por clima
function filterByClimate() {
    fetchAllPlanets(planetsUrl).then(planets => {
        const climate = document.getElementById('climate-select').value;
        const filteredPlanets = planets.filter(planet => planet.climate === climate || climate === '');
        displayPlanets(filteredPlanets);
    });
}

// Función para alternar la visibilidad del menú de residentes
function toggleResidentsMenu() {
    const menu = document.getElementById('residents-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        // Cargar opciones de planetas en el menú desplegable
        fetchAllPlanets(planetsUrl).then(planets => {
            const select = document.getElementById('planet-select');
            select.innerHTML = '<option value="">Seleccionar</option>';
            planets.forEach(planet => {
                const option = document.createElement('option');
                option.value = planet.url;
                option.textContent = planet.name;
                select.appendChild(option);
            });
        });
    }
}

// Función para alternar la visibilidad del menú de terreno
function toggleTerrainMenu() {
    const menu = document.getElementById('terrain-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        // Cargar opciones de tipos de terreno en el menú desplegable
        fetchAllPlanets(planetsUrl).then(planets => {
            const terrainSelect = document.getElementById('terrain-select');
            const terrains = new Set(planets.map(planet => planet.terrain));
            terrainSelect.innerHTML = '<option value="">Seleccionar</option>';
            terrains.forEach(terrain => {
                if (terrain) {
                    const option = document.createElement('option');
                    option.value = terrain;
                    option.textContent = terrain;
                    terrainSelect.appendChild(option);
                }
            });
        });
    }
}

// Función para alternar la visibilidad del menú de clima
function toggleClimateMenu() {
    const menu = document.getElementById('climate-menu');
    menu.classList.toggle('hidden');

    if (!menu.classList.contains('hidden')) {
        // Cargar opciones de climas en el menú desplegable
        fetchAllPlanets(planetsUrl).then(planets => {
            const climateSelect = document.getElementById('climate-select');
            const climates = new Set(planets.map(planet => planet.climate));
            climateSelect.innerHTML = '<option value="">Seleccionar</option>';
            climates.forEach(climate => {
                if (climate) {
                    const option = document.createElement('option');
                    option.value = climate;
                    option.textContent = climate;
                    climateSelect.appendChild(option);
                }
            });
        });
    }
}

// Inicializar la página cargando los planetas
fetchAllPlanets(planetsUrl).then(displayPlanets);