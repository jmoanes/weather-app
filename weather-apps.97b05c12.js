let e=["Kyiv","Paris","Vinnytsia","Warsaw"],t="Kyiv",a=!1,i=[];function n(n){let d=`
    <header class="header">
      
      <div class="header-searchbar">
        <div class="search-input-wrapper">
          <span class="searchbar-icon-inside">\u{1F50D}</span>
          <input type="text" class="search-input-rounded" placeholder="Search for a city..." id="city-search">
          <button class="search-btn-inside" id="search-btn">
            <span class="search-icon">\u{2B50}</span>
          </button>
        </div>
      </div>
      
      <div class="header-cities-chips-container">
        <button class="scroll-arrow scroll-left" id="scroll-left">\u{2039}</button>
        <div class="header-cities-chips-scroll">
          <div class="header-cities-chips" id="cities-chips">
            ${e.map(e=>`
              <button class="header-city-chip ${e===t?"selected":""}" data-city="${e}">
                ${e}
                <span class="chip-close" data-city="${e}">\xd7</span>
              </button>
            `).join("")}
          </div>
        </div>
        <button class="scroll-arrow scroll-right" id="scroll-right">\u{203A}</button>
        <button class="next-move-arrow" id="next-move-arrow" style="display: none;" title="Next city">\u{2192}</button>
      </div>
    </header>
  `,c=document.querySelector(".header-searchbar-root");c||((c=document.createElement("div")).className="header-searchbar-root",document.body.insertBefore(c,document.body.firstChild)),c.innerHTML=d,function(n){let d=document.getElementById("city-search"),c=document.getElementById("search-btn"),p=document.getElementById("cities-chips"),u=document.getElementById("scroll-left"),h=document.getElementById("scroll-right"),y=document.getElementById("next-move-arrow");d&&d.addEventListener("keypress",e=>{if("Enter"===e.key){let e=d.value.trim();e&&s(e,n,!0)}}),c&&c.addEventListener("click",()=>{let e=d.value.trim();e&&s(e,n,!0)}),y&&y.addEventListener("click",()=>{if(i.length>0)return void function(){let t=document.getElementById("cities-chips");if(t&&i.length>0){let a=t.querySelector(".hidden-chip");if(a){let t=a.dataset.city;a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),setTimeout(()=>{a.classList.add("revealing"),setTimeout(()=>{i=i.filter(e=>e!==t),e.includes(t)||e.push(t),r(),o()},500)},300)}}}();let a=(e.indexOf(t)+1)%e.length;s(e[a],n)}),p&&p.addEventListener("click",l=>{var d;l.target.classList.contains("header-city-chip")?s(l.target.dataset.city,n):l.target.classList.contains("chip-close")&&(d=l.target.dataset.city,e=e.filter(e=>e!==d),i=i.filter(e=>e!==d),t===d&&(t=e[0]||"Kyiv"),r(),e.length<=1&&0===i.length&&(a=!1),o())}),u&&u.addEventListener("click",()=>{p.scrollBy({left:-200,behavior:"smooth"})}),h&&h.addEventListener("click",()=>{p.scrollBy({left:200,behavior:"smooth"})}),l(),p.addEventListener("scroll",l),o()}(n)}function s(n,l,d=!1){t=n,e.includes(n)||i.includes(n)?e.includes(n)&&((e=e.filter(e=>e!==n)).unshift(n),r()):d?(i.push(n),a=!0,r(),o()):(e.unshift(n),e.length>10&&e.pop(),r());let c=document.getElementById("city-search");c&&(c.value=""),l&&l(n)}function r(){let a=document.getElementById("cities-chips");a&&(a.innerHTML=[...e.map(e=>`
      <button class="header-city-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `),...i.map(e=>`
      <button class="header-city-chip hidden-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `)].join(""))}function o(){let t=document.getElementById("next-move-arrow");if(t){let n=i.length>0||a&&e.length>1;t.style.display=n?"flex":"none",i.length>0?(t.classList.add("has-hidden"),t.title=`Scroll to reveal hidden cities (${i.length} hidden)`):(t.classList.remove("has-hidden"),t.title="Next city")}}function l(){let e=document.getElementById("cities-chips"),t=document.getElementById("scroll-left"),a=document.getElementById("scroll-right");if(e&&t&&a){let i=e.scrollLeft<=0,n=e.scrollLeft>=e.scrollWidth-e.clientWidth;t.style.display=i?"none":"flex",a.style.display=n?"none":"flex"}}const d="ccac33176c75e16a3b3c977b0ca6365c",c="https://api.openweathermap.org/data/2.5/";async function p(e){let t=`${c}weather?q=${encodeURIComponent(e)}&appid=${d}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function u(e){let t=`${c}forecast?q=${encodeURIComponent(e)}&appid=${d}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function h(e,t,a){for(let i of[`${e} ${a||""} ${t||""} cityscape skyline`.trim(),`${e} ${a||""} cityscape skyline`.trim(),`${e} ${t||""} cityscape`.trim(),`${e} cityscape skyline`,`${e} city`]){if(!i.trim())continue;let e=`https://pixabay.com/api/?key=51325887-dff4e6da46d9f05f769d357a1&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&category=places&per_page=5&safesearch=true&min_width=1200&min_height=800`;try{let t=await fetch(e);if(!t.ok)continue;let a=await t.json();if(a.hits&&a.hits.length>0){let e=a.hits.find(e=>e.largeImageURL&&e.imageWidth>=1200&&e.imageHeight>=800)||a.hits[0];return e.largeImageURL||e.webformatURL}}catch(e){continue}}return null}const y=[{text:"Wherever you go, no matter what the weather, always bring your own sunshine.",author:"Anthony J. D'Angelo"},{text:"Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",author:"John Ruskin"},{text:"There is no such thing as bad weather, only different kinds of good weather.",author:"John Ruskin"},{text:"Some people feel the rain. Others just get wet.",author:"Bob Marley"},{text:"To appreciate the beauty of a snowflake it is necessary to stand out in the cold.",author:"Aristotle"},{text:"Climate is what we expect, weather is what we get.",author:"Mark Twain"},{text:"The sound of the rain needs no translation.",author:"Alan Watts"}];let m="",f="today",g=!1,x=!1,v="";function w(e,t){let a="",i="";"today"===f?e?(a=function(e){if(!e)return'<div class="error">No weather data available.</div>';let{name:t,main:a,weather:i,sys:n}=e,s=Math.round(a.temp),r=Math.round(a.temp_min),o=Math.round(a.temp_max),l=i[0].description,d=i[0].icon,c=n&&n.country?n.country:"",p={TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand"}[c]||c,u=window.innerWidth<=768;return`
    <section class="today-weather-card">
      <div class="weather-card-overlay">
        <div class="weather-card-header">
          <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;">
            <span class="weather-city">${t}</span>
            ${p?`<span style="font-size:${u?"0.85rem":"0.95rem"};color:#ffd54f;font-weight:500;opacity:0.9;letter-spacing:0.3px;">${p}</span>`:""}
          </div>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${d}@2x.png" alt="${l}" />
        </div>
        <div class="weather-temp-main">${s}&deg;C</div>
        <div class="weather-minmax">min <b>${r}&deg;</b> &nbsp; max <b>${o}&deg;</b></div>
        <div class="weather-desc">${l}</div>
      </div>
    </section>
  `}(e),i=`
        <div id="nav-buttons">
          <button id="btn-today" class="nav-btn active">TODAY</button>
          <button id="btn-five-days" class="nav-btn">5 DAYS</button>
        </div>
      `):(a=`<section class="today-weather-card"><div class="weather-card-overlay"><div class="weather-card-header"><span class="weather-city">Select a city</span></div><div class="weather-temp-main">--\xb0C</div><div class="weather-minmax">min --\xb0 / max --\xb0</div></div></section>`,i=""):(a="",i=`
      <div id="nav-buttons">
        <button id="btn-today" class="nav-btn">TODAY</button>
        <button id="btn-five-days" class="nav-btn active">5 DAYS</button>
      </div>
    `);let s="";if("today"===f)s=e?"":'<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the weather.</div></div>';else if("fiveDays"===f)if(t){let a="";if(e&&e.sys&&e.sys.country){let t=e.sys.country;a=({TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand",VN:"Vietnam",SG:"Singapore",MY:"Malaysia",ID:"Indonesia",PH:"Philippines",TR:"Turkey",SA:"Saudi Arabia",AE:"United Arab Emirates",EG:"Egypt",ZA:"South Africa",NG:"Nigeria",KE:"Kenya",MA:"Morocco",TN:"Tunisia",DZ:"Algeria",LY:"Libya",SD:"Sudan",ET:"Ethiopia",GH:"Ghana",CI:"Ivory Coast",SN:"Senegal",ML:"Mali",BF:"Burkina Faso",NE:"Niger",TD:"Chad",CF:"Central African Republic",CM:"Cameroon",GQ:"Equatorial Guinea",GA:"Gabon",CG:"Republic of the Congo",CD:"Democratic Republic of the Congo",AO:"Angola",ZM:"Zambia",ZW:"Zimbabwe",BW:"Botswana",NA:"Namibia",SZ:"Eswatini",LS:"Lesotho",MG:"Madagascar",MU:"Mauritius",SC:"Seychelles",KM:"Comoros",DJ:"Djibouti",SO:"Somalia",ER:"Eritrea",SS:"South Sudan",RW:"Rwanda",BI:"Burundi",TZ:"Tanzania",UG:"Uganda",MZ:"Mozambique",MW:"Malawi"})[t]||t}s=function(e,t=!1,a=!1,i="",n=""){if(!e||!e.list)return'<div class="error">No forecast data available.</div>';let s={};e.list.forEach(e=>{let t=e.dt_txt.split(" ")[0];s[t]||(s[t]=[]),s[t].push(e)});let r=Object.keys(s).map(e=>{let t=s[e].find(e=>e.dt_txt.includes("12:00:00"))||s[e][0],a=s[e].map(e=>e.main.temp),i=Math.round(Math.min(...a)),n=Math.round(Math.max(...a));return{date:e,...t,min:i,max:n,all:s[e]}}).slice(0,5);r=r.sort((e,t)=>{let a=e=>new Date(e).getDay(),i=a(e.date),n=a(t.date);return 0===i&&0!==n?-1:0!==i&&0===n?1:i-n});let o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=i?`
    <div class="forecast-location-header" style="text-align:center; margin-bottom:24px; padding:0 16px;">
      <div class="forecast-city-name" style="font-size:1.4rem; font-weight:700; color:#fff; margin-bottom:4px; letter-spacing:0.5px;">${i}</div>
      ${n?`<div class="forecast-country-name" style="font-size:1rem; color:#ffd54f; font-weight:500; opacity:0.9; letter-spacing:0.3px;">${n}</div>`:""}
    </div>
  `:"";return`
    <section class="five-days-forecast">
      ${l}
      <div class="forecast-cards">
        ${r.map((e,a)=>{e.main.temp;let i=e.weather[0].description,n=e.weather[0].icon,s=new Date(e.date),r=o[s.getDay()],l=s.toDateString()===new Date().toDateString();return`
            <div class="forecast-card" data-date="${e.date}" data-expanded="${t}">
              <div class="forecast-day${l?" today":""}">${r}</div>
              <div class="forecast-date">${e.date.slice(8,10)} ${s.toLocaleString("default",{month:"short"})}</div>
              <img src="https://openweathermap.org/img/wn/${n}@2x.png" alt="${i}" />
              <div class="forecast-minmax">min <span>${e.min}&deg;</span><span class="minmax-divider"></span>max <span>${e.max}&deg;</span></div>
              <div class="forecast-desc">${i}</div>
              <button class="more-info-btn" data-date="${e.date}">${t?"Hide Info":"more info"}</button>
              ${t?`<div class="more-info-section" style="align-self: flex-start;">${e.all.slice(0,7).map(e=>`
                <div class='more-info-mini-card'>
                  <div class='mini-time'>${e.dt_txt.slice(11,16)}</div>
                  <img class='mini-icon' src='https://openweathermap.org/img/wn/${e.weather[0].icon}.png' alt='' />
                  <div class='mini-temp'>${Math.round(e.main.temp)}&deg;</div>
                  <div class='mini-detail'>\u{1F321}\u{FE0F} ${e.main.pressure} mm</div>
                  <div class='mini-detail'>\u{1F4A7} ${e.main.humidity}%</div>
                  <div class='mini-detail'>\u{1F4A8} ${Math.round(e.wind.speed)} m/s</div>
                </div>
              `).join("")}</div>`:""}
            </div>
          `}).join("")}
      </div>
      <div class="show-chart-btn-container">
        <button id="show-chart-btn" class="nav-btn">
          <span class="chart-btn-text">${a?"Hide Chart":"Show Chart"}</span>
          <span class="chart-btn-icon">${a?"\uD83D\uDCC9":"\uD83D\uDCC8"}</span>
        </button>
      </div>
    </section> 
  `}(t,g,x,m,a),x&&(s+=function(e){if(!e||!e.list)return"";let t={};e.list.forEach(e=>{let a=e.dt_txt.split(" ")[0];t[a]||(t[a]=[]),t[a].push(e)});let a=Object.keys(t).map(e=>{let a=t[e].find(e=>e.dt_txt.includes("12:00:00"))||t[e][0];return{date:e,temp:Math.round(a.main.temp),humidity:a.main.humidity,wind:Math.round(10*a.wind.speed)/10,pressure:10*Math.round(a.main.pressure/10)}}).slice(0,5);if(a.length<2)return`<div class='forecast-chart-section' style='background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:40px 32px;box-shadow:0 12px 40px rgba(0,0,0,0.25),0 6px 20px rgba(0,0,0,0.2);max-width:720px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(10px);'>
      <div style='font-size:1.25rem;font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:12px;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);'>5-Day Weather Analytics</div>
      <div style='color:#fff;opacity:0.75;font-size:1.1rem;text-align:center;margin:32px 0;font-weight:500;letter-spacing:0.3px;'>Insufficient data to generate comprehensive chart.</div>
    </div>`;let i=window.innerWidth<=768,n=i?360:720,s=i?280:400,r=i?50:70,o=a.map(e=>e.temp),l=a.map(e=>e.humidity),d=a.map(e=>e.wind),c=a.map(e=>e.pressure),p=o.concat(l,d,c),u=Math.floor(.95*Math.min(...p)),h=Math.ceil(1.05*Math.max(...p));function y(e){return r+(h-e)/(h-u)*(s-2*r)}function m(e){return r+e*((n-2*r)/(a.length-1))}let f=o.map((e,t)=>({x:m(t),y:y(e)})),g=l.map((e,t)=>({x:m(t),y:y(e)})),x=d.map((e,t)=>({x:m(t),y:y(e)})),v=c.map((e,t)=>({x:m(t),y:y(e)}));function w(e){if(e.length<2)return"";let t=`M${e[0].x},${e[0].y}`;for(let a=1;a<e.length;a++){let i=e[a-1],n=e[a],s=(i.x+n.x)/2;t+=` C${s},${i.y} ${s},${n.y} ${n.x},${n.y}`}return t}let b=w(f),$=w(g),k=w(x),S=w(v),E=a.map(e=>{let t=new Date(e.date),a=t.getFullYear();if(i){let e=t.toLocaleDateString("en-US",{weekday:"short"}).substring(0,3);return`${e} '${a.toString().slice(-2)}`}{let e=t.toLocaleDateString("en-US",{weekday:"short"});return`${e} '${a.toString().slice(-2)}`}}),I=i?5:6,M=Array.from({length:I},(e,t)=>u+t*(h-u)/(I-1));return`
    <div class="forecast-chart-section" style="background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:${i?"32px 24px 28px 24px":"48px 40px 40px 40px"};box-shadow:0 16px 48px rgba(0,0,0,0.3),0 8px 24px rgba(0,0,0,0.25);max-width:100%;width:100%;margin:24px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px);">
      <div style="font-size:${i?"1.1rem":"1.3rem"};font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:${i?"20px":"24px"};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);">5-Day Weather Analytics</div>
      <div style="display:flex;align-items:center;gap:${i?"12px":"16px"};margin-bottom:${i?"20px":"24px"};font-size:${i?"0.75rem":"0.85rem"};flex-wrap:wrap;justify-content:center;font-weight:600;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);">
        <span style="color:#fff;opacity:0.9;font-size:${i?"0.7rem":"0.8rem"};font-weight:700;margin-right:8px;letter-spacing:0.4px;text-transform:uppercase;">Metrics:</span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(255,152,0,0.15);border-radius:8px;border:1px solid rgba(255,152,0,0.3);"><svg width="${i?"12":"14"}" height="${i?"2":"2.5"}"><rect width="${i?"12":"14"}" height="${i?"2":"2.5"}" fill="#ff9800" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${i?"0.7rem":"0.8rem"};font-weight:600;letter-spacing:0.2px;">Temperature (\xb0C)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(25,118,210,0.15);border-radius:8px;border:1px solid rgba(25,118,210,0.3);"><svg width="${i?"12":"14"}" height="${i?"2":"2.5"}"><rect width="${i?"12":"14"}" height="${i?"2":"2.5"}" fill="#1976d2" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${i?"0.7rem":"0.8rem"};font-weight:600;letter-spacing:0.2px;">Humidity (%)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(255,214,0,0.15);border-radius:8px;border:1px solid rgba(255,214,0,0.3);"><svg width="${i?"12":"14"}" height="${i?"2":"2.5"}"><rect width="${i?"12":"14"}" height="${i?"2":"2.5"}" fill="#ffd600" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${i?"0.7rem":"0.8rem"};font-weight:600;letter-spacing:0.2px;">Wind (m/s)</span></span>
        <span style="display:flex;align-items:center;margin:0 4px;padding:6px 12px;background:rgba(67,160,71,0.15);border-radius:8px;border:1px solid rgba(67,160,71,0.3);"><svg width="${i?"12":"14"}" height="${i?"2":"2.5"}"><rect width="${i?"12":"14"}" height="${i?"2":"2.5"}" fill="#43a047" rx="1"/></svg> <span style="color:#fff;margin-left:6px;font-size:${i?"0.7rem":"0.8rem"};font-weight:600;letter-spacing:0.2px;">Pressure (hPa)</span></span>
      </div>
      <div style="width:100%;overflow-x:auto;">
        <svg width="100%" height="${s}" viewBox="0 0 ${n} ${s}" class="forecast-chart" style="background:none;max-width:100%;display:block;margin:0 auto;">
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
          <rect x="0" y="0" width="${n}" height="${s}" fill="url(#chartBg)" rx="20"/>
          
          <!-- Grid lines -->
          ${M.map((e,t)=>`<line x1="${r}" y1="${r+t*(s-2*r)/(I-1)}" x2="${n-r}" y2="${r+t*(s-2*r)/(I-1)}" stroke="#fff" stroke-width="0.8" opacity="0.08" />`).join("")}
          ${f.map((e,t)=>`<line x1="${e.x}" y1="${r}" x2="${e.x}" y2="${s-r}" stroke="#fff" stroke-width="0.6" opacity="0.06" />`).join("")}
          
          <!-- X and Y axis lines -->
          <line x1="${r}" y1="${r}" x2="${n-r}" y2="${r}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          <line x1="${r}" y1="${r}" x2="${r}" y2="${s-r}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          
          <!-- Y axis labels -->
          ${M.map((e,t)=>`<text x="${r-24}" y="${r+t*(s-2*r)/(I-1)+3}" text-anchor="end" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${e.toFixed(0)}</text>`).join("")}
          
          <!-- X axis labels -->
          ${f.map((e,t)=>`<text x="${e.x}" y="${s-r+22}" text-anchor="middle" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${E[t]}</text>`).join("")}
          
          <!-- Temperature line with gradient -->
          <path d="${b}" fill="none" stroke="url(#tempGradient)" stroke-width="${i?"4":"5"}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${f.map(e=>`<circle class="chart-point" cx="${e.x}" cy="${e.y}" r="${i?"6":"8"}" fill="#26334d" stroke="url(#tempGradient)" stroke-width="3" filter="url(#glowEffect)" style="transition:all 0.2s ease;" />`).join("")}
          
          <!-- Humidity line with gradient -->
          <path d="${$}" fill="none" stroke="url(#humidityGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${g.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#humidityGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Wind line with gradient -->
          <path d="${k}" fill="none" stroke="url(#windGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="3 8" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${x.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#windGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Pressure line with gradient -->
          <path d="${S}" fill="none" stroke="url(#pressureGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${v.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#pressureGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
        </svg>
      </div>
    </div>
  `}(t))}else s='<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the forecast.</div></div>';let r="";if(e){let t=new Date,a=t.toLocaleString("en-US",{weekday:"short"}),i=t.getDate(),n=t.toLocaleString("en-US",{month:"long"}),s=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),o="",l="";e.sys&&e.sys.sunrise&&e.sys.sunset&&(o=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),l=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),r=`
      <div class="date-time-section">
        <div class="date-big"><span class="date-num">${i}<sup>th</sup></span> <span class="date-day">${a}</span></div>
        <div class="date-month">${n}</div>
        <div class="date-time-row">
          <span class="date-time-clock">${s}</span>
          <span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>${o}</span>
          <span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>${l}</span>
        </div>
      </div>
    `}else r=`<div class="date-time-section"><div class="date-big"><span class="date-num">--<sup>th</sup></span> <span class="date-day">---</span></div><div class="date-month">------</div><div class="date-time-row"><span class="date-time-clock">--:--</span><span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>--:--</span><span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>--:--</span></div></div>`;let o=function(){let e=y[Math.floor(Math.random()*y.length)];return`<div class="quote-section">\u{201C}${e.text}\u{201D}<br><span class="quote-author">\u{2014} ${e.author}</span></div>`}(),l=document.getElementById("app");window.innerWidth,"fiveDays"===f?l.innerHTML=`
      <div id="header-root"></div>
      ${i}
      ${s}
    `:l.innerHTML=`
      <div id="header-root"></div>
      <div class="weather-right-group">
        ${a}
        ${i}
      </div>
      ${s}
      ${"today"===f?r:""}
      ${"today"===f?o:""}
    `;let d=document.querySelector(".today-weather-card"),c=document.getElementById("nav-buttons");"today"===f?(d&&d.classList.add("right-align"),c&&c.classList.add("right-align")):(d&&d.classList.remove("right-align"),c&&c.classList.remove("right-align")),n(async e=>{f="today",x=!1,await $(e)});let p=document.getElementById("header-root");p||((p=document.createElement("div")).id="header-root",document.querySelector(".header-searchbar-root").appendChild(p));let u=document.getElementById("btn-today"),h=document.getElementById("btn-five-days");if(u&&(u.onclick=()=>{"today"!==f&&(f="today",x=!1,$(m))}),h&&(h.onclick=()=>{"fiveDays"!==f&&(f="fiveDays",x=!1,$(m))}),"fiveDays"===f&&t){document.querySelectorAll(".more-info-btn").forEach(e=>{e.onclick=e=>{g=!g,$(m)}});let e=document.getElementById("show-chart-btn");e&&(e.onclick=t=>{let a=document.createElement("span");a.className="ripple";let i=e.getBoundingClientRect();a.style.width=a.style.height=Math.max(i.width,i.height)+"px",a.style.left=t.clientX-i.left-i.width/2+"px",a.style.top=t.clientY-i.top-i.height/2+"px",e.appendChild(a),setTimeout(()=>a.remove(),600),x=!x,$(m)})}}async function b(e,t,a){let i=document.querySelector(".background-overlay");if(!e){document.body.style.backgroundImage="",i&&(i.style.backgroundImage="",i.style.opacity="0");return}i&&(i.style.opacity="0.3",i.style.transition="opacity 0.5s ease-in-out");let n=await h(e,t,a);n?i?(i.style.display="block",i.style.backgroundImage=`url('${n}')`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.style.backgroundRepeat="no-repeat",i.style.opacity="0.6",i.style.transition="opacity 0.8s ease-in-out"):(document.body.style.backgroundImage=`url('${n}')`,document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat"):(i&&(i.style.display="none",i.style.backgroundImage="",i.style.opacity="0"),document.body.style.backgroundImage="")}async function $(e){m=e;let t=null,a=null;if(v="",k(!0),e)try{t=await p(e),a=await u(e);let i=t&&t.weather&&t.weather[0]?t.weather[0].main:"",n=t&&t.sys&&t.sys.country?t.sys.country:"";i=i?i.toLowerCase():"",b(e.split(",")[0],i,n)}catch(e){v="City or country not found. Please try another.",w(null,null),b(null,null,null),k(!1),function(e){let t=document.querySelector(".error-message-overlay");t&&t.remove();let a=document.createElement("div");a.className="error-message-overlay",a.innerHTML=`
    <div class="error-message-content">
      <div class="error-icon">\u{26A0}\u{FE0F}</div>
      <div class="error-text">${e}</div>
    </div>
  `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&(a.style.opacity="0",a.style.transform="translateY(-20px)",setTimeout(()=>{a.parentNode&&a.remove()},300))},3e3)}(v);return}else b(null,null,null);k(!1),w(t,a)}function k(e){let t=document.querySelector(".loading-overlay");e?(t||(t=function(){let e=document.createElement("div");return e.className="loading-overlay",e.innerHTML=`
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Searching weather data...</div>
    </div>
  `,document.body.appendChild(e),e}()),t.style.display="flex"):t&&(t.style.display="none")}window.addEventListener("DOMContentLoaded",()=>{$("Kyiv,UA"),n(async e=>{f="today",x=!1,await $(e)})});
//# sourceMappingURL=weather-apps.97b05c12.js.map
