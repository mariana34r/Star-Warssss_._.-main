const apiUrl = 'https://swapi.dev/api/people/';

// Función para obtener todos los personajes
async function fetchAllCharacters(url) {
    let allCharacters = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextUrl = data.next; // Obtén la URL de la siguiente página
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; // Termina el bucle en caso de error
        }
    }

    return allCharacters;
}

// Función para mostrar personajes con solo nombre y altura
function displayCharacters(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Altura: ${character.height} cm</p>
            <p>Color de ojos: ${character.eye_color}</p>
            <p>Fecha de nacimiento: ${character.birth_year}</p>
            <p>Género: ${character.gender}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar personajes con solo nombre y color de ojos
function displayCharactersWithEyeColor(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Color de ojos: ${character.eye_color}</p>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar personajes con solo nombre y género
function displayCharactersWithGender(characters) {
    const container = document.getElementById('characters');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p>Género: ${character.gender}</p>
        `;
        container.appendChild(card);
    });
}

// Función para ordenar por altura
function sortByHeight() {
    fetchAllCharacters(apiUrl).then(characters => {
        characters.sort((a, b) => a.height - b.height);
        displayCharacters(characters);
    });
}

// Función para filtrar por color de ojos
function filterByEyeColor() {
    fetchAllCharacters(apiUrl).then(characters => {
        const blueEyed = characters.filter(character => character.eye_color === 'blue');
        displayCharactersWithEyeColor(blueEyed); // Usar la función para mostrar solo nombre y color de ojos
    });
}

// Función para ordenar por edad
function sortByAge() {
    fetchAllCharacters(apiUrl).then(characters => {
        const currentYear = new Date().getFullYear();
        characters.forEach(character => {
            const birthYear = parseInt(character.birth_year.split(' ')[0], 10);
            character.age = currentYear - birthYear;
        });
        characters.sort((a, b) => b.age - a.age);
        displayCharacters(characters);
    });
}

// Función para filtrar por género
function filterByGender() {
    fetchAllCharacters(apiUrl).then(characters => {
        const gender = document.getElementById('gender-select').value;
        const filtered = characters.filter(character => character.gender === gender || gender === '');
        displayCharactersWithGender(filtered); // Usar la función para mostrar solo nombre y género
    });
}

// Función para alternar la visibilidad del menú de género
function toggleGenderMenu() {
    const menu = document.getElementById('gender-menu');
    menu.classList.toggle('hidden');
}

// Inicializar la página cargando los personajes
fetchAllCharacters(apiUrl).then(displayCharacters);