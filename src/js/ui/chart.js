// Chart logic for 5-day forecast

/**
 * Render a simple SVG line chart for 5-day forecast temperatures
 * @param {Object} forecastData - Data from OpenWeatherMap 5-day forecast API   
 * @returns {string} HTML string with SVG chart
 */
export function renderForecastChart(forecastData) {
  if (!forecastData || !forecastData.list) return '';
  
  // Group forecast by day and get 12:00 temp
  const days = {};
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  
  // Use up to 5 days if available, fallback to as many as possible
  const daily = Object.keys(days).map(date => {
    const noon = days[date].find(item => item.dt_txt.includes('12:00:00')) || days[date][0];
    return {
      date,
      temp: Math.round(noon.main.temp),
      humidity: noon.main.humidity,
      wind: noon.wind.speed,
      pressure: noon.main.pressure
    };
  }).slice(0, 5);
  
  if (daily.length < 2) {
    return `<div class='forecast-chart-section' style='background:linear-gradient(135deg,#202a3a 60%,#26334d 100%);border-radius:18px;padding:32px 24px 18px 24px;box-shadow:0 6px 32px rgba(0,0,0,0.22);max-width:640px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;'>
      <div style='font-size:1.18rem;font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;margin-bottom:10px;'>5-Day Temperature Trend</div>
      <div style='color:#fff;opacity:0.7;font-size:1.1rem;text-align:center;margin:32px 0;'>Not enough data to display chart.</div>
    </div>`;
  }
  
  // Responsive chart dimensions
  const isMobile = window.innerWidth <= 768;
  const w = isMobile ? 320 : 640;
  const h = isMobile ? 240 : 320;
  const pad = isMobile ? 40 : 50;
  
  // All data arrays
  const temps = daily.map(d => d.temp);
  const humidities = daily.map(d => d.humidity);
  const winds = daily.map(d => d.wind);
  const pressures = daily.map(d => d.pressure);
  
  // Find global min/max for y-axis
  const allY = temps.concat(humidities, winds, pressures);
  const minY = Math.min(...allY) - 2;
  const maxY = Math.max(...allY) + 2;
  
  // Map all values to y coordinate
  function mapY(val) {
    return pad + ((maxY - val) / (maxY - minY)) * (h - 2 * pad);
  }
  
  // Map x coordinate
  function mapX(i) {
    return pad + i * ((w - 2 * pad) / (daily.length - 1));
  }
  
  // Points for each series
  const tempPoints = temps.map((temp, i) => ({x: mapX(i), y: mapY(temp)}));
  const humidityPoints = humidities.map((humidity, i) => ({x: mapX(i), y: mapY(humidity)}));
  const windPoints = winds.map((wind, i) => ({x: mapX(i), y: mapY(wind)}));
  const pressurePoints = pressures.map((pressure, i) => ({x: mapX(i), y: mapY(pressure)}));
  
  // Smooth path for temperature line
  function getSmoothPath(pts) {
    if (pts.length < 2) return '';
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], curr = pts[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
    }
    return d;
  }
  
  const tempPath = getSmoothPath(tempPoints);
  const humidityPath = getSmoothPath(humidityPoints);
  const windPath = getSmoothPath(windPoints);
  const pressurePath = getSmoothPath(pressurePoints);
  
  // X axis labels (day names)
  const xLabels = daily.map(d => {
    const dt = new Date(d.date);
    return isMobile ? dt.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 3) : dt.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  // Y axis ticks
  const yTicks = isMobile ? 4 : 5;
  const yVals = Array.from({length: yTicks}, (_, i) => minY + (i * (maxY - minY) / (yTicks-1)));
  
  // Build SVG
      return `
      <div class="forecast-chart-section" style="background:linear-gradient(135deg,#1a2332 60%,#202a3a 100%);border-radius:16px;padding:${isMobile ? '24px 16px 20px 16px' : '36px 28px 28px 28px'};box-shadow:0 8px 32px rgba(0,0,0,0.2),0 4px 16px rgba(0,0,0,0.15);max-width:100%;width:100%;margin:16px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.12);">
        <div style="font-size:${isMobile ? '1rem' : '1.1rem'};font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;margin-bottom:${isMobile ? '14px' : '16px'};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">5-Day Temperature Trend</div>
        <div style="display:flex;align-items:center;gap:${isMobile ? '10px' : '12px'};margin-bottom:${isMobile ? '14px' : '16px'};font-size:${isMobile ? '0.4rem' : '0.45rem'};flex-wrap:wrap;justify-content:center;font-weight:500;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:0 6px;">
          <span style="color:#fff;opacity:0.85;font-size:${isMobile ? '0.4rem' : '0.45rem'};font-weight:600;margin-right:3px;letter-spacing:0.2px;">AVERAGE:</span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}"><rect width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}" fill="#ff9800" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${isMobile ? '0.4rem' : '0.45rem'};font-weight:500;letter-spacing:0.1px;">Temperature, C°</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}"><rect width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}" fill="#1976d2" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${isMobile ? '0.4rem' : '0.45rem'};font-weight:500;letter-spacing:0.1px;">Humidity, %</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}"><rect width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}" fill="#ffd600" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${isMobile ? '0.4rem' : '0.45rem'};font-weight:500;letter-spacing:0.1px;">Wind Speed, m/s</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}"><rect width="${isMobile ? '9' : '10'}" height="${isMobile ? '1.3' : '1.4'}" fill="#43a047" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${isMobile ? '0.4rem' : '0.45rem'};font-weight:500;letter-spacing:0.1px;">Atmosphere Pressure, m/m</span></span>
        </div>
      <div style="width:100%;overflow-x:auto;">
        <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" class="forecast-chart" style="background:none;max-width:100%;display:block;margin:0 auto;">
          <defs>
            <filter id="chartDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.18"/>
            </filter>
            <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#26334d" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#202a3a" stop-opacity="0.12"/>
            </linearGradient>
          </defs>
          
          <!-- Background -->
          <rect x="0" y="0" width="${w}" height="${h}" fill="url(#chartBg)" rx="18"/>
          
          <!-- Grid lines -->
          ${yVals.map((v,i) => `<line x1="${pad}" y1="${pad + i*(h-2*pad)/(yTicks-1)}" x2="${w-pad}" y2="${pad + i*(h-2*pad)/(yTicks-1)}" stroke="#fff" stroke-width="0.5" opacity="0.06" />`).join('')}
          ${tempPoints.map((p,i) => `<line x1="${p.x}" y1="${pad}" x2="${p.x}" y2="${h-pad}" stroke="#fff" stroke-width="0.5" opacity="0.04" />`).join('')}
          
          <!-- X and Y axis lines -->
          <line x1="${pad}" y1="${pad}" x2="${w-pad}" y2="${pad}" stroke="#fff" stroke-width="0.8" opacity="0.15" />
          <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h-pad}" stroke="#fff" stroke-width="0.8" opacity="0.15" />
          
          <!-- Y axis labels -->
          ${yVals.map((v,i) => `<text x="${pad-18}" y="${pad + i*(h-2*pad)/(yTicks-1) + 2}" text-anchor="end" font-size="${isMobile ? '0.55' : '0.6'}" font-weight="500" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#1a1a1a" stroke-width="0.06" letter-spacing="0.15">${v.toFixed(1)}</text>`).join('')}
          
          <!-- X axis labels -->
          ${tempPoints.map((p,i) => `<text x="${p.x}" y="${h-pad+18}" text-anchor="middle" font-size="${isMobile ? '0.55' : '0.6'}" font-weight="500" fill="#fff" opacity="0.85" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#1a1a1a" stroke-width="0.06" letter-spacing="0.15">${xLabels[i]}</text>`).join('')}
          
          <!-- Temperature line -->
          <path d="${tempPath}" fill="none" stroke="#ff9800" stroke-width="${isMobile ? '3' : '3.5'}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${tempPoints.map(p => `<circle class="chart-point" cx="${p.x}" cy="${p.y}" r="${isMobile ? '5' : '6'}" fill="#26334d" stroke="#ff9800" stroke-width="2.5" filter="url(#chartDropShadow)" style="transition:all 0.18s;" />`).join('')}
          
          <!-- Humidity line -->
          <path d="${humidityPath}" fill="none" stroke="#1976d2" stroke-width="${isMobile ? '2' : '2.5'}" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${humidityPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '4' : '5'}" fill="#26334d" stroke="#1976d2" stroke-width="2" filter="url(#chartDropShadow)" />`).join('')}
          
          <!-- Wind line -->
          <path d="${windPath}" fill="none" stroke="#ffd600" stroke-width="${isMobile ? '2' : '2.5'}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${windPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '4' : '5'}" fill="#26334d" stroke="#ffd600" stroke-width="2" filter="url(#chartDropShadow)" />`).join('')}
          
          <!-- Pressure line -->
          <path d="${pressurePath}" fill="none" stroke="#43a047" stroke-width="${isMobile ? '2' : '2.5'}" stroke-dasharray="1 5" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${pressurePoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '4' : '5'}" fill="#26334d" stroke="#43a047" stroke-width="2" filter="url(#chartDropShadow)" />`).join('')}
        </svg>
      </div>
    </div>
  `;
} 