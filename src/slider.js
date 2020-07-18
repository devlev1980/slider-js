// const greeting = (greeting) => {
//     return `${greeting},man`
// }
export  class Slider {
    constructor({
                    sliderSelector = ".slider",
                    sliderContainerSelector = ".slider__container",
                    previousBtn = ".previous",
                    nextBtn = ".next",
                    transitionTime = 3000,
                }={}) {
        this.slider = document.querySelector(sliderSelector);
        this.sliderContainer = document.querySelector(sliderContainerSelector);
        this.slides = document.querySelectorAll(`${sliderContainerSelector} img`).length;
        this.previousButton = document.querySelector(previousBtn);
        this.nextButton = document.querySelector(nextBtn);
        this.slideSize = this.slider.offsetWidth; // width of the .slider 600px;
        this.currentSlide = 0;
        this.generateShortCuts();
        this.setEventListeners();
    }
    moveSlides() {
        this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
        Array.from(this.shortcuts.children).forEach(shortcut => shortcut.classList.remove('active'));
        this.shortcuts.children[this.currentSlide].classList.add('active');
    }
    nextSlide() {
        console.log(this)
        this.currentSlide =
            this.currentSlide >= this.slides - 1 ? 0 : this.currentSlide + 1;
        this.moveSlides();
    }
    previousSlide() {
        this.currentSlide =
            this.currentSlide <= 0 ? this.slides - 1 : this.currentSlide - 1;
        this.moveSlides();
    }
    generateShortCuts() {
        const shortcuts = document.createElement('div');
        shortcuts.classList.add('shortcuts');

        for (let i = 0; i < this.slides; i += 1) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                this.currentSlide = i;
                this.moveSlides();
            });
            dot.classList.add('shortcut');
            shortcuts.appendChild(dot);
        }
        shortcuts.firstChild.classList.add('active');
        this.slider.appendChild(shortcuts);
        this.shortcuts = shortcuts;
    }
    setEventListeners() {
        this.nextButton.addEventListener("click", this.nextSlide.bind(this));
        this.previousButton.addEventListener("click", this.previousSlide.bind(this));
    }

}
