const apiUrl = 'https://swapi.dev/api/people/';
let todosLosPersonajes = [];

async function obtenerTodosLosPersonajes() {
    let personajes = [];
    let perosnajess = apiUrl;

    while (perosnajess) {
        try {
            const respuesta = await fetch(perosnajess);
            const datos = await respuesta.json();
            personajes = personajes.concat(datos.results);
            perosnajess = datos.next;
        } catch (error) {
            console.error('Error al obtener datos:', error);
            break;
        }
    }

    return personajes;
}
/*----------*/
async function inicializarPagina() {
    todosLosPersonajes = await obtenerTodosLosPersonajes();
    mostrarPersonajes(todosLosPersonajes);
}

function crearTarjetaPersonaje(personaje) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';
    tarjeta.innerHTML = `
        <h3>${personaje.name}</h3>
        <p>Altura: ${personaje.height} cm</p>
        <p>Color de ojos: ${personaje.eye_color}</p>
        <p>Fecha de nacimiento: ${personaje.birth_year}</p>
        <p>Género: ${personaje.gender}</p>
    `;
    return tarjeta;
}

function mostrarPersonajes(personajes) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    const fragmento = document.createDocumentFragment();
    personajes.forEach(personaje => {
        fragmento.appendChild(crearTarjetaPersonaje(personaje));
    });
    contenedor.appendChild(fragmento);
}

function mostrarPersonajesConColorDeOjos(personajes) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    const fragmento = document.createDocumentFragment();
    personajes.forEach(personaje => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${personaje.name}</h3>
            <p>Color de ojos: ${personaje.eye_color}</p>
        `;
        fragmento.appendChild(tarjeta);
    });
    contenedor.appendChild(fragmento);
}

function mostrarPersonajesConGenero(personajes) {
    const contenedor = document.getElementById('personajes');
    contenedor.innerHTML = '';

    const fragmento = document.createDocumentFragment();
    personajes.forEach(personaje => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${personaje.name}</h3>
            <p>Género: ${personaje.gender}</p>
        `;
        fragmento.appendChild(tarjeta);
    });
    contenedor.appendChild(fragmento);
}

function ordenarPorAltura() {
    const personajesOrdenados = [...todosLosPersonajes].sort((a, b) => a.height - b.height);
    mostrarPersonajes(personajesOrdenados);
}

function filtrarPorColorDeOjos() {
    const ojosAzules = todosLosPersonajes.filter(personaje => personaje.eye_color === 'blue');
    mostrarPersonajesConColorDeOjos(ojosAzules);
}

function ordenarPorEdad() {
    const añoActual = new Date().getFullYear();
    const personajesConEdad = todosLosPersonajes.map(personaje => {
        const añoNacimiento = parseInt(personaje.birth_year.split(' ')[0], 10);
        return { ...personaje, edad: añoActual - añoNacimiento };
    });
    const personajesOrdenados = personajesConEdad.sort((a, b) => b.edad - a.edad);
    mostrarPersonajes(personajesOrdenados);
}

function filtrarPorGenero() {
    const genero = document.getElementById('select-genero').value;
    const filtrado = todosLosPersonajes.filter(personaje => personaje.gender === genero || genero === '');
    mostrarPersonajesConGenero(filtrado);
}

function alternarMenuGenero() {
    const menu = document.getElementById('menu-genero');
    menu.classList.toggle('hidden');
}

inicializarPagina();