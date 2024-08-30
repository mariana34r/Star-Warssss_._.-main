const speciesUrl = 'https://swapi.dev/api/species/';

// Función para obtener todas las especies
async function fetchAllSpecies(url) {
    let allSpecies = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allSpecies = allSpecies.concat(data.results);
            nextUrl = data.next; // Obtén la URL de la siguiente página
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; // Termina el bucle en caso de error
        }
    }

    return allSpecies;
}

// Función para mostrar especies con todos los datos
function displaySpeciesAllData(species) {
    const container = document.getElementById('species');
    container.innerHTML = '';

    species.forEach(specie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${specie.name}</h3>
            <p>Clasificación: ${specie.classification}</p>
            <p>Lenguaje: ${specie.language}</p>
            <p>Color de Ojos: ${specie.eye_colors}</p>
            <p>Esperanza de Vida: ${specie.average_lifespan}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar solo nombre y esperanza de vida
function displaySpeciesNameAndLifespan(species) {
    const container = document.getElementById('species');
    container.innerHTML = '';

    species.forEach(specie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${specie.name}</h3>
            <p>Esperanza de Vida: ${specie.average_lifespan}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar especies por clasificación
function showSpeciesByClassification() {
    fetchAllSpecies(speciesUrl).then(species => {
        const select = document.getElementById('classification-select');
        const classifications = [...new Set(species.map(s => s.classification))]; // Extrae clasificaciones únicas
        select.innerHTML = '<option value="">Seleccionar</option>';
        classifications.forEach(classification => {
            const option = document.createElement('option');
            option.value = classification;
            option.textContent = classification;
            select.appendChild(option);
        });
        document.getElementById('classification-menu').classList.remove('hidden');
    });
}

// Función para mostrar especies de la clasificación seleccionada
function showSpeciesByClassificationSelection() {
    const classification = document.getElementById('classification-select').value;
    if (!classification) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.classification === classification);
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies de la clasificación ${classification}</h2>`;
        displaySpeciesAllData(selectedSpecies); // Muestra todos los datos
    });
}

// Función para mostrar especies por lenguaje
function showSpeciesByLanguage() {
    fetchAllSpecies(speciesUrl).then(species => {
        const select = document.getElementById('language-select');
        // Extrae lenguajes únicos
        const languages = [...new Set(species.map(s => s.language).filter(language => language))];
        select.innerHTML = '<option value="">Seleccionar</option>';
        languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            option.textContent = language;
            select.appendChild(option);
        });
        document.getElementById('language-menu').classList.remove('hidden');
    });
}

// Función para mostrar especies que hablan el lenguaje seleccionado
function showSpeciesByLanguageSelection() {
    const language = document.getElementById('language-select').value;
    if (!language) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.language === language);
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies que hablan ${language}</h2>`;
        displaySpeciesAllData(selectedSpecies); // Muestra todos los datos
    });
}

// Función para mostrar especies por color de ojos
function showSpeciesByEyeColor() {
    fetchAllSpecies(speciesUrl).then(species => {
        const select = document.getElementById('eye-color-select');
        // Extrae colores de ojos únicos
        const eyeColors = [...new Set(species.flatMap(s => s.eye_colors.split(', ')))];
        select.innerHTML = '<option value="">Seleccionar</option>';
        eyeColors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
        document.getElementById('eye-color-menu').classList.remove('hidden');
    });
}

// Función para mostrar especies con el color de ojos seleccionado
function showSpeciesByEyeColorSelection() {
    const eyeColor = document.getElementById('eye-color-select').value;
    if (!eyeColor) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.eye_colors.includes(eyeColor));
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies con color de ojos ${eyeColor}</h2>`;
        displaySpeciesAllData(selectedSpecies); // Muestra todos los datos
    });
}

// Función para ordenar especies por esperanza de vida de mayor a menor
function sortByAverageLifespan() {
    fetchAllSpecies(speciesUrl).then(species => {
        species.sort((a, b) => b.average_lifespan - a.average_lifespan); // Ordenar de mayor a menor
        // Mostrar solo nombre y esperanza de vida
        displaySpeciesNameAndLifespan(species);
    });
}

// Inicializar la página cargando todas las especies
fetchAllSpecies(speciesUrl).then(displaySpeciesAllData);