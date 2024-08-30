const gallery = [
    [
        "https://hips.hearstapps.com/hmg-prod/images/acolyte-6661c5a26f37c.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/la-amenaza-fantasma-1575448990.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/el-ataque-de-los-clones-1575448990.jpg?crop=1xw:1xh;center,top&resize=980:*"
    ],
    [
        "https://hips.hearstapps.com/hmg-prod/images/la-venganza-de-los-sith-1575448991.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/han-solo-una-historia-de-star-wars-1575448990.jpg?crop=1xw:1xh;center,top&resize=980:*",
        "https://hips.hearstapps.com/hmg-prod/images/fbge81mvuaa-uut-6kcs-1668706023.jpeg?crop=1xw:1xh;center,top&resize=980:*"
    ]
];

let currentIndex = 0;

// Actualizar las imágenes de la galería en el HTML
function updateGallery() {
    const images = gallery[currentIndex];
    document.querySelectorAll('.imagen_libro1 img')[0].src = images[0];
    document.querySelectorAll('.imagen_libro2 img')[0].src = images[1];
    document.querySelectorAll('.imagen_libro3 img')[0].src = images[2];
}

// Mostrar la siguiente galería
function showNext() {
    currentIndex = (currentIndex + 1) % gallery.length;
    updateGallery();
}

// Mostrar la galería anterior
function showPrevious() {
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    updateGallery();
}

// Configuración del modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('#imageModal .close');
    
    document.querySelectorAll('.openModal').forEach(function(img) {
        img.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            modalImage.src = imageUrl;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Inicializar la galería al cargar la página
    updateGallery();
});


