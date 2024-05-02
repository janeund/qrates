window.onload = () => {
  initializeSlider();
  openMenu();
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

// Initialize open menu button
const openMenu = () => {
  const openButton = document.querySelector('.hamburger');
  const navigation = document.querySelector('.navigation');
  openButton.addEventListener('click', () => {
    openButton.classList.toggle('active');
    navigation.classList.toggle('active');
    document.body.classList.toggle('scroll-off');
  })
}


// Project page functions
import projects from "./projects.json" with { type: "json" };
let filteredProjects = [...projects];

const projectsContainer = document.querySelector('.projects');

const displayProjects = () => {
  if (filteredProjects.length < 1) {
    projectsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
    return;
  }

  projectsContainer.innerHTML = filteredProjects
    .map((project) => {
      const { id, title, artist, genres, image } = project;
      return `<div class="projects__item project" data-id="${id}">
            <img src="${image}" alt="">
            <div class="project__info">
              <div class="project__title">${title}</div>
              <div class="project__artist">${artist}</div>
              <div class="project__genre-tag">${genres}</div>
            </div>
          </div>`;
    })
    .join('');
};

// Filter Buttons
const filterButtonsContainer = document.querySelector('.filters');

const displayButtons = () => {
  const buttons = [
    'all',
    ...new Set(projects.map((project) => project.genres)),
  ];
  // console.log(buttons);
  filterButtonsContainer.innerHTML = buttons
    .map((filterBtn) => {
      return `<a class='filter-btn' data-id="${filterBtn}">${filterBtn}</a>`;
    })
    .join('');
};

filterButtonsContainer.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('filter-btn')) {
    if (el.dataset.id === 'all') {
      filteredProjects = [...projects];
    } else {
      filteredProjects = projects.filter((project) => {
        return project.genres === el.dataset.id;
      });
    }
    displayProjects();
  }
});

displayProjects();
  displayButtons();