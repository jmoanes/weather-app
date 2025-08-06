// Chart logic for 5-day forecast

/**
 * Render a professional SVG line chart for 5-day forecast temperatures
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
      wind: Math.round(noon.wind.speed * 10) / 10,
      pressure: Math.round(noon.main.pressure / 10) * 10
    };
  }).slice(0, 5);
  
  if (daily.length < 2) {
    return `<div class='forecast-chart-section' style='background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:40px 32px;box-shadow:0 12px 40px rgba(0,0,0,0.25),0 6px 20px rgba(0,0,0,0.2);max-width:720px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(10px);'>
      <div style='font-size:1.25rem;font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:12px;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);'>5-Day Weather Analytics</div>
      <div style='color:#fff;opacity:0.75;font-size:1.1rem;text-align:center;margin:32px 0;font-weight:500;letter-spacing:0.3px;'>Insufficient data to generate comprehensive chart.</div>
    </div>`;
  }
  
  // Responsive chart dimensions
  const isMobile = window.innerWidth <= 768;
  const w = isMobile ? 360 : 720;
  const h = isMobile ? 280 : 400;
  const pad = isMobile ? 50 : 70;
  
  // All data arrays
  const temps = daily.map(d => d.temp);
  const humidities = daily.map(d => d.humidity);
  const winds = daily.map(d => d.wind);
  const pressures = daily.map(d => d.pressure);
  
  // Find global min/max for y-axis with better scaling
  const allY = temps.concat(humidities, winds, pressures);
  const minY = Math.floor(Math.min(...allY) * 0.95);
  const maxY = Math.ceil(Math.max(...allY) * 1.05);
  
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
  
  // X axis labels (day names with year)
  const xLabels = daily.map(d => {
    const dt = new Date(d.date);
    const dateYear = dt.getFullYear();
    
    if (isMobile) {
      const dayName = dt.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 3);
      return `${dayName} '${dateYear.toString().slice(-2)}`;
    } else {
      const dayName = dt.toLocaleDateString('en-US', { weekday: 'short' });
      return `${dayName} '${dateYear.toString().slice(-2)}`;
    }
  });
  
  // Y axis ticks
  const yTicks = isMobile ? 5 : 6;
  const yVals = Array.from({length: yTicks}, (_, i) => minY + (i * (maxY - minY) / (yTicks-1)));
  
  // Build SVG
  return `
    <div class="forecast-chart-section" style="background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:${isMobile ? '32px 24px 28px 24px' : '48px 40px 40px 40px'};box-shadow:0 16px 48px rgba(0,0,0,0.3),0 8px 24px rgba(0,0,0,0.25);max-width:100%;width:100%;margin:24px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px);">
      <div style="font-size:${isMobile ? '1.1rem' : '1.3rem'};font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:${isMobile ? '20px' : '24px'};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);">5-Day Weather Analytics</div>
      <div style="display:flex;align-items:center;gap:${isMobile ? '12px' : '16px'};margin-bottom:${isMobile ? '20px' : '24px'};font-size:${isMobile ? '0.75rem' : '0.85rem'};flex-wrap:wrap;justify-content:center;font-weight:600;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);">
        <span style="color:#fff;opacity:0.9;font-size:${isMobile ? '0.7rem' : '0.8rem'};font-weight:700;margin-right:8px;letter-spacing:0.4px;text-transform:uppercase;">Metrics:</span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(255,152,0,0.15);border-radius:8px;border:1px solid rgba(255,152,0,0.3);"><svg width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}"><rect width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}" fill="#ff9800" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${isMobile ? '0.7rem' : '0.8rem'};font-weight:600;letter-spacing:0.2px;">Temperature (°C)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(25,118,210,0.15);border-radius:8px;border:1px solid rgba(25,118,210,0.3);"><svg width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}"><rect width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}" fill="#1976d2" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${isMobile ? '0.7rem' : '0.8rem'};font-weight:600;letter-spacing:0.2px;">Humidity (%)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(255,214,0,0.15);border-radius:8px;border:1px solid rgba(255,214,0,0.3);"><svg width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}"><rect width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}" fill="#ffd600" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${isMobile ? '0.7rem' : '0.8rem'};font-weight:600;letter-spacing:0.2px;">Wind (m/s)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(67,160,71,0.15);border-radius:8px;border:1px solid rgba(67,160,71,0.3);"><svg width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}"><rect width="${isMobile ? '12' : '14'}" height="${isMobile ? '2' : '2.5'}" fill="#43a047" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${isMobile ? '0.7rem' : '0.8rem'};font-weight:600;letter-spacing:0.2px;">Pressure (hPa)</span></span>
      </div>
      <div style="width:100%;overflow-x:auto;">
        <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" class="forecast-chart" style="background:none;max-width:100%;display:block;margin:0 auto;">
          <defs>
            <filter id="chartDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.25"/>
            </filter>
            <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#26334d" stop-opacity="0.1"/>
              <stop offset="50%" stop-color="#202a3a" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#1a2332" stop-opacity="0.12"/>
            </linearGradient>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff9800" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ff5722" stop-opacity="1"/>
            </linearGradient>
            <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1976d2" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#1565c0" stop-opacity="1"/>
            </linearGradient>
            <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffd600" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ffc107" stop-opacity="1"/>
            </linearGradient>
            <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#43a047" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#388e3c" stop-opacity="1"/>
            </linearGradient>
          </defs>
          
          <!-- Background -->
          <rect x="0" y="0" width="${w}" height="${h}" fill="url(#chartBg)" rx="20"/>
          
          <!-- Grid lines -->
          ${yVals.map((v,i) => `<line x1="${pad}" y1="${pad + i*(h-2*pad)/(yTicks-1)}" x2="${w-pad}" y2="${pad + i*(h-2*pad)/(yTicks-1)}" stroke="#fff" stroke-width="0.8" opacity="0.08" />`).join('')}
          ${tempPoints.map((p,i) => `<line x1="${p.x}" y1="${pad}" x2="${p.x}" y2="${h-pad}" stroke="#fff" stroke-width="0.6" opacity="0.06" />`).join('')}
          
          <!-- X and Y axis lines -->
          <line x1="${pad}" y1="${pad}" x2="${w-pad}" y2="${pad}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${h-pad}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          
          <!-- Y axis labels -->
          ${yVals.map((v,i) => `<text x="${pad-24}" y="${pad + i*(h-2*pad)/(yTicks-1) + 3}" text-anchor="end" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${v.toFixed(0)}</text>`).join('')}
          
          <!-- X axis labels -->
          ${tempPoints.map((p,i) => `<text x="${p.x}" y="${h-pad+22}" text-anchor="middle" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${xLabels[i]}</text>`).join('')}
          
          <!-- Temperature line with gradient -->
          <path d="${tempPath}" fill="none" stroke="url(#tempGradient)" stroke-width="${isMobile ? '4' : '5'}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${tempPoints.map(p => `<circle class="chart-point" cx="${p.x}" cy="${p.y}" r="${isMobile ? '6' : '8'}" fill="#26334d" stroke="url(#tempGradient)" stroke-width="3" filter="url(#glowEffect)" style="transition:all 0.2s ease;" />`).join('')}
          
          <!-- Humidity line with gradient -->
          <path d="${humidityPath}" fill="none" stroke="url(#humidityGradient)" stroke-width="${isMobile ? '3' : '4'}" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${humidityPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '5' : '6'}" fill="#26334d" stroke="url(#humidityGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join('')}
          
          <!-- Wind line with gradient -->
          <path d="${windPath}" fill="none" stroke="url(#windGradient)" stroke-width="${isMobile ? '3' : '4'}" stroke-dasharray="3 8" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${windPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '5' : '6'}" fill="#26334d" stroke="url(#windGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join('')}
          
          <!-- Pressure line with gradient -->
          <path d="${pressurePath}" fill="none" stroke="url(#pressureGradient)" stroke-width="${isMobile ? '3' : '4'}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${pressurePoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="${isMobile ? '5' : '6'}" fill="#26334d" stroke="url(#pressureGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join('')}
        </svg>
      </div>
    </div>
  `;
} 