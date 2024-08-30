document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
                img.classList.remove('transition'); // Elimina la clase de transición para las imágenes activas
                img.style.transform = 'translateX(0)'; // Imagen activa se mueve a la vista
            } else {
                img.classList.remove('active');
                img.classList.add('transition'); // Añade la clase de transición a las imágenes no activas
                img.style.transform = 'translateX(100%)'; // Las otras imágenes están fuera de la vista
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    }

    // Configura el intervalo para que las imágenes cambien automáticamente cada 5 segundos
    setInterval(nextImage, 5000);

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    // Mostrar la primera imagen al cargar
    showImage(currentIndex);
});