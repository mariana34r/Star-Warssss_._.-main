document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
                img.classList.remove('transition'); 
                img.style.transform = 'translateX(0)'; 
            } else {
                img.classList.remove('active');
                img.classList.add('transition'); 
                img.style.transform = 'translateX(100%)'; 
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

    
    setInterval(nextImage, 5000);

    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);


    showImage(currentIndex);
});