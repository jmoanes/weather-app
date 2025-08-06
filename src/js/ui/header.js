// Header functionality for the weather app
let savedCities = ['Kyiv', 'Paris', 'Vinnytsia', 'Warsaw'];
let currentCity = 'Kyiv';
let showNextArrow = false; // Track if next arrow should be shown
let hiddenCities = []; // Track cities that are added but hidden

export function initHeader(onCitySelect) {
  const headerHTML = `
    <header class="header">
      
      <div class="header-searchbar">
        <div class="search-input-wrapper">
          <span class="searchbar-icon-inside">🔍</span>
          <input type="text" class="search-input-rounded" placeholder="Search for a city..." id="city-search">
          <button class="search-btn-inside" id="search-btn">
            <span class="search-icon">⭐</span>
          </button>
        </div>
      </div>
      
      <div class="header-cities-chips-container">
        <button class="scroll-arrow scroll-left" id="scroll-left">‹</button>
        <div class="header-cities-chips-scroll">
          <div class="header-cities-chips" id="cities-chips">
            ${savedCities.map(city => `
              <button class="header-city-chip ${city === currentCity ? 'selected' : ''}" data-city="${city}">
                ${city}
                <span class="chip-close" data-city="${city}">×</span>
              </button>
            `).join('')}
          </div>
        </div>
        <button class="scroll-arrow scroll-right" id="scroll-right">›</button>
        <button class="next-move-arrow" id="next-move-arrow" style="display: none;" title="Next city">→</button>
      </div>
    </header>
  `;

  // Find or create header container
  let headerContainer = document.querySelector('.header-searchbar-root');
  if (!headerContainer) {
    headerContainer = document.createElement('div');
    headerContainer.className = 'header-searchbar-root';
    document.body.insertBefore(headerContainer, document.body.firstChild);
  }
  
  headerContainer.innerHTML = headerHTML;

  // Initialize event listeners
  initializeHeaderEvents(onCitySelect);
}

function initializeHeaderEvents(onCitySelect) {
  const searchInput = document.getElementById('city-search');
  const searchBtn = document.getElementById('search-btn');
  const citiesChips = document.getElementById('cities-chips');
  const scrollLeft = document.getElementById('scroll-left');
  const scrollRight = document.getElementById('scroll-right');
  const nextMoveArrow = document.getElementById('next-move-arrow');


  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
          handleCitySelect(city, onCitySelect, true); // true = from search
        }
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const city = searchInput.value.trim();
      if (city) {
        handleCitySelect(city, onCitySelect, true); // true = from search
      }
    });
  }

  // Next move arrow functionality
  if (nextMoveArrow) {
    nextMoveArrow.addEventListener('click', () => {
      // Scroll to show hidden cities when next arrow is clicked
      if (hiddenCities.length > 0) {
        scrollToRevealHiddenCities();
        return;
      }
      
      // If no hidden cities, cycle through existing cities
      const currentIndex = savedCities.indexOf(currentCity);
      const nextIndex = (currentIndex + 1) % savedCities.length;
      const nextCity = savedCities[nextIndex];
      handleCitySelect(nextCity, onCitySelect);
    });
  }


  // City chips functionality
  if (citiesChips) {
    citiesChips.addEventListener('click', (e) => {
      if (e.target.classList.contains('header-city-chip')) {
        const city = e.target.dataset.city;
        handleCitySelect(city, onCitySelect);
      } else if (e.target.classList.contains('chip-close')) {
        const city = e.target.dataset.city;
        removeCity(city);
      }
    });
  }

  // Scroll functionality
  if (scrollLeft) {
    scrollLeft.addEventListener('click', () => {
      citiesChips.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }

  if (scrollRight) {
    scrollRight.addEventListener('click', () => {
      citiesChips.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

  // Update scroll arrows visibility
  updateScrollArrows();
  citiesChips.addEventListener('scroll', updateScrollArrows);
  
  // Update next arrow visibility
  updateNextArrowVisibility();


}

function handleCitySelect(city, onCitySelect, isFromSearch = false) {
  currentCity = city;
  
  // Add city to saved cities if not already there
  if (!savedCities.includes(city) && !hiddenCities.includes(city)) {
    if (isFromSearch) {
      // If from search, add to bottom of hidden cities
      hiddenCities.push(city);
      showNextArrow = true; // Show next arrow to reveal hidden cities
      updateCityChips(); // Update to show hidden chips
      updateNextArrowVisibility();
    } else {
      // If from chip click or next button, add to visible cities
      savedCities.unshift(city);
      if (savedCities.length > 10) {
        savedCities.pop();
      }
      updateCityChips();
    }
  } else if (savedCities.includes(city)) {
    // Move selected city to front
    savedCities = savedCities.filter(c => c !== city);
    savedCities.unshift(city);
    updateCityChips();
  }

  // Clear search input
  const searchInput = document.getElementById('city-search');
  if (searchInput) {
    searchInput.value = '';
  }

  // Call the callback
  if (onCitySelect) {
    onCitySelect(city);
  }
}

function removeCity(city) {
  savedCities = savedCities.filter(c => c !== city);
  hiddenCities = hiddenCities.filter(c => c !== city); // Also remove from hidden cities
  
  if (currentCity === city) {
    currentCity = savedCities[0] || 'Kyiv';
  }
  updateCityChips();
  
  // Hide next arrow if no cities left and no hidden cities
  if (savedCities.length <= 1 && hiddenCities.length === 0) {
    showNextArrow = false;
  }
  updateNextArrowVisibility();
}

function updateCityChips() {
  const citiesChips = document.getElementById('cities-chips');
  if (citiesChips) {
    // Combine visible cities and hidden cities (hidden ones are at the bottom and hidden)
    const visibleChips = savedCities.map(city => `
      <button class="header-city-chip ${city === currentCity ? 'selected' : ''}" data-city="${city}">
        ${city}
        <span class="chip-close" data-city="${city}">×</span>
      </button>
    `);
    
    const hiddenChips = hiddenCities.map(city => `
      <button class="header-city-chip hidden-chip ${city === currentCity ? 'selected' : ''}" data-city="${city}">
        ${city}
        <span class="chip-close" data-city="${city}">×</span>
      </button>
    `);
    
    citiesChips.innerHTML = [...visibleChips, ...hiddenChips].join('');
  }
}

function scrollToRevealHiddenCities() {
  const citiesChips = document.getElementById('cities-chips');
  if (citiesChips && hiddenCities.length > 0) {
    // Find the first hidden chip
    const hiddenChip = citiesChips.querySelector('.hidden-chip');
    if (hiddenChip) {
      // Get the city name from the chip
      const cityToReveal = hiddenChip.dataset.city;
      
      // Scroll to show the hidden chip
      hiddenChip.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      });
      
      // Reveal the hidden chip with animation
      setTimeout(() => {
        hiddenChip.classList.add('revealing');
        
        // Move city from hidden to visible after animation
        setTimeout(() => {
          hiddenCities = hiddenCities.filter(city => city !== cityToReveal);
          if (!savedCities.includes(cityToReveal)) {
            savedCities.push(cityToReveal); // Add to end of visible cities
          }
          updateCityChips();
          updateNextArrowVisibility();
        }, 500);
      }, 300);
    }
  }
}

function updateNextArrowVisibility() {
  const nextMoveArrow = document.getElementById('next-move-arrow');
  if (nextMoveArrow) {
    // Show arrow if there are hidden cities or if showNextArrow is true and there are multiple cities
    const shouldShow = hiddenCities.length > 0 || (showNextArrow && savedCities.length > 1);
    nextMoveArrow.style.display = shouldShow ? 'flex' : 'none';
    
    // Add visual indicator for hidden cities
    if (hiddenCities.length > 0) {
      nextMoveArrow.classList.add('has-hidden');
      nextMoveArrow.title = `Scroll to reveal hidden cities (${hiddenCities.length} hidden)`;
    } else {
      nextMoveArrow.classList.remove('has-hidden');
      nextMoveArrow.title = 'Next city';
    }
  }
}

function updateScrollArrows() {
  const citiesChips = document.getElementById('cities-chips');
  const scrollLeft = document.getElementById('scroll-left');
  const scrollRight = document.getElementById('scroll-right');

  if (citiesChips && scrollLeft && scrollRight) {
    const isAtStart = citiesChips.scrollLeft <= 0;
    const isAtEnd = citiesChips.scrollLeft >= citiesChips.scrollWidth - citiesChips.clientWidth;

    scrollLeft.style.display = isAtStart ? 'none' : 'flex';
    scrollRight.style.display = isAtEnd ? 'none' : 'flex';
  }
} 