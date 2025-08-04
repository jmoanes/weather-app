import { initHeader } from './ui/header.js';
import { fetchCurrentWeather, fetchFiveDayForecast, fetchCityscapeImage } from './api.js';
import { renderTodayWeather } from './ui/home.js';
import { renderFiveDayForecast } from './ui/fiveDays.js';
import { getRandomQuote } from './ui/quote.js';
import { renderForecastChart } from './ui/chart.js';

// Main app logic
let DEFAULT_CITY = 'New York';
let DEFAULT_COUNTRY = 'US';
let currentCity = '';
let currentView = 'today'; // 'today' or 'fiveDays'
let expandedDate = '';
let allExpanded = false;
let showChart = false;
let errorMessage = '';

function renderDashboard(weatherData, forecastData) {
  // Error notification
  let errorHTML = '';
  if (errorMessage) {
    errorHTML = `<div class="error-notification">${errorMessage}</div>`;
  }
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
      mainContentHTML = renderFiveDayForecast(forecastData, allExpanded, showChart);
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
      ${errorHTML}
      ${isMobile ? '' : '<div class="country-align-row"></div>'}
      ${isMobile ? `
        <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:16px;padding:0 16px;">
          <div style="font-size:1.1rem;font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;">${currentCity || ''}</div>
          ${navButtonsHTML}
        </div>
      ` : `
        <div style="width:100%;display:flex;justify-content:center;align-items:center;gap:24px;margin-bottom:8px;">
          <div style="font-size:1.25rem;font-weight:600;color:#fff;letter-spacing:0.5px;">${currentCity || ''}</div>
          ${navButtonsHTML}
        </div>
      `}
      ${mainContentHTML}
    `;
  } else {
    app.innerHTML = `
      <div id="header-root"></div>
      ${errorHTML}
      ${isMobile ? '' : '<div class="country-align-row"></div>'}
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
      updateDashboard(currentCity);
    }
  };
  if (btnFiveDays) btnFiveDays.onclick = () => {
    if (currentView !== 'fiveDays') {
      currentView = 'fiveDays';
      expandedDate = '';
      showChart = false;
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
        // Toggle chart
        showChart = !showChart;
        updateDashboard(currentCity);
      };
    }
  }
}

async function setCityBackground(city, weatherDesc, countryName) {
  const overlay = document.querySelector('.background-overlay');
  if (!city) {
    document.body.style.backgroundImage = '';
    if (overlay) overlay.style.backgroundImage = '';
    return;
  }
  let imageUrl = await fetchCityscapeImage(city, weatherDesc, countryName);
  if (imageUrl) {
    if (overlay) {
      overlay.style.display = 'block';
      overlay.style.backgroundImage = `url('${imageUrl}')`;
      overlay.style.backgroundSize = 'cover';
      overlay.style.backgroundPosition = 'center';
      overlay.style.backgroundRepeat = 'no-repeat';
      overlay.style.opacity = '0.7';
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
    }
    document.body.style.backgroundImage = '';
  }
}

async function updateDashboard(city) {
  currentCity = city;
  let weatherData = null;
  let forecastData = null;
  errorMessage = '';
  if (city) {
    try {
      weatherData = await fetchCurrentWeather(city);
      forecastData = await fetchFiveDayForecast(city);
      let weatherDesc = weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].main : '';
      let countryName = weatherData && weatherData.sys && weatherData.sys.country ? weatherData.sys.country : '';
      weatherDesc = weatherDesc ? weatherDesc.toLowerCase() : '';
      setCityBackground(city.split(',')[0], weatherDesc, countryName); // Pass weather description for image search
    } catch (err) {
      errorMessage = 'City or country not found. Please try another.';
      renderDashboard(null, null);
      setCityBackground(null, null, null);
      return;
    }
  } else {
    setCityBackground(null, null, null);
  }
  renderDashboard(weatherData, forecastData);
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