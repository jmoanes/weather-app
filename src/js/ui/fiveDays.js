// Five Days UI logic
// Renders 5-day weather forecast for a city

/**
 * Render 5-day forecast section with expandable 'More Info' per day
 * @param {Object} forecastData - Data from OpenWeatherMap 5-day forecast API
 * @param {boolean} allExpanded - Whether all cards should be expanded
 * @param {boolean} showChart - Whether to show chart button
 * @param {string} cityName - The city name
 * @param {string} countryName - The country name
 * @returns {string} HTML string
 */
export function renderFiveDayForecast(forecastData, allExpanded = false, showChart = false, cityName = '', countryName = '') {
  if (!forecastData || !forecastData.list) return '<div class="error">No forecast data available.</div>';
  // Group forecast by day
  const days = {};
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  // Get one forecast per day (e.g., 12:00)
  let daily = Object.keys(days).map(date => {
    const noon = days[date].find(item => item.dt_txt.includes('12:00:00')) || days[date][0];
    // Find min/max for the day
    const temps = days[date].map(i => i.main.temp);
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));
    return { date, ...noon, min, max, all: days[date] };
  }).slice(0, 5);

  // Sort so Sunday is always first
  daily = daily.sort((a, b) => {
    const getDayIdx = date => new Date(date).getDay();
    const aIdx = getDayIdx(a.date);
    const bIdx = getDayIdx(b.date);
    if (aIdx === 0 && bIdx !== 0) return -1;
    if (aIdx !== 0 && bIdx === 0) return 1; 
    return aIdx - bIdx;
  });

  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
  // Create location header
  const locationHeader = cityName ? `
    <div class="forecast-location-header" style="text-align:center; margin-bottom:24px; padding:0 16px;">
      <div class="forecast-city-name" style="font-size:1.4rem; font-weight:700; color:#fff; margin-bottom:4px; letter-spacing:0.5px;">${cityName}</div>
      ${countryName ? `<div class="forecast-country-name" style="font-size:1rem; color:#ffd54f; font-weight:500; opacity:0.9; letter-spacing:0.3px;">${countryName}</div>` : ''}
    </div>
  ` : '';
  
  return `
    <section class="five-days-forecast">
      ${locationHeader}
      <div class="forecast-cards">
        ${daily.map((day, idx) => {
          const temp = Math.round(day.main.temp);
          const desc = day.weather[0].description;
          const icon = day.weather[0].icon;
          const isExpanded = allExpanded;
          // Get day name and highlight if today
          const d = new Date(day.date);
          const dayName = dayNames[d.getDay()];
          const isToday = d.toDateString() === (new Date()).toDateString();
          return `
            <div class="forecast-card" data-date="${day.date}" data-expanded="${isExpanded}">
              <div class="forecast-day${isToday ? ' today' : ''}">${dayName}</div>
              <div class="forecast-date">${day.date.slice(8,10)} ${d.toLocaleString('default', { month: 'short' })}</div>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
              <div class="forecast-minmax">min <span>${day.min}&deg;</span><span class="minmax-divider"></span>max <span>${day.max}&deg;</span></div>
              <div class="forecast-desc">${desc}</div>
              <button class="more-info-btn" data-date="${day.date}">${isExpanded ? 'Hide Info' : 'more info'}</button>
              ${isExpanded ? `<div class="more-info-section" style="align-self: flex-start;">${day.all.slice(0, 7).map(item => `
                <div class='more-info-mini-card'>
                  <div class='mini-time'>${item.dt_txt.slice(11,16)}</div>
                  <img class='mini-icon' src='https://openweathermap.org/img/wn/${item.weather[0].icon}.png' alt='' />
                  <div class='mini-temp'>${Math.round(item.main.temp)}&deg;</div>
                  <div class='mini-detail'>🌡️ ${item.main.pressure} mm</div>
                  <div class='mini-detail'>💧 ${item.main.humidity}%</div>
                  <div class='mini-detail'>💨 ${Math.round(item.wind.speed)} m/s</div>
                </div>
              `).join('')}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
      <div class="show-chart-btn-container">
        <button id="show-chart-btn" class="nav-btn">
          <span class="chart-btn-text">${showChart ? 'Hide Chart' : 'Show Chart'}</span>
          <span class="chart-btn-icon">${showChart ? '📉' : '📈'}</span>
        </button>
      </div>
    </section> 
  `;
} 

