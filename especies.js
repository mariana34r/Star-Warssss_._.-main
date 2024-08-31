const urlEspecies = 'https://swapi.dev/api/species/';

async function obtenerTodasLasEspecies(url) {
    let todasLasEspecies = [];
    let especiess = url;

    while (especiess) {
        try {
            const respuesta = await fetch(especiess);
            const datos = await respuesta.json();
            todasLasEspecies = todasLasEspecies.concat(datos.results);
            especiess = datos.next; 
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            especiess = null; 
        }
    }

    return todasLasEspecies;
}
/*----------*/
function mostrarDatosDeEspecies(especies) {
    const contenedor = document.getElementById('species');
    contenedor.innerHTML = '';

    especies.forEach(especie => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${especie.name}</h3>
            <p>Clasificación: ${especie.classification}</p>
            <p>Lenguaje: ${especie.language}</p>
            <p>Color de Ojos: ${especie.eye_colors}</p>
            <p>Esperanza de Vida: ${especie.average_lifespan}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function mostrarNombreYEsperanzaDeVida(especies) {
    const contenedor = document.getElementById('species');
    contenedor.innerHTML = '';

    especies.forEach(especie => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <h3>${especie.name}</h3>
            <p>Esperanza de Vida: ${especie.average_lifespan}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function mostrarEspeciesPorClasificacion() {
    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const select = document.getElementById('classification-select');
        const clasificaciones = [...new Set(especies.map(e => e.classification))];
        select.innerHTML = '<option value="">Seleccionar</option>';
        clasificaciones.forEach(clasificacion => {
            const opcion = document.createElement('option');
            opcion.value = clasificacion;
            opcion.textContent = clasificacion;
            select.appendChild(opcion);
        });
        document.getElementById('classification-menu').classList.remove('hidden');
    });
}

function mostrarEspeciesPorClasificacionSeleccion() {
    const clasificacion = document.getElementById('classification-select').value;
    if (!clasificacion) return;

    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const especiesSeleccionadas = especies.filter(e => e.classification === clasificacion);
        const contenedor = document.getElementById('species');
        contenedor.innerHTML = `<h2>Especies de la clasificación ${clasificacion}</h2>`;
        mostrarDatosDeEspecies(especiesSeleccionadas); 
    });
}

function mostrarEspeciesPorLenguaje() {
    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const select = document.getElementById('language-select');
        
        const lenguajes = [...new Set(especies.map(e => e.language).filter(lenguaje => lenguaje))];
        select.innerHTML = '<option value="">Seleccionar</option>';
        lenguajes.forEach(lenguaje => {
            const opcion = document.createElement('option');
            opcion.value = lenguaje;
            opcion.textContent = lenguaje;
            select.appendChild(opcion);
        });
        document.getElementById('language-menu').classList.remove('hidden');
    });
}

function mostrarEspeciesPorLenguajeSeleccion() {
    const lenguaje = document.getElementById('language-select').value;
    if (!lenguaje) return;

    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const especiesSeleccionadas = especies.filter(e => e.language === lenguaje);
        const contenedor = document.getElementById('species');
        contenedor.innerHTML = `<h2>Especies que hablan ${lenguaje}</h2>`;
        mostrarDatosDeEspecies(especiesSeleccionadas); 
    });
}

function mostrarEspeciesPorColorDeOjos() {
    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const select = document.getElementById('eye-color-select');
       
        const coloresDeOjos = [...new Set(especies.flatMap(e => e.eye_colors.split(', ')))];
        select.innerHTML = '<option value="">Seleccionar</option>';
        coloresDeOjos.forEach(color => {
            const opcion = document.createElement('option');
            opcion.value = color;
            opcion.textContent = color;
            select.appendChild(opcion);
        });
        document.getElementById('eye-color-menu').classList.remove('hidden');
    });
}

function mostrarEspeciesPorColorDeOjosSeleccion() {
    const colorDeOjos = document.getElementById('eye-color-select').value;
    if (!colorDeOjos) return;

    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        const especiesSeleccionadas = especies.filter(e => e.eye_colors.includes(colorDeOjos));
        const contenedor = document.getElementById('species');
        contenedor.innerHTML = `<h2>Especies con color de ojos ${colorDeOjos}</h2>`;
       
        const tarjetas = especiesSeleccionadas.map(especie => `
            <div class="card">
                <h3>${especie.name}</h3>
                <p>Color de Ojos: ${especie.eye_colors}</p>
            </div>
        `).join('');
        contenedor.innerHTML += tarjetas;
    });
}

function ordenarPorEsperanzaDeVida() {
    obtenerTodasLasEspecies(urlEspecies).then(especies => {
        especies.sort((a, b) => b.average_lifespan - a.average_lifespan); 
        
        mostrarNombreYEsperanzaDeVida(especies);
    });
}

obtenerTodasLasEspecies(urlEspecies).then(mostrarDatosDeEspecies);