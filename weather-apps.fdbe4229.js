let e=[],t=null;function a(a){t=a;let i=document.getElementById("header-root");i||((i=document.createElement("div")).id="header-root",document.getElementById("app").prepend(i)),function a(i="",n=""){let s=`
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
      ${i?`<div class="header-current-city" style="text-align:center;font-size:1.2em;font-weight:bold;margin:8px 0 0 0;">${i}</div>`:""}
      <div style="height: 10px;"></div>
      <div class="header-cities-chips-scroll"><div class="header-cities-chips" id="header-cities">
        ${e.map(e=>`
          <span class="header-city-chip${e===i?" selected":""}" data-city="${e}">${e} <span class="chip-close">&times;</span></span>
        `).join("")}
      </div></div>
    </header>
  `;document.getElementById("header-root").innerHTML=s,document.getElementById("city-search-btn").onclick=()=>{let i=document.getElementById("city-search-input").value.trim();i&&!e.includes(i)&&(e.unshift(i),e.length>2&&e.pop()),t&&t(i),a(i,n)},document.getElementById("city-search-input").addEventListener("keydown",function(e){"Enter"===e.key&&document.getElementById("city-search-btn").click()}),document.querySelectorAll(".header-city-chip").forEach(s=>{s.onclick=r=>{if(r.target.classList.contains("chip-close")){let t=s.getAttribute("data-city");e=e.filter(e=>e!==t),a(i,n);return}let o=s.getAttribute("data-city");t&&t(o),a(o,n)}})}()}const i="ccac33176c75e16a3b3c977b0ca6365c",n="https://api.openweathermap.org/data/2.5/";async function s(e){let t=`${n}weather?q=${encodeURIComponent(e)}&appid=${i}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function r(e){let t=`${n}forecast?q=${encodeURIComponent(e)}&appid=${i}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function o(e,t,a){let i;i=a?`${e} ${a} cityscape`:`${e} cityscape`,t&&(i=`${e} ${a||""} ${t} cityscape`);let n=`https://pixabay.com/api/?key=51325887-dff4e6da46d9f05f769d357a1&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&category=places&per_page=3&safesearch=true`;try{let e=await fetch(n);if(!e.ok)return null;let t=await e.json();if(t.hits&&t.hits.length>0)return t.hits[0].largeImageURL||t.hits[0].webformatURL;return null}catch(e){return null}}const d=[{text:"Wherever you go, no matter what the weather, always bring your own sunshine.",author:"Anthony J. D'Angelo"},{text:"Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",author:"John Ruskin"},{text:"There is no such thing as bad weather, only different kinds of good weather.",author:"John Ruskin"},{text:"Some people feel the rain. Others just get wet.",author:"Bob Marley"},{text:"To appreciate the beauty of a snowflake it is necessary to stand out in the cold.",author:"Aristotle"},{text:"Climate is what we expect, weather is what we get.",author:"Mark Twain"},{text:"The sound of the rain needs no translation.",author:"Alan Watts"}];let l="",c="today",p=!1,h=!1,u="";function m(e,t){let i="";u&&(i=`<div class="error-notification">${u}</div>`);let n="",s="";"today"===c?e?(n=function(e){if(!e)return'<div class="error">No weather data available.</div>';let{name:t,main:a,weather:i,sys:n}=e,s=Math.round(a.temp),r=Math.round(a.temp_min),o=Math.round(a.temp_max),d=i[0].description,l=i[0].icon,c=n&&n.country?n.country:"",p={TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand"}[c]||c,h=window.innerWidth<=768;return`
    <section class="today-weather-card">
      <div class="weather-card-overlay">
        <div class="weather-card-header">
          <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;">
            <span class="weather-city">${t}</span>
            ${p?`<span style="font-size:${h?"0.85rem":"0.95rem"};color:#ffd54f;font-weight:500;opacity:0.9;letter-spacing:0.3px;">${p}</span>`:""}
          </div>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${l}@2x.png" alt="${d}" />
        </div>
        <div class="weather-temp-main">${s}&deg;C</div>
        <div class="weather-minmax">min <b>${r}&deg;</b> &nbsp; max <b>${o}&deg;</b></div>
        <div class="weather-desc">${d}</div>
      </div>
    </section>
  `}(e),s=`
        <div id="nav-buttons">
          <button id="btn-today" class="nav-btn active">TODAY</button>
          <button id="btn-five-days" class="nav-btn">5 DAYS</button>
        </div>
      `):(n=`<section class="today-weather-card"><div class="weather-card-overlay"><div class="weather-card-header"><span class="weather-city">Select a city</span></div><div class="weather-temp-main">--\xb0C</div><div class="weather-minmax">min --\xb0 / max --\xb0</div></div></section>`,s=""):(n="",s=`
      <div id="nav-buttons">
        <button id="btn-today" class="nav-btn">TODAY</button>
        <button id="btn-five-days" class="nav-btn active">5 DAYS</button>
      </div>
    `);let r="";"today"===c?r=e?"":'<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the weather.</div></div>':"fiveDays"===c&&(t?(r=function(e,t=!1,a=!1){if(!e||!e.list)return'<div class="error">No forecast data available.</div>';let i={};e.list.forEach(e=>{let t=e.dt_txt.split(" ")[0];i[t]||(i[t]=[]),i[t].push(e)});let n=Object.keys(i).map(e=>{let t=i[e].find(e=>e.dt_txt.includes("12:00:00"))||i[e][0],a=i[e].map(e=>e.main.temp),n=Math.round(Math.min(...a)),s=Math.round(Math.max(...a));return{date:e,...t,min:n,max:s,all:i[e]}}).slice(0,5);n=n.sort((e,t)=>{let a=e=>new Date(e).getDay(),i=a(e.date),n=a(t.date);return 0===i&&0!==n?-1:0!==i&&0===n?1:i-n});let s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`
    <section class="five-days-forecast">
      <div class="forecast-cards">
        ${n.map((e,a)=>{e.main.temp;let i=e.weather[0].description,n=e.weather[0].icon,r=new Date(e.date),o=s[r.getDay()],d=r.toDateString()===new Date().toDateString();return`
            <div class="forecast-card" data-date="${e.date}" data-expanded="${t}">
              <div class="forecast-day${d?" today":""}">${o}</div>
              <div class="forecast-date">${e.date.slice(8,10)} ${r.toLocaleString("default",{month:"short"})}</div>
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
        <button id="show-chart-btn" class="nav-btn">${a?"Hide Chart \uD83D\uDCC9":"Show Chart \uD83D\uDCC8"}</button>
      </div>
    </section> 
  `}(t,p,h),h&&(r+=function(e){if(!e||!e.list)return"";let t={};e.list.forEach(e=>{let a=e.dt_txt.split(" ")[0];t[a]||(t[a]=[]),t[a].push(e)});let a=Object.keys(t).map(e=>{let a=t[e].find(e=>e.dt_txt.includes("12:00:00"))||t[e][0];return{date:e,temp:Math.round(a.main.temp),humidity:a.main.humidity,wind:a.wind.speed,pressure:a.main.pressure}}).slice(0,5);if(a.length<2)return`<div class='forecast-chart-section' style='background:linear-gradient(135deg,#202a3a 60%,#26334d 100%);border-radius:18px;padding:32px 24px 18px 24px;box-shadow:0 6px 32px rgba(0,0,0,0.22);max-width:640px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;'>
      <div style='font-size:1.18rem;font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;margin-bottom:10px;'>5-Day Temperature Trend</div>
      <div style='color:#fff;opacity:0.7;font-size:1.1rem;text-align:center;margin:32px 0;'>Not enough data to display chart.</div>
    </div>`;let i=window.innerWidth<=768,n=i?320:640,s=i?240:320,r=i?40:50,o=a.map(e=>e.temp),d=a.map(e=>e.humidity),l=a.map(e=>e.wind),c=a.map(e=>e.pressure),p=o.concat(d,l,c),h=Math.min(...p)-2,u=Math.max(...p)+2;function m(e){return r+(u-e)/(u-h)*(s-2*r)}function y(e){return r+e*((n-2*r)/(a.length-1))}let f=o.map((e,t)=>({x:y(t),y:m(e)})),g=d.map((e,t)=>({x:y(t),y:m(e)})),x=l.map((e,t)=>({x:y(t),y:m(e)})),v=c.map((e,t)=>({x:y(t),y:m(e)}));function w(e){if(e.length<2)return"";let t=`M${e[0].x},${e[0].y}`;for(let a=1;a<e.length;a++){let i=e[a-1],n=e[a],s=(i.x+n.x)/2;t+=` C${s},${i.y} ${s},${n.y} ${n.x},${n.y}`}return t}let $=w(f),b=w(g),k=w(x),S=w(v),D=a.map(e=>{let t=new Date(e.date);return i?t.toLocaleDateString("en-US",{weekday:"short"}).substring(0,3):t.toLocaleDateString("en-US",{weekday:"short"})}),I=i?4:5,E=Array.from({length:I},(e,t)=>h+t*(u-h)/(I-1));return`
      <div class="forecast-chart-section" style="background:linear-gradient(135deg,#1a2332 60%,#202a3a 100%);border-radius:16px;padding:${i?"24px 16px 20px 16px":"36px 28px 28px 28px"};box-shadow:0 8px 32px rgba(0,0,0,0.2),0 4px 16px rgba(0,0,0,0.15);max-width:100%;width:100%;margin:16px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.12);">
        <div style="font-size:${i?"1rem":"1.1rem"};font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;margin-bottom:${i?"14px":"16px"};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">5-Day Temperature Trend</div>
        <div style="display:flex;align-items:center;gap:${i?"10px":"12px"};margin-bottom:${i?"14px":"16px"};font-size:${i?"0.4rem":"0.45rem"};flex-wrap:wrap;justify-content:center;font-weight:500;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:0 6px;">
          <span style="color:#fff;opacity:0.85;font-size:${i?"0.4rem":"0.45rem"};font-weight:600;margin-right:3px;letter-spacing:0.2px;">AVERAGE:</span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${i?"9":"10"}" height="${i?"1.3":"1.4"}"><rect width="${i?"9":"10"}" height="${i?"1.3":"1.4"}" fill="#ff9800" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${i?"0.4rem":"0.45rem"};font-weight:500;letter-spacing:0.1px;">Temperature, C\xb0</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${i?"9":"10"}" height="${i?"1.3":"1.4"}"><rect width="${i?"9":"10"}" height="${i?"1.3":"1.4"}" fill="#1976d2" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${i?"0.4rem":"0.45rem"};font-weight:500;letter-spacing:0.1px;">Humidity, %</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${i?"9":"10"}" height="${i?"1.3":"1.4"}"><rect width="${i?"9":"10"}" height="${i?"1.3":"1.4"}" fill="#ffd600" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${i?"0.4rem":"0.45rem"};font-weight:500;letter-spacing:0.1px;">Wind Speed, m/s</span></span>
          <span style="display:flex;align-items:center;margin:0 2px;"><svg width="${i?"9":"10"}" height="${i?"1.3":"1.4"}"><rect width="${i?"9":"10"}" height="${i?"1.3":"1.4"}" fill="#43a047" rx="0.2"/></svg> <span style="color:#fff;margin-left:3px;font-size:${i?"0.4rem":"0.45rem"};font-weight:500;letter-spacing:0.1px;">Atmosphere Pressure, m/m</span></span>
        </div>
      <div style="width:100%;overflow-x:auto;">
        <svg width="100%" height="${s}" viewBox="0 0 ${n} ${s}" class="forecast-chart" style="background:none;max-width:100%;display:block;margin:0 auto;">
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
          <rect x="0" y="0" width="${n}" height="${s}" fill="url(#chartBg)" rx="18"/>
          
          <!-- Grid lines -->
          ${E.map((e,t)=>`<line x1="${r}" y1="${r+t*(s-2*r)/(I-1)}" x2="${n-r}" y2="${r+t*(s-2*r)/(I-1)}" stroke="#fff" stroke-width="0.5" opacity="0.06" />`).join("")}
          ${f.map((e,t)=>`<line x1="${e.x}" y1="${r}" x2="${e.x}" y2="${s-r}" stroke="#fff" stroke-width="0.5" opacity="0.04" />`).join("")}
          
          <!-- X and Y axis lines -->
          <line x1="${r}" y1="${r}" x2="${n-r}" y2="${r}" stroke="#fff" stroke-width="0.8" opacity="0.15" />
          <line x1="${r}" y1="${r}" x2="${r}" y2="${s-r}" stroke="#fff" stroke-width="0.8" opacity="0.15" />
          
          <!-- Y axis labels -->
          ${E.map((e,t)=>`<text x="${r-18}" y="${r+t*(s-2*r)/(I-1)+2}" text-anchor="end" font-size="${i?"0.55":"0.6"}" font-weight="500" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#1a1a1a" stroke-width="0.06" letter-spacing="0.15">${e.toFixed(1)}</text>`).join("")}
          
          <!-- X axis labels -->
          ${f.map((e,t)=>`<text x="${e.x}" y="${s-r+18}" text-anchor="middle" font-size="${i?"0.55":"0.6"}" font-weight="500" fill="#fff" opacity="0.85" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#1a1a1a" stroke-width="0.06" letter-spacing="0.15">${D[t]}</text>`).join("")}
          
          <!-- Temperature line -->
          <path d="${$}" fill="none" stroke="#ff9800" stroke-width="${i?"3":"3.5"}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${f.map(e=>`<circle class="chart-point" cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="#ff9800" stroke-width="2.5" filter="url(#chartDropShadow)" style="transition:all 0.18s;" />`).join("")}
          
          <!-- Humidity line -->
          <path d="${b}" fill="none" stroke="#1976d2" stroke-width="${i?"2":"2.5"}" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${g.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"4":"5"}" fill="#26334d" stroke="#1976d2" stroke-width="2" filter="url(#chartDropShadow)" />`).join("")}
          
          <!-- Wind line -->
          <path d="${k}" fill="none" stroke="#ffd600" stroke-width="${i?"2":"2.5"}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${x.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"4":"5"}" fill="#26334d" stroke="#ffd600" stroke-width="2" filter="url(#chartDropShadow)" />`).join("")}
          
          <!-- Pressure line -->
          <path d="${S}" fill="none" stroke="#43a047" stroke-width="${i?"2":"2.5"}" stroke-dasharray="1 5" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${v.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"4":"5"}" fill="#26334d" stroke="#43a047" stroke-width="2" filter="url(#chartDropShadow)" />`).join("")}
        </svg>
      </div>
    </div>
  `}(t))):r='<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the forecast.</div></div>');let o="";if(e){let t=new Date,a=t.toLocaleString("en-US",{weekday:"short"}),i=t.getDate(),n=t.toLocaleString("en-US",{month:"long"}),s=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),r="",d="";e.sys&&e.sys.sunrise&&e.sys.sunset&&(r=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),d=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),o=`
      <div class="date-time-section">
        <div class="date-big"><span class="date-num">${i}<sup>th</sup></span> <span class="date-day">${a}</span></div>
        <div class="date-month">${n}</div>
        <div class="date-time-row">
          <span class="date-time-clock">${s}</span>
          <span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>${r}</span>
          <span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>${d}</span>
        </div>
      </div>
    `}else o=`<div class="date-time-section"><div class="date-big"><span class="date-num">--<sup>th</sup></span> <span class="date-day">---</span></div><div class="date-month">------</div><div class="date-time-row"><span class="date-time-clock">--:--</span><span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>--:--</span><span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>--:--</span></div></div>`;let m=function(){let e=d[Math.floor(Math.random()*d.length)];return`<div class="quote-section">\u{201C}${e.text}\u{201D}<br><span class="quote-author">\u{2014} ${e.author}</span></div>`}(),y=document.getElementById("app"),g=window.innerWidth<=768;"fiveDays"===c?y.innerHTML=`
      <div id="header-root"></div>
      ${i}
      ${g?"":'<div class="country-align-row"></div>'}
      ${g?`
        <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:16px;padding:0 16px;">
          <div style="font-size:1.1rem;font-weight:600;color:#fff;letter-spacing:0.5px;text-align:center;">${l||""}</div>
          ${s}
        </div>
      `:`
        <div style="width:100%;display:flex;justify-content:center;align-items:center;gap:24px;margin-bottom:8px;">
          <div style="font-size:1.25rem;font-weight:600;color:#fff;letter-spacing:0.5px;">${l||""}</div>
          ${s}
        </div>
      `}
      ${r}
    `:y.innerHTML=`
      <div id="header-root"></div>
      ${i}
      ${g?"":'<div class="country-align-row"></div>'}
      <div class="weather-right-group">
        ${n}
        ${s}
      </div>
      ${r}
      ${"today"===c?o:""}
      ${"today"===c?m:""}
    `;let x=document.querySelector(".today-weather-card"),v=document.getElementById("nav-buttons");"today"===c?(x&&x.classList.add("right-align"),v&&v.classList.add("right-align")):(x&&x.classList.remove("right-align"),v&&v.classList.remove("right-align")),a(async e=>{c="today",h=!1,await f(e)});let w=document.getElementById("header-root");w||((w=document.createElement("div")).id="header-root",document.querySelector(".header-searchbar-root").appendChild(w));let $=document.getElementById("btn-today"),b=document.getElementById("btn-five-days");if($&&($.onclick=()=>{"today"!==c&&(c="today",h=!1,f(l))}),b&&(b.onclick=()=>{"fiveDays"!==c&&(c="fiveDays",h=!1,f(l))}),"fiveDays"===c&&t){document.querySelectorAll(".more-info-btn").forEach(e=>{e.onclick=e=>{p=!p,f(l)}});let e=document.getElementById("show-chart-btn");e&&(e.onclick=t=>{let a=document.createElement("span");a.className="ripple";let i=e.getBoundingClientRect();a.style.width=a.style.height=Math.max(i.width,i.height)+"px",a.style.left=t.clientX-i.left-i.width/2+"px",a.style.top=t.clientY-i.top-i.height/2+"px",e.appendChild(a),setTimeout(()=>a.remove(),600),h=!h,f(l)})}}async function y(e,t,a){let i=document.querySelector(".background-overlay");if(!e){document.body.style.backgroundImage="",i&&(i.style.backgroundImage="");return}let n=await o(e,t,a);n?i?(i.style.display="block",i.style.backgroundImage=`url('${n}')`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.style.backgroundRepeat="no-repeat",i.style.opacity="0.7"):(document.body.style.backgroundImage=`url('${n}')`,document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat"):(i&&(i.style.display="none",i.style.backgroundImage=""),document.body.style.backgroundImage="")}async function f(e){l=e;let t=null,a=null;if(u="",e)try{t=await s(e),a=await r(e);let i=t&&t.weather&&t.weather[0]?t.weather[0].main:"",n=t&&t.sys&&t.sys.country?t.sys.country:"";i=i?i.toLowerCase():"",y(e.split(",")[0],i,n)}catch(e){u="City or country not found. Please try another.",m(null,null),y(null,null,null);return}else y(null,null,null);m(t,a)}window.addEventListener("DOMContentLoaded",()=>{f("New York,US"),a(async e=>{c="today",h=!1,await f(e)})});
//# sourceMappingURL=weather-apps.fdbe4229.js.map
