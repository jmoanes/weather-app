// Home (Today) UI logic
// Renders today's weather for a city

/**
 * Render today's weather section
 * @param {Object} weatherData - Data from OpenWeatherMap current weather API
 * @returns {string} HTML string
 */
export function renderTodayWeather(weatherData) {
  if (!weatherData) return '<div class="error">No weather data available.</div>';
  const { name, main, weather, sys } = weatherData;
  const temp = Math.round(main.temp);
  const min = Math.round(main.temp_min);
  const max = Math.round(main.temp_max);
  const desc = weather[0].description;
  const icon = weather[0].icon;
  const country = sys && sys.country ? sys.country : '';
  
  // Helper function to get country name from code
  const countryNames = {
    'TH': 'Thailand',
    'US': 'United States',
    'GB': 'United Kingdom',
    'FR': 'France',
    'UA': 'Ukraine',
    'PL': 'Poland',
    'AU': 'Australia',
    'CA': 'Canada',
    'DE': 'Germany',
    'IT': 'Italy',
    'ES': 'Spain',
    'JP': 'Japan',
    'CN': 'China',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'RU': 'Russia',
    'KR': 'South Korea',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'BE': 'Belgium',
    'PT': 'Portugal',
    'GR': 'Greece',
    'IE': 'Ireland',
    'NZ': 'New Zealand'
  };
  
  const countryName = countryNames[country] || country;
  const isMobile = window.innerWidth <= 768;
  
  return `
    <section class="today-weather-card">
      <div class="weather-card-overlay">
        <div class="weather-card-header">
          <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;">
            <span class="weather-city">${name}</span>
            ${countryName ? `<span class="weather-country-link" data-country-code="${country}" data-country-name="${countryName}" role="button" tabindex="0" title="Browse cities in ${countryName}" style="font-size:${isMobile ? '0.85rem' : '0.95rem'};color:#ffd54f;font-weight:500;opacity:0.9;letter-spacing:0.3px;cursor:pointer;">${countryName}</span>` : ''}
          </div>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
        </div>
        <div class="weather-temp-main">${temp}&deg;C</div>
        <div class="weather-minmax">min <b>${min}&deg;</b> &nbsp; max <b>${max}&deg;</b></div>
        <div class="weather-desc">${desc}</div>
      </div>
    </section>
  `;
} 