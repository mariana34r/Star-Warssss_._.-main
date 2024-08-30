document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.imagen_container');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.imagen_actor');
        const sliderInner = slider.querySelector('.imagen_slider');
        const prevButton = slider.querySelector('.prev_button');
        const nextButton = slider.querySelector('.next_button');

        let currentIndex = 0;

        function updateSlider() {
            const offset = -currentIndex * 100; 
            sliderInner.style.transform = `translateX(${offset}%)`;
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; 
            }
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = images.length - 1; 
            }
            updateSlider();
        });
    });
});