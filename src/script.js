window.onload = () => {
  initializeSlider();
}

// Active slide index
let slideIndex = 0;
// All slides
let slides = document.querySelectorAll('.slider__image');
// Interval state
let interval = null;


// Initialize slider
const initializeSlider = () => { 
  if (slides.length > 0) {
    slides[slideIndex].classList.add('active');
    interval = setInterval(() => nextSlide(), 2000);
  }
}

// Update current slide
const updateCurrent = (index) => {  
  slides.forEach(slide => {
    slide.classList.remove('active')
  });
  slides[index].classList.add('active')
}

// Progress to last slide
const prevSlide = () => { 
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  updateCurrent(slideIndex);
}

// Progress to next slide
const nextSlide = () => { 
  slideIndex++;
  if (slideIndex === slides.length) {
    slideIndex = 0;
  }
  updateCurrent(slideIndex);
};