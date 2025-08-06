// Header functionality for the weather app
let savedCities = ['Kyiv', 'Paris', 'Vinnytsia', 'Warsaw'];
let currentCity = 'Kyiv';
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
        <button class="country-button" id="country-button" style="display: none;" title="Country Info">🌍</button>
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
  const countryButton = document.getElementById('country-button');


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

  // Enhanced scroll functionality
  if (scrollLeft) {
    scrollLeft.addEventListener('click', () => {
      console.log('Left scroll arrow clicked'); // Debug log
      const scrollAmount = Math.min(200, citiesChips.scrollLeft);
      citiesChips.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      // Show country button when scroll arrow is pressed
      showCountryButton();
    });
  }

  if (scrollRight) {
    scrollRight.addEventListener('click', () => {
      console.log('Right scroll arrow clicked'); // Debug log
      const maxScroll = citiesChips.scrollWidth - citiesChips.clientWidth;
      const remainingScroll = maxScroll - citiesChips.scrollLeft;
      const scrollAmount = Math.min(200, remainingScroll);
      citiesChips.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      // Show country button when scroll arrow is pressed
      showCountryButton();
    });
  }

  // Country button functionality
  if (countryButton) {
    console.log('Country button found and initialized'); // Debug log
    countryButton.addEventListener('click', () => {
      handleCountryButtonClick();
    });
  } else {
    console.log('Country button not found during initialization'); // Debug log
  }

  // Update scroll arrows visibility
  updateScrollArrows();
  citiesChips.addEventListener('scroll', updateScrollArrows);
  
  // Add keyboard support for scrolling
  citiesChips.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeft.click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRight.click();
    }
  });
  
  // Add touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;
  
  citiesChips.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  citiesChips.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    citiesChips.scrollLeft += diff;
    startX = currentX;
  });
  
  citiesChips.addEventListener('touchend', () => {
    isDragging = false;
  });
  



}

function handleCitySelect(city, onCitySelect, isFromSearch = false) {
  currentCity = city;
  
  // Add city to saved cities if not already there
  if (!savedCities.includes(city) && !hiddenCities.includes(city)) {
    if (isFromSearch) {
      // If from search, add to bottom of hidden cities
      hiddenCities.push(city);
      updateCityChips(); // Update to show hidden chips
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





function updateScrollArrows() {
  const citiesChips = document.getElementById('cities-chips');
  const scrollLeft = document.getElementById('scroll-left');
  const scrollRight = document.getElementById('scroll-right');

  if (citiesChips && scrollLeft && scrollRight) {
    const isAtStart = citiesChips.scrollLeft <= 5; // Small threshold for better UX
    const isAtEnd = citiesChips.scrollLeft >= citiesChips.scrollWidth - citiesChips.clientWidth - 5;
    const hasOverflow = citiesChips.scrollWidth > citiesChips.clientWidth;

    // Show/hide arrows with smooth transitions
    scrollLeft.style.display = (isAtStart || !hasOverflow) ? 'none' : 'flex';
    scrollRight.style.display = (isAtEnd || !hasOverflow) ? 'none' : 'flex';
    
    // Add visual feedback
    scrollLeft.style.opacity = isAtStart ? '0.5' : '1';
    scrollRight.style.opacity = isAtEnd ? '0.5' : '1';
  }
}

function showCountryButton() {
  const countryButton = document.getElementById('country-button');
  if (countryButton) {
    console.log('Showing country button'); // Debug log
    
    // Force the button to be visible
    countryButton.style.display = 'flex';
    countryButton.style.visibility = 'visible';
    countryButton.style.opacity = '1';
    countryButton.style.transform = 'translateY(-50%) scale(1)';
    countryButton.style.animation = 'fadeInScale 0.3s ease-out';
    
    // Ensure it's above other elements
    countryButton.style.zIndex = '1000';
    
    console.log('Country button styles applied:', {
      display: countryButton.style.display,
      opacity: countryButton.style.opacity,
      visibility: countryButton.style.visibility
    });
    
    // Country button will stay visible until next scroll arrow press or manual click
  } else {
    console.log('Country button not found'); // Debug log
  }
}

function hideCountryButton() {
  const countryButton = document.getElementById('country-button');
  if (countryButton) {
    console.log('Hiding country button'); // Debug log
    countryButton.style.animation = 'fadeOutScale 0.3s ease-out';
    countryButton.style.opacity = '0';
    setTimeout(() => {
      countryButton.style.display = 'none';
      countryButton.style.visibility = 'hidden';
    }, 300);
  }
}

function handleCountryButtonClick() {
  // Get current city and show country information
  const city = currentCity;
  if (city) {
    // You can implement country information display here
    // For now, let's show a simple alert with the city name
    alert(`Country information for ${city} would be displayed here.`);
    
    // Hide the button after clicking
    hideCountryButton();
  }
}

// Test function to manually show country button (for debugging)
export function testShowCountryButton() {
  console.log('Testing country button show function');
  showCountryButton();
} 