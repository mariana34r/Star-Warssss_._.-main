const filmsUrl = 'https://swapi.dev/api/films/';


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
/*----------*/
function displayFilms(films) {
    const container = document.getElementById('films');
    container.innerHTML = '';

    films.forEach(film => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${film.title}</h3>
            <p>Director: ${film.director}</p>
            <p>Fecha de lanzamiento: ${film.release_date}</p>
            <p>Naves: ${film.starships.length}</p>
            <p>Personajes: ${film.characters.length}</p>
        `;
        container.appendChild(card);
    });
}


function showCharactersByFilm() {
    fetchAllFilms(filmsUrl).then(films => {
        const select = document.getElementById('film-select');
        select.innerHTML = '<option value="">Seleccionar</option>';
        films.forEach(film => {
            const option = document.createElement('option');
            option.value = film.url;
            option.textContent = film.title;
            select.appendChild(option);
        });
        document.getElementById('characters-menu').classList.remove('hidden');
    });
}


function showCharacters() {
    const filmUrl = document.getElementById('film-select').value;
    if (!filmUrl) return;

    fetch(filmUrl).then(response => response.json()).then(film => {
        const charactersPromises = film.characters.map(url => fetch(url).then(res => res.json()));
        Promise.all(charactersPromises).then(characters => {
            const container = document.getElementById('films');
            container.innerHTML = `<h2>Personajes de ${film.title}</h2>`;
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
        });
    });
}


function showDirectorByFilm() {
    fetchAllFilms(filmsUrl).then(films => {
        const select = document.getElementById('director-film-select');
        select.innerHTML = '<option value="">Seleccionar</option>';
        films.forEach(film => {
            const option = document.createElement('option');
            option.value = film.url;
            option.textContent = film.title;
            select.appendChild(option);
        });
        document.getElementById('director-menu').classList.remove('hidden');
    });
}


function showDirector() {
    const filmUrl = document.getElementById('director-film-select').value;
    if (!filmUrl) return;

    fetch(filmUrl).then(response => response.json()).then(film => {
        const container = document.getElementById('films');
        container.innerHTML = `<h2>Director de ${film.title}</h2>`;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${film.title}</h3>
            <p>Director: ${film.director}</p>
        `;
        container.appendChild(card);
    });
}


function sortByReleaseDate() {
    fetchAllFilms(filmsUrl).then(films => {
        films.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        displayFilms(films);
    });
}


function showStarshipsByFilm() {
    fetchAllFilms(filmsUrl).then(films => {
        const select = document.getElementById('starships-film-select');
        select.innerHTML = '<option value="">Seleccionar</option>';
        films.forEach(film => {
            const option = document.createElement('option');
            option.value = film.url;
            option.textContent = film.title;
            select.appendChild(option);
        });
        document.getElementById('starships-menu').classList.remove('hidden');
    });
}


function showStarships() {
    const filmUrl = document.getElementById('starships-film-select').value;
    if (!filmUrl) return;

    fetch(filmUrl).then(response => response.json()).then(film => {
        const starshipsPromises = film.starships.map(url => fetch(url).then(res => res.json()));
        Promise.all(starshipsPromises).then(starships => {
            const container = document.getElementById('films');
            container.innerHTML = `<h2>Naves en ${film.title}</h2>`;
            starships.forEach(starship => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${starship.name}</h3>
                    <p>Modelo: ${starship.model}</p>
                    <p>Fabricante: ${starship.manufacturer}</p>
                    <p>Longitud: ${starship.length} m</p>
                `;
                container.appendChild(card);
            });
        });
    });
}


fetchAllFilms(filmsUrl).then(displayFilms);