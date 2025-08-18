// Header functionality for the weather app
let savedCities = ['Kyiv', 'Paris', 'Vinnytsia', 'Warsaw'];
let currentCity = 'Kyiv';
let hiddenCities = []; // Track cities that are added but hidden

// Search state variables - simplified since we're not using real-time search
let searchResults = [];
let currentPage = 0;
let itemsPerPage = 4;
let totalPages = 0;

// Country data for dropdown suggestions
const countryData = [
  { name: 'Afghanistan', code: 'AF', cities: ['Kabul', 'Kandahar', 'Herat'] },
  { name: 'Albania', code: 'AL', cities: ['Tirana', 'Durrës', 'Vlorë'] },
  { name: 'Algeria', code: 'DZ', cities: ['Algiers', 'Oran', 'Constantine'] },
  { name: 'Argentina', code: 'AR', cities: ['Buenos Aires', 'Córdoba', 'Rosario'] },
  { name: 'Australia', code: 'AU', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
  { name: 'Austria', code: 'AT', cities: ['Vienna', 'Graz', 'Linz'] },
  { name: 'Belgium', code: 'BE', cities: ['Brussels', 'Antwerp', 'Ghent'] },
  { name: 'Brazil', code: 'BR', cities: ['São Paulo', 'Rio de Janeiro', 'Brasília'] },
  { name: 'Canada', code: 'CA', cities: ['Toronto', 'Montreal', 'Vancouver'] },
  { name: 'Chile', code: 'CL', cities: ['Santiago', 'Valparaíso', 'Concepción'] },
  { name: 'China', code: 'CN', cities: ['Beijing', 'Shanghai', 'Guangzhou'] },
  { name: 'Colombia', code: 'CO', cities: ['Bogotá', 'Medellín', 'Cali'] },
  { name: 'Czech Republic', code: 'CZ', cities: ['Prague', 'Brno', 'Ostrava'] },
  { name: 'Denmark', code: 'DK', cities: ['Copenhagen', 'Aarhus', 'Odense'] },
  { name: 'Egypt', code: 'EG', cities: ['Cairo', 'Alexandria', 'Giza'] },
  { name: 'Finland', code: 'FI', cities: ['Helsinki', 'Espoo', 'Tampere'] },
  { name: 'France', code: 'FR', cities: ['Paris', 'Marseille', 'Lyon'] },
  { name: 'Germany', code: 'DE', cities: ['Berlin', 'Hamburg', 'Munich'] },
  { name: 'Greece', code: 'GR', cities: ['Athens', 'Thessaloniki', 'Patras'] },
  { name: 'Hungary', code: 'HU', cities: ['Budapest', 'Debrecen', 'Szeged'] },
  { name: 'India', code: 'IN', cities: ['Mumbai', 'Delhi', 'Bangalore'] },
  { name: 'Indonesia', code: 'ID', cities: ['Jakarta', 'Surabaya', 'Bandung'] },
  { name: 'Ireland', code: 'IE', cities: ['Dublin', 'Cork', 'Galway'] },
  { name: 'Italy', code: 'IT', cities: ['Rome', 'Milan', 'Naples'] },
  { name: 'Japan', code: 'JP', cities: ['Tokyo', 'Osaka', 'Nagoya'] },
  { name: 'Kenya', code: 'KE', cities: ['Nairobi', 'Mombasa', 'Kisumu'] },
  { name: 'Malaysia', code: 'MY', cities: ['Kuala Lumpur', 'George Town', 'Johor Bahru'] },
  { name: 'Mexico', code: 'MX', cities: ['Mexico City', 'Guadalajara', 'Monterrey'] },
  { name: 'Morocco', code: 'MA', cities: ['Casablanca', 'Rabat', 'Fez'] },
  { name: 'Netherlands', code: 'NL', cities: ['Amsterdam', 'Rotterdam', 'The Hague'] },
  { name: 'New Zealand', code: 'NZ', cities: ['Auckland', 'Wellington', 'Christchurch'] },
  { name: 'Nigeria', code: 'NG', cities: ['Lagos', 'Kano', 'Ibadan'] },
  { name: 'Norway', code: 'NO', cities: ['Oslo', 'Bergen', 'Trondheim'] },
  { name: 'Philippines', code: 'PH', cities: ['Manila', 'Quezon City', 'Davao City'] },
  { name: 'Poland', code: 'PL', cities: ['Warsaw', 'Kraków', 'Łódź'] },
  { name: 'Portugal', code: 'PT', cities: ['Lisbon', 'Porto', 'Braga'] },
  { name: 'Romania', code: 'RO', cities: ['Bucharest', 'Cluj-Napoca', 'Timișoara'] },
  { name: 'Russia', code: 'RU', cities: ['Moscow', 'Saint Petersburg', 'Novosibirsk'] },
  { name: 'Saudi Arabia', code: 'SA', cities: ['Riyadh', 'Jeddah', 'Mecca'] },
  { name: 'Singapore', code: 'SG', cities: ['Singapore'] },
  { name: 'South Africa', code: 'ZA', cities: ['Johannesburg', 'Cape Town', 'Durban'] },
  { name: 'South Korea', code: 'KR', cities: ['Seoul', 'Busan', 'Incheon'] },
  { name: 'Spain', code: 'ES', cities: ['Madrid', 'Barcelona', 'Valencia'] },
  { name: 'Sweden', code: 'SE', cities: ['Stockholm', 'Gothenburg', 'Malmö'] },
  { name: 'Switzerland', code: 'CH', cities: ['Zurich', 'Geneva', 'Basel'] },
  { name: 'Thailand', code: 'TH', cities: ['Bangkok', 'Chiang Mai', 'Pattaya'] },
  { name: 'Turkey', code: 'TR', cities: ['Istanbul', 'Ankara', 'Izmir'] },
  { name: 'Ukraine', code: 'UA', cities: ['Kyiv', 'Kharkiv', 'Odesa'] },
  { name: 'United Arab Emirates', code: 'AE', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
  { name: 'United Kingdom', code: 'GB', cities: ['London', 'Birmingham', 'Manchester'] },
  { name: 'United States', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago'] },
  { name: 'Vietnam', code: 'VN', cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang'] }
];

export function initHeader(onCitySelect) {
  const headerHTML = `
    <header class="header">
      
      <div class="header-searchbar">
        <div class="search-input-wrapper" style="width: 100%; max-width: 1000px; margin: 0 auto;">
          <span class="searchbar-icon-inside">🔍</span>
          <input type="text" class="search-input-rounded" placeholder="Search for a city or country..." id="city-search" autocomplete="off" spellcheck="false" maxlength="100" style="position: relative; z-index: 9999; background: white !important; color: black !important; border: 1px solid #ccc !important; padding: 16px 20px !important; width: 100% !important; box-sizing: border-box !important; font-size: 16px !important; border-radius: 25px !important;">
          <button class="search-btn-inside" id="search-btn" style="background: #1976d2 !important; color: white !important; border: none !important; border-radius: 50% !important; width: 45px !important; height: 45px !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; margin-right: 8px !important; box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3) !important; transition: all 0.3s ease !important;">
            <span class="search-icon" style="color: white !important; font-size: 18px !important;">🔍</span>
          </button>
        </div>
        
        <!-- Enhanced Country Dropdown Container -->
        <div class="country-dropdown-container" id="country-dropdown-container" style="display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: white; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 10000; max-height: 300px; overflow-y: auto; margin-top: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); width: 1000px; max-width: 90vw;">
          <!-- Country suggestions will be populated here -->
        </div>
        
        <!-- Search Button Row -->
        <div class="search-actions" style="display: flex; gap: 16px; margin-top: 20px; justify-content: center; align-items: center;">
          <button class="main-search-btn" id="main-search-btn" style="padding: 16px 32px; background: linear-gradient(135deg, #1976d2, #1565c0, #0d47a1); color: white; border: none; border-radius: 30px; cursor: pointer; font-size: 16px; font-weight: 700; box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; display: flex; align-items: center; gap: 12px; letter-spacing: 0.5px; text-transform: uppercase; min-width: 180px; justify-content: center;">
            <span style="font-size: 18px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">🔍</span>
            Search
          </button>
          <button class="clear-search-btn" id="clear-search-btn" style="padding: 14px 28px; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); color: #555; border: 1px solid #ddd; border-radius: 25px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            Clear
          </button>
        </div>
        
        <!-- Quick Country Access Buttons -->
        <div class="quick-countries" style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; justify-content: center;">
          <button class="quick-country-btn" data-country="US" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">🇺🇸 USA</button>
          <button class="quick-country-btn" data-country="GB" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">🇬🇧 UK</button>
          <button class="quick-country-btn" data-country="PH" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">🇵🇭 Philippines</button>
          <button class="quick-country-btn" data-country="JP" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">🇯🇵 Japan</button>
          <button class="quick-country-btn" data-country="AU" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">🇦🇺 Australia</button>
        </div>
        
        <!-- Search Results Container - Hidden since we're not using real-time search -->
        <div class="search-results-container" id="search-results-container" style="display: none;">
          <!-- Search results functionality removed for better user experience -->
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
        <button class="country-button" id="country-button" style="display: none;" title="Country Info - Double click or press 'N' to scroll to next country">🌍</button>
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


  // Search functionality - completely clean and simple
  if (searchInput) {
    console.log('Found search input:', searchInput);
    
    // Basic setup - ensure the input is editable
    searchInput.setAttribute('autocomplete', 'off');
    searchInput.setAttribute('spellcheck', 'false');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('inputmode', 'text');
    
    // Remove any potential interference
    searchInput.removeAttribute('disabled');
    searchInput.removeAttribute('readonly');
    searchInput.style.pointerEvents = 'auto';
    searchInput.style.userSelect = 'auto';
    searchInput.style.caretColor = '#000';
    
    // Ensure the input is not inside a form that might interfere
    if (searchInput.form) {
      searchInput.form.removeAttribute('autocomplete');
    }
    
    // Only handle Enter key - no other interference
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
          handleCitySelect(city, onCitySelect, true);
        }
      }
    });

    // Add input event listener for dropdown suggestions
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length >= 2) {
        showCountryDropdown(query, onCitySelect);
      } else if (query.length === 0) {
        // Show popular countries when input is empty
        showPopularCountries(onCitySelect);
      } else {
        hideCountryDropdown();
      }
    });

    // Show popular countries when input is focused
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length === 0) {
        showPopularCountries(onCitySelect);
      }
    });

    // Hide dropdown when input loses focus
    searchInput.addEventListener('blur', () => {
      setTimeout(() => hideCountryDropdown(), 200);
    });

    // No other event listeners that could interfere with typing
    
    // Test if the input is working
    setTimeout(() => {
      searchInput.focus();
      console.log('Clean input field initialized and focused');
    }, 100);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const city = searchInput.value.trim();
      if (city) {
        // Show loading state
        const originalContent = searchBtn.innerHTML;
        searchBtn.innerHTML = '<span style="color: white !important; font-size: 16px !important;">⏳</span>';
        searchBtn.style.background = '#666 !important';
        searchBtn.disabled = true;
        
        // Perform search
        handleCitySelect(city, onCitySelect, true);
        
        // Reset button after a short delay
        setTimeout(() => {
          searchBtn.innerHTML = originalContent;
          searchBtn.style.background = '#1976d2 !important';
          searchBtn.disabled = false;
        }, 2000);
      }
    });

    // Add hover effects for search button
    searchBtn.addEventListener('mouseenter', () => {
      searchBtn.style.transform = 'scale(1.05)';
      searchBtn.style.boxShadow = '0 4px 16px rgba(25, 118, 210, 0.4)';
    });
    
    searchBtn.addEventListener('mouseleave', () => {
      searchBtn.style.transform = 'scale(1)';
      searchBtn.style.boxShadow = '0 2px 8px rgba(25, 118, 210, 0.3)';
    });
  }

  // Add event listeners for quick country buttons
  const quickCountryBtns = document.querySelectorAll('.quick-country-btn');
  quickCountryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const countryCode = btn.dataset.country;
      const country = countryData.find(c => c.code === countryCode);
      if (country) {
        // Redirect directly to the country's default city
        redirectToCountryDefaultCity(countryCode, country.name, onCitySelect);
        
        // Add visual feedback
        btn.style.background = '#1976d2';
        btn.style.color = 'white';
        btn.style.transform = 'scale(1.05)';
        btn.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.4)';
        
        setTimeout(() => {
          btn.style.background = '#e3f2fd';
          btn.style.color = '#1976d2';
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = 'none';
        }, 1000);
      }
    });

    // Add hover effects for quick country buttons
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
      btn.style.boxShadow = 'none';
    });
  });

  // Add event listeners for main search and clear buttons
  const mainSearchBtn = document.getElementById('main-search-btn');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (mainSearchBtn) {
    mainSearchBtn.addEventListener('click', () => {
      const city = searchInput.value.trim();
      if (city) {
        // Show loading state
        const originalContent = mainSearchBtn.innerHTML;
        mainSearchBtn.innerHTML = '<span>⏳</span> Searching...';
        mainSearchBtn.style.background = 'linear-gradient(135deg, #666, #555)';
        mainSearchBtn.disabled = true;
        
        // Perform search
        handleCitySelect(city, onCitySelect, true);
        
        // Reset button after a short delay
        setTimeout(() => {
          mainSearchBtn.innerHTML = originalContent;
          mainSearchBtn.style.background = 'linear-gradient(135deg, #1976d2, #1565c0)';
          mainSearchBtn.disabled = false;
        }, 2000);
      } else {
        // Show error state
        mainSearchBtn.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
        mainSearchBtn.innerHTML = '<span>❌</span> Enter a city/country';
        setTimeout(() => {
          mainSearchBtn.style.background = 'linear-gradient(135deg, #1976d2, #1565c0)';
          mainSearchBtn.innerHTML = '<span>🔍</span> Search';
        }, 2000);
      }
    });

    // Add hover effects for main search button
    mainSearchBtn.addEventListener('mouseenter', () => {
      mainSearchBtn.style.transform = 'translateY(-3px) scale(1.02)';
      mainSearchBtn.style.boxShadow = '0 8px 25px rgba(25, 118, 210, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)';
      mainSearchBtn.style.background = 'linear-gradient(135deg, #1565c0, #1976d2, #42a5f5)';
    });
    
    mainSearchBtn.addEventListener('mouseleave', () => {
      mainSearchBtn.style.transform = 'translateY(0) scale(1)';
      mainSearchBtn.style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)';
      mainSearchBtn.style.background = 'linear-gradient(135deg, #1976d2, #1565c0, #0d47a1)';
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.placeholder = 'Search for a city or country...';
      hideCountryDropdown();
      searchInput.focus();
      
      // Visual feedback
      clearSearchBtn.style.background = '#4caf50';
      clearSearchBtn.style.color = 'white';
      clearSearchBtn.innerHTML = '✓ Cleared';
      setTimeout(() => {
        clearSearchBtn.style.background = '#f5f5f5';
        clearSearchBtn.style.color = '#666';
        clearSearchBtn.innerHTML = 'Clear';
      }, 1000);
    });

    // Add hover effects for clear button
    clearSearchBtn.addEventListener('mouseenter', () => {
      clearSearchBtn.style.background = 'linear-gradient(135deg, #e0e0e0, #d0d0d0)';
      clearSearchBtn.style.transform = 'translateY(-2px) scale(1.02)';
      clearSearchBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      clearSearchBtn.style.color = '#333';
    });
    
    clearSearchBtn.addEventListener('mouseleave', () => {
      clearSearchBtn.style.background = 'linear-gradient(135deg, #f5f5f5, #e0e0e0)';
      clearSearchBtn.style.transform = 'translateY(0) scale(1)';
      clearSearchBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      clearSearchBtn.style.color = '#555';
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

  // Add country button scrolling functionality
  let countryButtonScrollTimeout;
  if (countryButton) {
    countryButton.addEventListener('click', () => {
      handleCountryButtonClick();
    });
    
    // Add scroll to next country functionality
    countryButton.addEventListener('dblclick', () => {
      scrollToNextCountry();
    });
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
    } else if (e.key === 'Enter' && e.target.classList.contains('header-city-chip')) {
      // Handle Enter key on city chips
      const city = e.target.dataset.city;
      if (city) {
        handleCitySelect(city, onCitySelect);
      }
    }
  });
  
  // Add global keyboard support for country button scrolling
  // REMOVED: This was interfering with typing in the search input
  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'n' || e.key === 'N') {
  //     // Press 'N' to scroll to next country
  //     e.preventDefault();
  //     scrollToNextCountry();
  //   }
  // });

  // Pagination controls - simplified since we're not using real-time search
  const paginationPrev = document.getElementById('pagination-prev');
  const paginationNext = document.getElementById('pagination-next');

  // These are kept for potential future use but not actively used
  if (paginationPrev) {
    paginationPrev.addEventListener('click', () => {
      console.log('Previous page clicked');
    });
  }

  if (paginationNext) {
    paginationNext.addEventListener('click', () => {
      console.log('Next page clicked');
    });
  }
  
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
  
  // Hide country button when a new city is selected
  hideCountryButton();
  
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

  // Clear search input only if it's not a country selection
  const searchInput = document.getElementById('city-search');
  if (searchInput && !searchInput.value.includes(' - ')) {
    searchInput.value = '';
  }

  // Call the callback
  if (onCitySelect) {
    onCitySelect(city);
  }
}

// Redirect to country's default city (first city in its list)
function redirectToCountryDefaultCity(countryCode, countryName, onCitySelect) {
  const searchInput = document.getElementById('city-search');
  const country = countryData.find(c => c.code === countryCode);
  if (!country || !country.cities || country.cities.length === 0) {
    // Fallback to showing cities if none defined
    showCitiesInCountry(countryCode, countryName, onCitySelect);
    return;
  }
  const defaultCity = country.cities[0];
  if (searchInput) {
    searchInput.value = `${countryName} - ${defaultCity}`;
  }
  if (onCitySelect) {
    handleCitySelect(defaultCity, onCitySelect, true);
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
    
    // Update the title to include scrolling functionality hint
    countryButton.title = 'Country Info - Double click or press "N" to scroll to next country';
    
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

function scrollToNextCountry() {
  const citiesChips = document.getElementById('cities-chips');
  const countryButton = document.getElementById('country-button');
  if (!citiesChips) return;
  
  // Add scrolling visual feedback to country button
  if (countryButton) {
    countryButton.classList.add('scrolling');
    setTimeout(() => {
      countryButton.classList.remove('scrolling');
    }, 1500);
  }
  
  // Get all city chips
  const cityChips = citiesChips.querySelectorAll('.header-city-chip');
  if (cityChips.length === 0) return;
  
  // Find the currently selected city chip
  const currentChip = citiesChips.querySelector('.header-city-chip.selected');
  if (!currentChip) return;
  
  // Find the next city chip
  const currentIndex = Array.from(cityChips).indexOf(currentChip);
  const nextIndex = (currentIndex + 1) % cityChips.length;
  const nextChip = cityChips[nextIndex];
  
  if (nextChip) {
    // Scroll to the next city chip
    nextChip.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest', 
      inline: 'center' 
    });
    
    // Select the next city
    const nextCity = nextChip.dataset.city;
    if (nextCity) {
      // Simulate a click on the next city chip
      setTimeout(() => {
        nextChip.click();
      }, 300);
    }
  }
}

// Test function to manually show country button (for debugging)
export function testShowCountryButton() {
  console.log('Testing country button show function');
  showCountryButton();
}

// Search and pagination functions - simplified since we're not using real-time search
function performSearch(query, onCitySelect) {
  // This function is kept for potential future use but not actively used
  // since we removed real-time search functionality
  console.log('Search function called with:', query);
}

function displaySearchResults() {
  // This function is kept for potential future use but simplified
  console.log('Display search results called');
}

function showSearchResults() {
  const searchResultsContainer = document.getElementById('search-results-container');
  if (searchResultsContainer) {
    searchResultsContainer.style.display = 'block';
  }
}

function hideSearchResults() {
  const searchResultsContainer = document.getElementById('search-results-container');
  if (searchResultsContainer) {
    searchResultsContainer.style.display = 'none';
  }
}

// Country dropdown functions
function showCountryDropdown(query, onCitySelect) {
  const dropdownContainer = document.getElementById('country-dropdown-container');
  if (!dropdownContainer) return;
  const searchInput = document.getElementById('city-search');

  // Filter countries and cities based on query
  const suggestions = [];
  
  countryData.forEach(country => {
    // Check if country name matches
    if (country.name.toLowerCase().includes(query)) {
      suggestions.push({
        type: 'country',
        name: country.name,
        code: country.code,
        display: `${country.name} (${country.code})`
      });
    }
    
    // Check if any cities match
    country.cities.forEach(city => {
      if (city.toLowerCase().includes(query)) {
        suggestions.push({
          type: 'city',
          name: city,
          country: country.name,
          code: country.code,
          display: `${city}, ${country.name}`
        });
      }
    });
  });

  // Limit suggestions to 10 items
  const limitedSuggestions = suggestions.slice(0, 10);

  if (limitedSuggestions.length > 0) {
    const suggestionsHTML = limitedSuggestions.map(item => `
      <div class="dropdown-item" data-type="${item.type}" data-name="${item.name}" data-country="${item.country || ''}" data-code="${item.code}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">${item.display}</div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: ${item.type === 'city' ? '#e3f2fd' : '#f3e5f5'}; color: ${item.type === 'city' ? '#1976d2' : '#7b1fa2'}; border-radius: 12px; font-weight: 500; font-size: 11px;">
            ${item.type === 'city' ? '🏙️ City' : '🌍 Country'}
          </span>
        </div>
      </div>
    `).join('');

    dropdownContainer.innerHTML = suggestionsHTML;
    dropdownContainer.style.display = 'block';

          // Add click event listeners to dropdown items
      const dropdownItems = dropdownContainer.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
          const name = item.dataset.name;
          const country = item.dataset.country;
          const code = item.dataset.code;
          
          if (item.dataset.type === 'city') {
            // For cities, search with city name and keep country visible
            if (country) {
              searchInput.value = `${country} - ${name}`;
            } else {
              searchInput.value = name;
            }
            if (onCitySelect) {
              handleCitySelect(name, onCitySelect, true);
            }
          } else {
            // For countries, directly redirect to default city (first in list)
            redirectToCountryDefaultCity(code, name, onCitySelect);
          }
          hideCountryDropdown();
        });

      // Add hover effect
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#f8f9fa';
        item.style.transform = 'translateX(4px)';
        item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        
        // Highlight country items on hover
        if (item.dataset.type === 'country') {
          clearTimeout(item.hoverTimeout);
          item.style.borderLeft = '4px solid #1976d2';
          item.style.paddingLeft = '16px';
          item.style.backgroundColor = '#e3f2fd';
          item.classList.add('country-hover');
        }
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'white';
        item.style.transform = 'translateX(0)';
        item.style.boxShadow = 'none';
        
        // Clear hover timeout when mouse leaves
        if (item.hoverTimeout) {
          clearTimeout(item.hoverTimeout);
        }
        
        // Reset visual indicators for hover-to-select
        if (item.dataset.type === 'country') {
          item.style.borderLeft = 'none';
          item.style.paddingLeft = '20px';
          item.style.backgroundColor = 'white';
          item.classList.remove('country-hover');
          
          // Remove countdown element if it exists
          const countdownEl = item.querySelector('.auto-select-countdown');
          if (countdownEl) {
            countdownEl.remove();
          }
        }
      });
    });
  } else {
    hideCountryDropdown();
  }
}

function hideCountryDropdown() {
  const dropdownContainer = document.getElementById('country-dropdown-container');
  if (dropdownContainer) {
    dropdownContainer.style.display = 'none';
  }
}

function showPopularCountries(onCitySelect) {
  const dropdownContainer = document.getElementById('country-dropdown-container');
  if (!dropdownContainer) return;
  const searchInput = document.getElementById('city-search');

  // Popular countries to show by default
  const popularCountries = [
    { name: 'United States', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'United Kingdom', code: 'GB', cities: ['London', 'Birmingham', 'Manchester'] },
    { name: 'Philippines', code: 'PH', cities: ['Manila', 'Quezon City', 'Davao City'] },
    { name: 'Japan', code: 'JP', cities: ['Tokyo', 'Osaka', 'Nagoya'] },
    { name: 'Australia', code: 'AU', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    { name: 'Canada', code: 'CA', cities: ['Toronto', 'Montreal', 'Vancouver'] },
    { name: 'Germany', code: 'DE', cities: ['Berlin', 'Hamburg', 'Munich'] },
    { name: 'France', code: 'FR', cities: ['Paris', 'Marseille', 'Lyon'] }
  ];

  const popularHTML = `
    <div style="padding: 16px 20px; border-bottom: 2px solid #e3f2fd; background: #f8f9fa;">
      <div style="font-weight: 700; color: #1976d2; font-size: 14px; margin-bottom: 12px; text-align: center;">🌍 Popular Countries</div>
    </div>
    ${popularCountries.map(country => `
      <div class="dropdown-item popular-country" data-type="country" data-name="${country.name}" data-code="${country.code}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">${getCountryFlag(country.code)}</span>
          ${country.name} (${country.code})
        </div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: #f3e5f5; color: #7b1fa2; border-radius: 12px; font-weight: 500; font-size: 11px;">
            🌍 Country
          </span>
          <span style="color: #666;">${country.cities.length} major cities</span>
        </div>
      </div>
    `).join('')}
  `;

  dropdownContainer.innerHTML = popularHTML;
  dropdownContainer.style.display = 'block';

  // Add click event listeners to popular country items
  const popularItems = dropdownContainer.querySelectorAll('.popular-country');
  popularItems.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.name;
      const code = item.dataset.code;
      // Directly redirect to default city for the country
      redirectToCountryDefaultCity(code, name, onCitySelect);
    });

    // Add hover effect
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = '#f8f9fa';
      item.style.transform = 'translateX(4px)';
      item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      
      // Highlight country item on hover
      clearTimeout(item.hoverTimeout);
      item.style.borderLeft = '4px solid #1976d2';
      item.style.paddingLeft = '16px';
      item.style.backgroundColor = '#e3f2fd';
      item.classList.add('country-hover');
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'white';
      item.style.transform = 'translateX(0)';
      item.style.boxShadow = 'none';
      
      // Clear hover timeout when mouse leaves
      if (item.hoverTimeout) {
        clearTimeout(item.hoverTimeout);
      }
      
      // Reset visual indicators
      item.style.borderLeft = 'none';
      item.style.paddingLeft = '20px';
      item.style.backgroundColor = 'white';
      item.classList.remove('country-hover');
    });
  });
}

function getCountryFlag(countryCode) {
  const flagMap = {
    'US': '🇺🇸', 'GB': '🇬🇧', 'PH': '🇵🇭', 'JP': '🇯🇵', 'AU': '🇦🇺', 'CA': '🇨🇦',
    'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'SE': '🇸🇪',
    'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮', 'CH': '🇨🇭', 'AT': '🇦🇹', 'BE': '🇧🇪'
  };
  return flagMap[countryCode] || '🌍';
}

function showCitiesInCountry(countryCode, countryName, onCitySelect) {
  const country = countryData.find(c => c.code === countryCode);
  if (!country) return;

  const dropdownContainer = document.getElementById('country-dropdown-container');
  if (!dropdownContainer) return;
  const searchInput = document.getElementById('city-search');

  const citiesHTML = `
    <div style="padding: 16px 20px; border-bottom: 2px solid #e3f2fd; background: #f8f9fa;">
      <div style="font-weight: 700; color: #1976d2; font-size: 14px; margin-bottom: 12px; text-align: center; display: flex; align-items: center; justify-content: space-between;">
        <span>🏙️ Cities in ${countryName}</span>
        <button class="back-to-countries" style="padding: 4px 8px; background: #1976d2; color: white; border: none; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 500;">← Back</button>
      </div>
    </div>
    ${country.cities.map(city => `
      <div class="dropdown-item" data-type="city" data-name="${city}" data-country="${countryName}" data-code="${countryCode}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">${city}</div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: #e3f2fd; color: #1976d2; border-radius: 12px; font-weight: 500; font-size: 11px;">
            🏙️ City in ${countryName}
          </span>
        </div>
      </div>
    `).join('')}
  `;

  dropdownContainer.innerHTML = citiesHTML;
  dropdownContainer.style.display = 'block';

  // Add click event listener for back button
  const backButton = dropdownContainer.querySelector('.back-to-countries');
  if (backButton) {
    backButton.addEventListener('click', () => {
      showPopularCountries(onCitySelect);
    });
  }

  // Add click event listeners
  const dropdownItems = dropdownContainer.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.name;
      const country = item.dataset.country;
      // Keep country visible in input field
      searchInput.value = `${country} - ${name}`;
      if (onCitySelect) {
        handleCitySelect(name, onCitySelect, true);
      }
      hideCountryDropdown();
    });

    // Add hover effect
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = '#f8f9fa';
      item.style.transform = 'translateX(4px)';
      item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'white';
      item.style.transform = 'translateX(0)';
      item.style.boxShadow = 'none';
    });
  });
} 