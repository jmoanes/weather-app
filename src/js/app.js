import { initHeader } from './ui/header.js';
import { fetchCurrentWeather, fetchFiveDayForecast, fetchCityscapeImage } from './api.js';
import { renderTodayWeather } from './ui/home.js';
import { renderFiveDayForecast } from './ui/fiveDays.js';
import { getRandomQuote } from './ui/quote.js';
import { renderForecastChart } from './ui/chart.js';

// Main app logic
let DEFAULT_CITY = 'Kyiv';
let DEFAULT_COUNTRY = 'UA';
let currentCity = '';
let currentView = 'today'; // 'today' or 'fiveDays'
let expandedDate = '';
let allExpanded = false;
let showChart = false;
let errorMessage = '';
let lastWeatherData = null;
let lastForecastData = null;

function renderDashboard(weatherData, forecastData) {
  // Weather Card
  let weatherCardHTML = '';
  let navButtonsHTML = '';
  if (currentView === 'today') {
    if (weatherData) {
      weatherCardHTML = renderTodayWeather(weatherData);
      navButtonsHTML = `
        <div id="nav-buttons">
          <button id="btn-today" class="nav-btn active">TODAY</button>
          <button id="btn-five-days" class="nav-btn">5 DAYS</button>
        </div>
      `;
    } else {
      weatherCardHTML = `<section class="today-weather-card"><div class="weather-card-overlay"><div class="weather-card-header"><span class="weather-city">Select a city</span></div><div class="weather-temp-main">--°C</div><div class="weather-minmax">min --° / max --°</div></div></section>`;
      navButtonsHTML = '';
    }
  } else {
    weatherCardHTML = '';
    navButtonsHTML = `
      <div id="nav-buttons">
        <button id="btn-today" class="nav-btn">TODAY</button>
        <button id="btn-five-days" class="nav-btn active">5 DAYS</button>
      </div>
    `;
  }

  // Main Content (Today or 5 Days)
  let mainContentHTML = '';
  if (currentView === 'today') {
    if (weatherData) {
      mainContentHTML = '';
    } else {
      mainContentHTML = '<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the weather.</div></div>';
    }
  } else if (currentView === 'fiveDays') {
    if (forecastData) {
      // Get country information from weather data
      let countryName = '';
      if (weatherData && weatherData.sys && weatherData.sys.country) {
        const countryCode = weatherData.sys.country;
        // Use the same country names mapping from header.js
        const countryNames = {
          'TH': 'Thailand', 'US': 'United States', 'GB': 'United Kingdom', 'FR': 'France',
          'UA': 'Ukraine', 'PL': 'Poland', 'AU': 'Australia', 'CA': 'Canada', 'DE': 'Germany',
          'IT': 'Italy', 'ES': 'Spain', 'JP': 'Japan', 'CN': 'China', 'IN': 'India',
          'BR': 'Brazil', 'MX': 'Mexico', 'RU': 'Russia', 'KR': 'South Korea',
          'NL': 'Netherlands', 'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark',
          'FI': 'Finland', 'CH': 'Switzerland', 'AT': 'Austria', 'BE': 'Belgium',
          'PT': 'Portugal', 'GR': 'Greece', 'IE': 'Ireland', 'NZ': 'New Zealand',
          'VN': 'Vietnam', 'SG': 'Singapore', 'MY': 'Malaysia', 'ID': 'Indonesia',
          'PH': 'Philippines', 'TR': 'Turkey', 'SA': 'Saudi Arabia', 'AE': 'United Arab Emirates',
          'EG': 'Egypt', 'ZA': 'South Africa', 'NG': 'Nigeria', 'KE': 'Kenya',
          'MA': 'Morocco', 'TN': 'Tunisia', 'DZ': 'Algeria', 'LY': 'Libya',
          'SD': 'Sudan', 'ET': 'Ethiopia', 'GH': 'Ghana', 'CI': 'Ivory Coast',
          'SN': 'Senegal', 'ML': 'Mali', 'BF': 'Burkina Faso', 'NE': 'Niger',
          'TD': 'Chad', 'CF': 'Central African Republic', 'CM': 'Cameroon',
          'GQ': 'Equatorial Guinea', 'GA': 'Gabon', 'CG': 'Republic of the Congo',
          'CD': 'Democratic Republic of the Congo', 'AO': 'Angola', 'ZM': 'Zambia',
          'ZW': 'Zimbabwe', 'BW': 'Botswana', 'NA': 'Namibia', 'SZ': 'Eswatini',
          'LS': 'Lesotho', 'MG': 'Madagascar', 'MU': 'Mauritius', 'SC': 'Seychelles',
          'KM': 'Comoros', 'DJ': 'Djibouti', 'SO': 'Somalia', 'ER': 'Eritrea',
          'SS': 'South Sudan', 'RW': 'Rwanda', 'BI': 'Burundi', 'TZ': 'Tanzania',
          'UG': 'Uganda', 'MZ': 'Mozambique', 'MW': 'Malawi'
        };
        countryName = countryNames[countryCode] || countryCode;
      }
      mainContentHTML = renderFiveDayForecast(forecastData, allExpanded, showChart, currentCity, countryName);
      if (showChart) {
        mainContentHTML += renderForecastChart(forecastData);
      }
    } else {
      mainContentHTML = '<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the forecast.</div></div>';
    }
  }

  // Date/Time Section
  let dateTimeHTML = '';
  if (weatherData) {
    const now = new Date();
    const day = now.toLocaleString('en-US', { weekday: 'short' });
    const date = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let sunrise = '', sunset = '';
    if (weatherData.sys && weatherData.sys.sunrise && weatherData.sys.sunset) {
      sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    dateTimeHTML = `
      <div class="date-time-section">
        <div class="date-big"><span class="date-num">${date}<sup>th</sup></span> <span class="date-day">${day}</span></div>
        <div class="date-month">${month}</div>
        <div class="date-time-row">
          <span class="date-time-clock">${time}</span>
          <span class="date-sunrise"><span class="sun-icon">🌅</span>${sunrise}</span>
          <span class="date-sunset"><span class="sunset-icon">🌇</span>${sunset}</span>
        </div>
      </div>
    `;
  } else {
    dateTimeHTML = `<div class="date-time-section"><div class="date-big"><span class="date-num">--<sup>th</sup></span> <span class="date-day">---</span></div><div class="date-month">------</div><div class="date-time-row"><span class="date-time-clock">--:--</span><span class="date-sunrise"><span class="sun-icon">🌅</span>--:--</span><span class="date-sunset"><span class="sunset-icon">🌇</span>--:--</span></div></div>`;
  }

  // Quote Section
  const quoteHTML = getRandomQuote();

  // Main App Layout
  const app = document.getElementById('app');
  const isMobile = window.innerWidth <= 768;
  
  if (currentView === 'fiveDays') {
    app.innerHTML = `
      <div id="header-root"></div>
      ${navButtonsHTML}
      ${mainContentHTML}
    `;
  } else {
    app.innerHTML = `
      <div id="header-root"></div>
      <div class="weather-right-group">
        ${weatherCardHTML}
        ${navButtonsHTML}
      </div>
      ${mainContentHTML}
      ${currentView === 'today' ? dateTimeHTML : ''}
      ${currentView === 'today' ? quoteHTML : ''}
    `;
  }
  // Add or remove right-align class based on currentView
  const weatherCard = document.querySelector('.today-weather-card');
  const navButtons = document.getElementById('nav-buttons');
  if (currentView === 'today') {
    if (weatherCard) weatherCard.classList.add('right-align');
    if (navButtons) navButtons.classList.add('right-align');
  } else {
    if (weatherCard) weatherCard.classList.remove('right-align');
    if (navButtons) navButtons.classList.remove('right-align');
  }
  // Always re-initialize the header after rendering
  initHeader(async (city) => {
    currentView = 'today';
    expandedDate = '';
    showChart = false;
    await updateDashboard(city);
  });

  // Move header into place
  let headerRoot = document.getElementById('header-root');
  if (!headerRoot) {
    headerRoot = document.createElement('div');
    headerRoot.id = 'header-root';
    document.querySelector('.header-searchbar-root').appendChild(headerRoot);
  }

  // Add event listeners for nav buttons
  const btnToday = document.getElementById('btn-today');
  const btnFiveDays = document.getElementById('btn-five-days');
  if (btnToday) btnToday.onclick = () => {
    if (currentView !== 'today') {
      currentView = 'today';
      expandedDate = '';
      showChart = false;
      // Ensure dropdown is hidden when switching views
      const dd = document.getElementById('country-dropdown-container');
      if (dd) dd.style.display = 'none';
      updateDashboard(currentCity);
    }
  };
  if (btnFiveDays) btnFiveDays.onclick = () => {
    if (currentView !== 'fiveDays') {
      currentView = 'fiveDays';
      expandedDate = '';
      showChart = false;
      // Ensure dropdown is hidden when switching views
      const dd = document.getElementById('country-dropdown-container');
      if (dd) dd.style.display = 'none';
      updateDashboard(currentCity);
    }
  };
  // Add event listeners for More Info and Show Chart buttons
  if (currentView === 'fiveDays' && forecastData) {
    document.querySelectorAll('.more-info-btn').forEach(btn => {
      btn.onclick = (e) => {
        allExpanded = !allExpanded;
        updateDashboard(currentCity);
      };
    });
    const showChartBtn = document.getElementById('show-chart-btn');
    if (showChartBtn) {
      showChartBtn.onclick = (e) => {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = showChartBtn.getBoundingClientRect();
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = (e.clientX - rect.left - rect.width/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - rect.height/2) + 'px';
        showChartBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        // Toggle chart without triggering loading/fetch
        showChart = !showChart;
        renderDashboard(lastWeatherData, lastForecastData);
      };
    }
  }
}

async function setCityBackground(city, weatherDesc, countryName) {
  const overlay = document.querySelector('.background-overlay');
  if (!city) {
    document.body.style.backgroundImage = '';
    if (overlay) {
      overlay.style.backgroundImage = '';
      overlay.style.opacity = '0';
    }
    return;
  }
  
  // Show loading state
  if (overlay) {
    overlay.style.opacity = '0.3';
    overlay.style.transition = 'opacity 0.5s ease-in-out';
  }
  
  let imageUrl = await fetchCityscapeImage(city, weatherDesc, countryName);
  
  if (imageUrl) {
    if (overlay) {
      overlay.style.display = 'block';
      overlay.style.backgroundImage = `url('${imageUrl}')`;
      overlay.style.backgroundSize = 'cover';
      overlay.style.backgroundPosition = 'center';
      overlay.style.backgroundRepeat = 'no-repeat';
      overlay.style.opacity = '0.6';
      overlay.style.transition = 'opacity 0.8s ease-in-out';
      
      // City name overlay removed
    } else {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  } else {
    if (overlay) {
      overlay.style.display = 'none';
      overlay.style.backgroundImage = '';
      overlay.style.opacity = '0';
    }
    document.body.style.backgroundImage = '';
    
    // City name overlay removed
  }
}



async function updateDashboard(city) {
  currentCity = city;
  let weatherData = null;
  let forecastData = null;
  errorMessage = '';
  
  // Show loading state
  showLoading(true);
  
  if (city) {
    try {
      weatherData = await fetchCurrentWeather(city);
      forecastData = await fetchFiveDayForecast(city);
      let weatherDesc = weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].main : '';
      let countryName = weatherData && weatherData.sys && weatherData.sys.country ? weatherData.sys.country : '';
      weatherDesc = weatherDesc ? weatherDesc.toLowerCase() : '';
      setCityBackground(city.split(',')[0], weatherDesc, countryName); // Pass weather description for image search
      // Cache latest data for instant re-renders (e.g., Show Chart toggle)
      lastWeatherData = weatherData;
      lastForecastData = forecastData;
    } catch (err) {
      errorMessage = 'City or country not found. Please try another.';
      renderDashboard(null, null);
      setCityBackground(null, null, null);
      showLoading(false);
      showErrorMessage(errorMessage);
      return;
    }
  } else {
    setCityBackground(null, null, null);
  }
  
  // Hide loading state
  showLoading(false);
  renderDashboard(weatherData, forecastData);
}

function showLoading(show) {
  let loadingElement = document.querySelector('.loading-overlay');
  
  if (show) {
    if (!loadingElement) {
      loadingElement = createLoadingOverlay();
    }
    loadingElement.style.display = 'flex';
  } else {
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
}

function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Searching weather data...</div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function showErrorMessage(message) {
  // Remove any existing error message
  const existingError = document.querySelector('.error-message-overlay');
  if (existingError) {
    existingError.remove();
  }
  
  // Create new error message
  const errorOverlay = document.createElement('div');
  errorOverlay.className = 'error-message-overlay';
  errorOverlay.innerHTML = `
    <div class="error-message-content">
      <div class="error-icon">⚠️</div>
      <div class="error-text">${message}</div>
    </div>
  `;
  document.body.appendChild(errorOverlay);
  
  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (errorOverlay.parentNode) {
      errorOverlay.style.opacity = '0';
      errorOverlay.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (errorOverlay.parentNode) {
          errorOverlay.remove();
        }
      }, 300);
    }
  }, 3000);
}

window.addEventListener('DOMContentLoaded', () => {
  // On first load, use default city and country
  updateDashboard(`${DEFAULT_CITY},${DEFAULT_COUNTRY}`);
  initHeader(async (city) => {
    currentView = 'today';
    expandedDate = '';
    showChart = false;
    await updateDashboard(city);
  });
}); 