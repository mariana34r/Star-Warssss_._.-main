const apiUrl = 'https://swapi.dev/api/people/';
let allCharacters = [];

// Función para obtener todos los personajes
async function fetchAllCharacters() {
    let characters = [];
    let nextUrl = apiUrl;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            characters = characters.concat(data.results);
            nextUrl = data.next;
        } catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }

    return characters;
}

// Función para inicializar la página
async function initializePage() {
    allCharacters = await fetchAllCharacters();
    displayCharacters(allCharacters);
}

// Función para construir el contenido de los personajes
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${character.name}</h3>
        <p>Altura: ${character.height} cm</p>
        <p>Color de ojos: ${character.eye_color}</p>
        <p>Fecha de nacimiento: ${character.birth_year}</p>
        <p>Género: ${character.gender}</p>
    `;
    return card;
}

// Función para mostrar todos los personajes
function displayCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    characters.forEach(character => {
        fragment.appendChild(createCharacterCard(character));
    });
    container.appendChild(fragment);
}

// Función para mostrar personajes con solo nombre y color de ojos
function displayCharactersWithEyeColor(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Color de ojos: ${character.eye_color}</p>
        `;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}

// Función para mostrar personajes con solo nombre y género
function displayCharactersWithGender(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Género: ${character.gender}</p>
        `;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}

// Función para ordenar por altura
function sortByHeight() {
    const sortedCharacters = [...allCharacters].sort((a, b) => a.height - b.height);
    displayCharacters(sortedCharacters);
}

// Función para filtrar por color de ojos
function filterByEyeColor() {
    const blueEyed = allCharacters.filter(character => character.eye_color === 'blue');
    displayCharactersWithEyeColor(blueEyed);
}

// Función para ordenar por edad
function sortByAge() {
    const currentYear = new Date().getFullYear();
    const charactersWithAge = allCharacters.map(character => {
        const birthYear = parseInt(character.birth_year.split(' ')[0], 10);
        return { ...character, age: currentYear - birthYear };
    });
    const sortedCharacters = charactersWithAge.sort((a, b) => b.age - a.age);
    displayCharacters(sortedCharacters);
}

// Función para filtrar por género
function filterByGender() {
    const gender = document.getElementById('gender-select').value;
    const filtered = allCharacters.filter(character => character.gender === gender || gender === '');
    displayCharactersWithGender(filtered);
}

// Función para alternar la visibilidad del menú de género
function toggleGenderMenu() {
    const menu = document.getElementById('gender-menu');
    menu.classList.toggle('hidden');
}

// Inicializar la página cargando los personajes
initializePage();