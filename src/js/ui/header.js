// Header UI logic
// This module renders the header and manages search and city selection

let selectedCities = [];
let onCitySelect = null;

// Helper to convert country code to country name
const countryNames = {
  'TH': 'Thailand',
  'US': 'United States',
  'GB': 'United Kingdom',
  'FR': 'France',
  'UA': 'Ukraine',
  'PL': 'Poland',
  // Add more as needed
};
function getCountryName(code) {
  return countryNames[code] || code || '';
}

/**
 * Render the header UI
 * @param {string} currentCity - The currently selected city
 */
function renderHeader(currentCity = '', currentCountry = '') {
  // const countryDisplay = currentCountry ? `<div class="header-country" id="header-country">${getCountryName(currentCountry)}</div>` : '';
  const headerHTML = `
    <header class="header header-blur">
      <div class="header-searchbar">
        <div class="search-input-wrapper" style="position:relative; flex:1 1 auto; display:flex; align-items:center; width:100%;">
          <span class="searchbar-icon-inside" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:1.1rem; color:#b0b6be; pointer-events:none;">&#128269;</span>
          <input type="text" id="city-search-input" placeholder="Enter the city" class="search-input-rounded" style="padding-left:2.2em; padding-right:2.2em; width:100%;" />
          <span id="city-search-btn" class="search-btn-inside" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; height:28px; width:28px;">
            <span class="search-icon" style="font-size:1.5rem; color:#1976d2;">&#10148;</span>
          </span>
        </div>
      </div>
      ${currentCity ? `<div class="header-current-city" style="text-align:center;font-size:1.2em;font-weight:bold;margin:8px 0 0 0;">${currentCity}</div>` : ''}
      <div style="height: 10px;"></div>
      <div class="header-cities-chips-scroll"><div class="header-cities-chips" id="header-cities">
        ${selectedCities.map(city => `
          <span class="header-city-chip${city === currentCity ? ' selected' : ''}" data-city="${city}">${city} <span class="chip-close">&times;</span></span>
        `).join('')}
      </div></div>
    </header>
  `;
  document.getElementById('header-root').innerHTML = headerHTML;

  // Add event listeners
  document.getElementById('city-search-btn').onclick = () => {
    const input = document.getElementById('city-search-input');
    const city = input.value.trim();
    if (city && !selectedCities.includes(city)) {
      selectedCities.unshift(city);
      if (selectedCities.length > 2) {
        selectedCities.pop();
      }
    }
    if (onCitySelect) onCitySelect(city);
    renderHeader(city, currentCountry);
  };

  // Add Enter key event for search
  document.getElementById('city-search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('city-search-btn').click();
    }
  });

  document.querySelectorAll('.header-city-chip').forEach(el => {
    el.onclick = (e) => {
      if (e.target.classList.contains('chip-close')) {
        const city = el.getAttribute('data-city');
        selectedCities = selectedCities.filter(c => c !== city);
        renderHeader(currentCity, currentCountry);
        return;
      }
      const city = el.getAttribute('data-city');
      if (onCitySelect) onCitySelect(city);
      renderHeader(city, currentCountry);
    };
  });
}

/**
 * Initialize the header
 * @param {Function} citySelectCallback - Called with the selected city name
 */
export function initHeader(citySelectCallback) {
  onCitySelect = citySelectCallback;
  // Create a root for the header if not present
  let headerRoot = document.getElementById('header-root');
  if (!headerRoot) {
    headerRoot = document.createElement('div');
    headerRoot.id = 'header-root';
    const app = document.getElementById('app');
    app.prepend(headerRoot);
  }
  renderHeader();
} 