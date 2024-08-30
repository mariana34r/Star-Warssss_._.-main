const speciesUrl = 'https://swapi.dev/api/species/';


async function fetchAllSpecies(url) {
    let allSpecies = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allSpecies = allSpecies.concat(data.results);
            nextUrl = data.next; 
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; 
        }
    }

    return allSpecies;
}


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


function showSpeciesByClassification() {
    fetchAllSpecies(speciesUrl).then(species => {
        const select = document.getElementById('classification-select');
        const classifications = [...new Set(species.map(s => s.classification))]; //
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

function showSpeciesByClassificationSelection() {
    const classification = document.getElementById('classification-select').value;
    if (!classification) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.classification === classification);
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies de la clasificación ${classification}</h2>`;
        displaySpeciesAllData(selectedSpecies); 
    });
}


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


function showSpeciesByLanguageSelection() {
    const language = document.getElementById('language-select').value;
    if (!language) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.language === language);
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies que hablan ${language}</h2>`;
        displaySpeciesAllData(selectedSpecies); 
    });
}

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


function showSpeciesByEyeColorSelection() {
    const eyeColor = document.getElementById('eye-color-select').value;
    if (!eyeColor) return;

    fetchAllSpecies(speciesUrl).then(species => {
        const selectedSpecies = species.filter(s => s.eye_colors.includes(eyeColor));
        const container = document.getElementById('species');
        container.innerHTML = `<h2>Especies con color de ojos ${eyeColor}</h2>`;
        displaySpeciesAllData(selectedSpecies); 
    });
}


function sortByAverageLifespan() {
    fetchAllSpecies(speciesUrl).then(species => {
        species.sort((a, b) => b.average_lifespan - a.average_lifespan); 
        
        displaySpeciesNameAndLifespan(species);
    });
}


fetchAllSpecies(speciesUrl).then(displaySpeciesAllData);