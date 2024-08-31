const starshipsUrl = 'https://swapi.dev/api/starships/';
const filmsUrl = 'https://swapi.dev/api/films/';


async function fetchAllStarships(url) {
    let allStarships = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allStarships = allStarships.concat(data.results);
            nextUrl = data.next; 
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; 
        }
    }

    return allStarships;
}
/*----------*/
async function fetchAllFilms(url) {
    let allFilms = [];
    let nextUrl = url;

    while (nextUrl) {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allFilms = allFilms.concat(data.results);
            nextUrl = data.next; 
        } catch (error) {
            console.error('Error fetching data:', error);
            nextUrl = null; 
        }
    }

    return allFilms;
}


function displayStarships(starships) {
    const container = document.getElementById('starships');
    container.innerHTML = '';

    starships.forEach(starship => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${starship.name}</h3>
            <p><strong>Manufacturer:</strong> ${starship.manufacturer}</p>
            <p><strong>Consumables:</strong> ${starship.consumables}</p>
            <p><strong>Class:</strong> ${starship.starship_class}</p>
        `;
        container.appendChild(card);
    });
}


fetchAllStarships(starshipsUrl).then(displayStarships);


function showStarshipsByManufacturer() {
    fetchAllStarships(starshipsUrl).then(starships => {
        const select = document.getElementById('manufacturer-select');
        const manufacturers = [...new Set(starships.map(s => s.manufacturer))]; 
        select.innerHTML = '<option value="">Seleccionar</option>';
        manufacturers.forEach(manufacturer => {
            const option = document.createElement('option');
            option.value = manufacturer;
            option.textContent = manufacturer;
            select.appendChild(option);
        });
        document.getElementById('manufacturer-menu').classList.remove('hidden');
    });
}


function showStarshipsByManufacturerSelection() {
    const manufacturer = document.getElementById('manufacturer-select').value;
    if (!manufacturer) return;

    fetchAllStarships(starshipsUrl).then(starships => {
        const selectedStarships = starships.filter(s => s.manufacturer === manufacturer);
        const container = document.getElementById('starships');
        container.innerHTML = `<h2>Naves del fabricante ${manufacturer}</h2>`;
        displayStarships(selectedStarships);
    });
}


function showStarshipsByConsumables() {
    fetchAllStarships(starshipsUrl).then(starships => {
        const container = document.getElementById('starships');
        container.innerHTML = '<h2>Consumables de cada nave</h2>';
        starships.forEach(starship => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${starship.name}</h3>
                <p><strong>Consumables:</strong> ${starship.consumables}</p>
            `;
            container.appendChild(card);
        });
    });
}

function displayStarshipsByClass(starships) {
    const container = document.getElementById('starships');
    container.innerHTML = '';

    starships.forEach(starship => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${starship.name}</h3>
            <p><strong>Class:</strong> ${starship.starship_class}</p>
        `;
        container.appendChild(card);
    });
}


function showStarshipsByClass() {
    fetchAllStarships(starshipsUrl).then(starships => {
        const select = document.getElementById('class-select');
        const classes = [...new Set(starships.map(s => s.starship_class))]; 
        select.innerHTML = '<option value="">Seleccionar</option>';
        classes.forEach(starshipClass => {
            const option = document.createElement('option');
            option.value = starshipClass;
            option.textContent = starshipClass;
            select.appendChild(option);
        });
        document.getElementById('class-menu').classList.remove('hidden');
    });
}



function showStarshipsByClassSelection() {
    const starshipClass = document.getElementById('class-select').value;
    if (!starshipClass) return;

    fetchAllStarships(starshipsUrl).then(starships => {
        const selectedStarships = starships.filter(s => s.starship_class === starshipClass);
        const container = document.getElementById('starships');
        container.innerHTML = `<h2>Naves de la clase ${starshipClass}</h2>`;
        displayStarshipsByClass(selectedStarships); 
    });
}


function showStarshipsByFilms() {
    fetchAllStarships(starshipsUrl).then(starships => {
        fetchAllFilms(filmsUrl).then(films => {
            const filmMap = new Map();
            films.forEach(film => {
                filmMap.set(film.url, film.title);
            });

            const container = document.getElementById('starships');
            container.innerHTML = '<h2>Naves por película</h2>';
            starships.forEach(starship => {
                const filmTitles = starship.films.map(filmUrl => filmMap.get(filmUrl)).join(', ');
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${starship.name}</h3>
                    <p><strong>Films:</strong> ${filmTitles}</p>
                `;
                container.appendChild(card);
            });
        });
    });
}