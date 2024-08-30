const apiEndpoints = {
    people: "https://swapi.dev/api/people/",
    planets: "https://swapi.dev/api/planets/",
    films: "https://swapi.dev/api/films/",
    species: "https://swapi.dev/api/species/",
    vehicles: "https://swapi.dev/api/vehicles/",
    starships: "https://swapi.dev/api/starships/",
    planets_population: "https://swapi.dev/api/planets/",
    people_gender: "https://swapi.dev/api/people/",
    films_release_date: "https://swapi.dev/api/films/",
    starships_model: "https://swapi.dev/api/starships/",
    vehicles_manufacturer: "https://swapi.dev/api/vehicles/",
    species_classification: "https://swapi.dev/api/species/",
    planets_terrain: "https://swapi.dev/api/planets/",
    people_height: "https://swapi.dev/api/people/",
    starships_manufacturer: "https://swapi.dev/api/starships/",
    films_director: "https://swapi.dev/api/films/",
    species_average_height: "https://swapi.dev/api/species/",
    vehicles_model: "https://swapi.dev/api/vehicles/",
    people_mass: "https://swapi.dev/api/people/",
    planets_climate: "https://swapi.dev/api/planets/",
    films_title: "https://swapi.dev/api/films/",
    species_average_lifespan: "https://swapi.dev/api/species/",
    starships_cost: "https://swapi.dev/api/starships/",
    people_hair_color: "https://swapi.dev/api/people/",
    vehicles_speed: "https://swapi.dev/api/vehicles/",
    films_episode: "https://swapi.dev/api/films/"
};
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const navList = document.getElementById('nav-list');
    const menuButton = document.getElementById('menu-button');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('hidden');
    });

    navList.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const apiKey = button.getAttribute('data-api');
            fetchData(apiKey);
            navList.classList.add('hidden'); 
        });
    });

    function fetchData(apiKey) {
        const url = apiEndpoints[apiKey];
        fetchAllData(url)
            .then(data => {
                if (['planets_population', 'people_gender', 'films_release_date', 'starships_model', 'vehicles_manufacturer', 'species_classification', 'planets_terrain', 'people_height', 'starships_manufacturer', 'films_director', 'species_average_height', 'vehicles_model', 'people_mass', 'planets_climate', 'films_title', 'species_average_lifespan', 'starships_cost', 'people_hair_color', 'vehicles_speed', 'films_episode'].includes(apiKey)) {
                    customDataProcessing(apiKey, data);
                } else {
                    displayData(apiKey, data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    async function fetchAllData(url) {
        let results = [];
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            results = results.concat(data.results);
            url = data.next; // URL de la siguiente página
        }
        return { results };
    }

    function customDataProcessing(apiKey, data) {
        let sortedData;
        switch (apiKey) {
            case 'planets_population':
                sortedData = data.results.sort((a, b) => b.population - a.population);
                break;
            case 'people_gender':
                sortedData = data.results.filter(person => person.gender);
                break;
            case 'films_release_date':
                sortedData = data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'starships_model':
                sortedData = data.results.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case 'vehicles_manufacturer':
                sortedData = data.results.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
                break;
            case 'species_classification':
                sortedData = data.results.sort((a, b) => a.classification.localeCompare(b.classification));
                break;
            case 'planets_terrain':
                sortedData = data.results.sort((a, b) => a.terrain.localeCompare(b.terrain));
                break;
            case 'people_height':
                sortedData = data.results.sort((a, b) => b.height - a.height);
                break;
            case 'starships_manufacturer':
                sortedData = data.results.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
                break;
            case 'films_director':
                sortedData = data.results.sort((a, b) => a.director.localeCompare(b.director));
                break;
            case 'species_average_height':
                sortedData = data.results.sort((a, b) => b.average_height - a.average_height);
                break;
            case 'vehicles_model':
                sortedData = data.results.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case 'people_mass':
                sortedData = data.results.sort((a, b) => b.mass - a.mass);
                break;
            case 'planets_climate':
                sortedData = data.results.sort((a, b) => a.climate.localeCompare(b.climate));
                break;
            case 'films_title':
                sortedData = data.results.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'species_average_lifespan':
                sortedData = data.results.sort((a, b) => b.average_lifespan - a.average_lifespan);
                break;
            case 'starships_cost':
                sortedData = data.results.sort((a, b) => b.cost_in_credits - a.cost_in_credits);
                break;
            case 'people_hair_color':
                sortedData = data.results.sort((a, b) => a.hair_color.localeCompare(b.hair_color));
                break;
            case 'vehicles_speed':
                sortedData = data.results.sort((a, b) => b.max_atmosphering_speed - a.max_atmosphering_speed);
                break;
            case 'films_episode':
                sortedData = data.results.sort((a, b) => a.episode_id - b.episode_id);
                break;
            default:
                sortedData = data.results;
                break;
        }
        displayData(apiKey, { results: sortedData });
    }

    function displayData(apiKey, data) {
        let html = `<h2>${capitalizeFirstLetter(apiKey)}</h2>`;
        if (data.results && data.results.length) {
            html += '<ul>';
            data.results.forEach(item => {
                html += '<li>' + formatDataItem(apiKey, item) + '</li>';
            });
            html += '</ul>';
        } else {
            html += '<p>No data available.</p>';
        }
        content.innerHTML = html;
    }

    function formatDataItem(apiKey, item) {
        switch (apiKey) {
            case 'people':
                return `${item.name} (Height: ${item.height}, Mass: ${item.mass})`;
            case 'planets':
                return `${item.name} (Climate: ${item.climate}, Terrain: ${item.terrain})`;
            case 'films':
                return `${item.title} (Director: ${item.director}, Release Date: ${item.release_date})`;
            case 'species':
                return `${item.name} (Classification: ${item.classification}, Average Height: ${item.average_height})`;
            case 'vehicles':
                return `${item.name} (Model: ${item.model}, Manufacturer: ${item.manufacturer})`;
            case 'starships':
                return `${item.name} (Model: ${item.model}, Manufacturer: ${item.manufacturer})`;
            case 'planets_population':
                return `${item.name} (Population: ${item.population})`;
            case 'people_gender':
                return `${item.name} (Gender: ${item.gender})`;
            case 'films_release_date':
                return `${item.title} (Release Date: ${item.release_date})`;
            case 'starships_model':
                return `${item.name} (Model: ${item.model})`;
            case 'vehicles_manufacturer':
                return `${item.name} (Manufacturer: ${item.manufacturer})`;
            case 'species_classification':
                return `${item.name} (Classification: ${item.classification})`;
            case 'planets_terrain':
                return `${item.name} (Terrain: ${item.terrain})`;
            case 'people_height':
                return `${item.name} (Height: ${item.height})`;
            case 'starships_manufacturer':
                return `${item.name} (Manufacturer: ${item.manufacturer})`;
            case 'films_director':
                return `${item.title} (Director: ${item.director})`;
            case 'species_average_height':
                return `${item.name} (Average Height: ${item.average_height})`;
            case 'vehicles_model':
                return `${item.name} (Model: ${item.model})`;
            case 'people_mass':
                return `${item.name} (Mass: ${item.mass})`;
            case 'planets_climate':
                return `${item.name} (Climate: ${item.climate})`;
            case 'films_title':
                return `${item.title}`;
            case 'species_average_lifespan':
                return `${item.name} (Average Lifespan: ${item.average_lifespan})`;
            case 'starships_cost':
                return `${item.name} (Cost: ${item.cost_in_credits})`;
            case 'people_hair_color':
                return `${item.name} (Hair Color: ${item.hair_color})`;
            case 'vehicles_speed':
                return `${item.name} (Speed: ${item.max_atmosphering_speed})`;
            case 'films_episode':
                return `${item.title} (Episode: ${item.episode_id})`;
            default:
                return '';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

// Ejemplo para obtener y mostrar todos los personajes
const personajesUrl = "https://swapi.dev/api/people/";
async function mostra_personajes() {
    const data = await fetchAllData(personajesUrl);
    data.results.forEach(personaje => {
        console.log(personaje.name);
    });
}

mostra_personajes();










