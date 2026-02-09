const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * (itemWidth + 32)}px)`; // 32 = gap
}

// BOUTON SUIVANT
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if(currentIndex >= items.length) currentIndex = 0; // loop
  updateCarousel();
});

// BOUTON PRECEDENT
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if(currentIndex < 0) currentIndex = items.length - 1; // loop
  updateCarousel();
});

// AJUSTE AU REDIMENSIONNEMENT
window.addEventListener('resize', updateCarousel);

// OPTION AUTOPLAY
let autoplay = setInterval(() => {
  currentIndex++;
  if(currentIndex >= items.length) currentIndex = 0;
  updateCarousel();
}, 5000); // toutes les 5 secondes

// STOP AUTOPLAY AU SURVOL
track.addEventListener('mouseenter', () => clearInterval(autoplay));
track.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => {
    currentIndex++;
    if(currentIndex >= items.length) currentIndex = 0;
    updateCarousel();
  }, 5000);
});