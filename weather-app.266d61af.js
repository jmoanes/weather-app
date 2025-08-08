let e=["Kyiv","Paris","Vinnytsia","Warsaw"],t="Kyiv",a=[],i=[],n=0,s=0;function o(o){let m=`
    <header class="header">
      
      <div class="header-searchbar">
        <div class="search-input-wrapper">
          <span class="searchbar-icon-inside">\u{1F50D}</span>
          <input type="text" class="search-input-rounded" placeholder="Search for a city..." id="city-search">
          <button class="search-btn-inside" id="search-btn">
            <span class="search-icon">\u{2B50}</span>
          </button>
        </div>
        
        <!-- Search Results Container with Pagination -->
        <div class="search-results-container" id="search-results-container" style="display: none;">
          <div class="search-results" id="search-results">
            <!-- Search results will be populated here -->
          </div>
          <div class="pagination-controls" id="pagination-controls">
            <button class="pagination-arrow pagination-prev" id="pagination-prev" style="display: none;">\u{2039}</button>
            <span class="pagination-info" id="pagination-info"></span>
            <button class="pagination-arrow pagination-next" id="pagination-next" style="display: none;">\u{203A}</button>
          </div>
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
        <button class="country-button" id="country-button" style="display: none;" title="Country Info - Double click or press 'N' to scroll to next country">\u{1F30D}</button>
      </div>
    </header>
  `,f=document.querySelector(".header-searchbar-root");f||((f=document.createElement("div")).className="header-searchbar-root",document.body.insertBefore(f,document.body.firstChild)),f.innerHTML=m,function(o){let m=document.getElementById("city-search"),f=document.getElementById("search-btn"),g=document.getElementById("cities-chips"),v=document.getElementById("scroll-left"),x=document.getElementById("scroll-right"),b=document.getElementById("country-button");m&&(m.addEventListener("input",e=>{var t,a;let r=e.target.value.trim();r.length>=2?(t=r,a=o,window.onCitySelect=a,i=["New York, USA","London, UK","Paris, France","Tokyo, Japan","Berlin, Germany","Rome, Italy","Madrid, Spain","Amsterdam, Netherlands","Vienna, Austria","Prague, Czech Republic","Budapest, Hungary","Warsaw, Poland"].filter(e=>e.toLowerCase().includes(t.toLowerCase())),n=0,s=Math.ceil(i.length/4),i.length>0?(y(),function(){let e=document.getElementById("search-results-container");e&&(e.style.display="block")}()):h()):h()}),m.addEventListener("keypress",e=>{if("Enter"===e.key){let e=m.value.trim();e&&(r(e,o,!0),h())}})),f&&f.addEventListener("click",()=>{let e=m.value.trim();e&&(r(e,o,!0),h())}),g&&g.addEventListener("click",i=>{var n;i.target.classList.contains("header-city-chip")?r(i.target.dataset.city,o):i.target.classList.contains("chip-close")&&(n=i.target.dataset.city,e=e.filter(e=>e!==n),a=a.filter(e=>e!==n),t===n&&(t=e[0]||"Kyiv"),l())}),v&&v.addEventListener("click",()=>{console.log("Left scroll arrow clicked");let e=Math.min(200,g.scrollLeft);g.scrollBy({left:-e,behavior:"smooth"}),c()}),x&&x.addEventListener("click",()=>{console.log("Right scroll arrow clicked");let e=Math.min(200,g.scrollWidth-g.clientWidth-g.scrollLeft);g.scrollBy({left:e,behavior:"smooth"}),c()}),b&&(b.addEventListener("click",()=>{let e=t;e&&(alert(`Country information for ${e} would be displayed here.`),p())}),b.addEventListener("dblclick",()=>{u()})),d(),g.addEventListener("scroll",d),g.addEventListener("keydown",e=>{if("ArrowLeft"===e.key)e.preventDefault(),v.click();else if("ArrowRight"===e.key)e.preventDefault(),x.click();else if("Enter"===e.key&&e.target.classList.contains("header-city-chip")){let t=e.target.dataset.city;t&&r(t,o)}}),document.addEventListener("keydown",e=>{("n"===e.key||"N"===e.key)&&(e.preventDefault(),u())});let w=document.getElementById("pagination-prev"),$=document.getElementById("pagination-next");w&&w.addEventListener("click",()=>{n>0&&(n--,y())}),$&&$.addEventListener("click",()=>{n<s-1&&(n++,y())});let k=0,S=!1;g.addEventListener("touchstart",e=>{k=e.touches[0].clientX,S=!0}),g.addEventListener("touchmove",e=>{if(!S)return;e.preventDefault();let t=e.touches[0].clientX,a=k-t;g.scrollLeft+=a,k=t}),g.addEventListener("touchend",()=>{S=!1})}(o)}function r(i,n,s=!1){t=i,p(),e.includes(i)||a.includes(i)?e.includes(i)&&((e=e.filter(e=>e!==i)).unshift(i),l()):(s?a.push(i):(e.unshift(i),e.length>10&&e.pop()),l());let o=document.getElementById("city-search");o&&(o.value=""),n&&n(i)}function l(){let i=document.getElementById("cities-chips");i&&(i.innerHTML=[...e.map(e=>`
      <button class="header-city-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `),...a.map(e=>`
      <button class="header-city-chip hidden-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `)].join(""))}function d(){let e=document.getElementById("cities-chips"),t=document.getElementById("scroll-left"),a=document.getElementById("scroll-right");if(e&&t&&a){let i=e.scrollLeft<=5,n=e.scrollLeft>=e.scrollWidth-e.clientWidth-5,s=e.scrollWidth>e.clientWidth;t.style.display=i||!s?"none":"flex",a.style.display=n||!s?"none":"flex",t.style.opacity=i?"0.5":"1",a.style.opacity=n?"0.5":"1"}}function c(){let e=document.getElementById("country-button");e?(console.log("Showing country button"),e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(-50%) scale(1)",e.style.animation="fadeInScale 0.3s ease-out",e.style.zIndex="1000",e.title='Country Info - Double click or press "N" to scroll to next country',console.log("Country button styles applied:",{display:e.style.display,opacity:e.style.opacity,visibility:e.style.visibility})):console.log("Country button not found")}function p(){let e=document.getElementById("country-button");e&&(console.log("Hiding country button"),e.style.animation="fadeOutScale 0.3s ease-out",e.style.opacity="0",setTimeout(()=>{e.style.display="none",e.style.visibility="hidden"},300))}function u(){let e=document.getElementById("cities-chips"),t=document.getElementById("country-button");if(!e)return;t&&(t.classList.add("scrolling"),setTimeout(()=>{t.classList.remove("scrolling")},1500));let a=e.querySelectorAll(".header-city-chip");if(0===a.length)return;let i=e.querySelector(".header-city-chip.selected");if(!i)return;let n=(Array.from(a).indexOf(i)+1)%a.length,s=a[n];s&&(s.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),s.dataset.city&&setTimeout(()=>{s.click()},300))}function y(){let e=document.getElementById("search-results"),t=document.getElementById("pagination-info"),a=document.getElementById("pagination-prev"),o=document.getElementById("pagination-next");if(!e)return;let l=4*n,d=Math.min(l+4,i.length);e.innerHTML=i.slice(l,d).map(e=>`
    <div class="search-result-item" data-city="${e}">
      <span class="search-result-text">${e}</span>
      <button class="search-result-add" data-city="${e}">+</button>
    </div>
  `).join(""),t&&(t.textContent=`${l+1}-${d} of ${i.length}`),a&&(a.style.display=n>0?"flex":"none"),o&&(o.style.display=n<s-1?"flex":"none"),e.querySelectorAll(".search-result-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.city;t&&(r(t.split(",")[0].trim(),window.onCitySelect||(()=>{}),!0),h())})}),e.querySelectorAll(".search-result-add").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();let a=e.dataset.city;a&&(r(a.split(",")[0].trim(),window.onCitySelect||(()=>{}),!0),h())})})}function h(){let e=document.getElementById("search-results-container");e&&(e.style.display="none")}const m="ccac33176c75e16a3b3c977b0ca6365c",f="https://api.openweathermap.org/data/2.5/";async function g(e){let t=`${f}weather?q=${encodeURIComponent(e)}&appid=${m}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function v(e){let t=`${f}forecast?q=${encodeURIComponent(e)}&appid=${m}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function x(e,t,a){for(let i of[`${e} ${a||""} ${t||""} cityscape skyline`.trim(),`${e} ${a||""} cityscape skyline`.trim(),`${e} ${t||""} cityscape`.trim(),`${e} cityscape skyline`,`${e} city`]){if(!i.trim())continue;let e=`https://pixabay.com/api/?key=51325887-dff4e6da46d9f05f769d357a1&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&category=places&per_page=5&safesearch=true&min_width=1200&min_height=800`;try{let t=await fetch(e);if(!t.ok)continue;let a=await t.json();if(a.hits&&a.hits.length>0){let e=a.hits.find(e=>e.largeImageURL&&e.imageWidth>=1200&&e.imageHeight>=800)||a.hits[0];return e.largeImageURL||e.webformatURL}}catch(e){continue}}return null}const b=[{text:"Wherever you go, no matter what the weather, always bring your own sunshine.",author:"Anthony J. D'Angelo"},{text:"Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",author:"John Ruskin"},{text:"There is no such thing as bad weather, only different kinds of good weather.",author:"John Ruskin"},{text:"Some people feel the rain. Others just get wet.",author:"Bob Marley"},{text:"To appreciate the beauty of a snowflake it is necessary to stand out in the cold.",author:"Aristotle"},{text:"Climate is what we expect, weather is what we get.",author:"Mark Twain"},{text:"The sound of the rain needs no translation.",author:"Alan Watts"}];let w="",$="today",k=!1,S=!1,E="";function I(e,t){let a="",i="";"today"===$?e?(a=function(e){if(!e)return'<div class="error">No weather data available.</div>';let{name:t,main:a,weather:i,sys:n}=e,s=Math.round(a.temp),o=Math.round(a.temp_min),r=Math.round(a.temp_max),l=i[0].description,d=i[0].icon,c=n&&n.country?n.country:"",p={TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand"}[c]||c,u=window.innerWidth<=768;return`
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
        <div class="weather-minmax">min <b>${o}&deg;</b> &nbsp; max <b>${r}&deg;</b></div>
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
    `);let n="";if("today"===$)n=e?"":'<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the weather.</div></div>';else if("fiveDays"===$)if(t){let a="";if(e&&e.sys&&e.sys.country){let t=e.sys.country;a=({TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand",VN:"Vietnam",SG:"Singapore",MY:"Malaysia",ID:"Indonesia",PH:"Philippines",TR:"Turkey",SA:"Saudi Arabia",AE:"United Arab Emirates",EG:"Egypt",ZA:"South Africa",NG:"Nigeria",KE:"Kenya",MA:"Morocco",TN:"Tunisia",DZ:"Algeria",LY:"Libya",SD:"Sudan",ET:"Ethiopia",GH:"Ghana",CI:"Ivory Coast",SN:"Senegal",ML:"Mali",BF:"Burkina Faso",NE:"Niger",TD:"Chad",CF:"Central African Republic",CM:"Cameroon",GQ:"Equatorial Guinea",GA:"Gabon",CG:"Republic of the Congo",CD:"Democratic Republic of the Congo",AO:"Angola",ZM:"Zambia",ZW:"Zimbabwe",BW:"Botswana",NA:"Namibia",SZ:"Eswatini",LS:"Lesotho",MG:"Madagascar",MU:"Mauritius",SC:"Seychelles",KM:"Comoros",DJ:"Djibouti",SO:"Somalia",ER:"Eritrea",SS:"South Sudan",RW:"Rwanda",BI:"Burundi",TZ:"Tanzania",UG:"Uganda",MZ:"Mozambique",MW:"Malawi"})[t]||t}n=function(e,t=!1,a=!1,i="",n=""){if(!e||!e.list)return'<div class="error">No forecast data available.</div>';let s={};e.list.forEach(e=>{let t=e.dt_txt.split(" ")[0];s[t]||(s[t]=[]),s[t].push(e)});let o=Object.keys(s).map(e=>{let t=s[e].find(e=>e.dt_txt.includes("12:00:00"))||s[e][0],a=s[e].map(e=>e.main.temp),i=Math.round(Math.min(...a)),n=Math.round(Math.max(...a));return{date:e,...t,min:i,max:n,all:s[e]}}).slice(0,5);o=o.sort((e,t)=>{let a=e=>new Date(e).getDay(),i=a(e.date),n=a(t.date);return 0===i&&0!==n?-1:0!==i&&0===n?1:i-n});let r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=i?`
    <div class="forecast-location-header" style="text-align:center; margin-bottom:24px; padding:0 16px;">
      <div class="forecast-city-name" style="font-size:1.4rem; font-weight:700; color:#fff; margin-bottom:4px; letter-spacing:0.5px;">${i}</div>
      ${n?`<div class="forecast-country-name" style="font-size:1rem; color:#ffd54f; font-weight:500; opacity:0.9; letter-spacing:0.3px;">${n}</div>`:""}
    </div>
  `:"";return`
    <section class="five-days-forecast">
      ${l}
      <div class="forecast-cards">
        ${o.map((e,a)=>{e.main.temp;let i=e.weather[0].description,n=e.weather[0].icon,s=new Date(e.date),o=r[s.getDay()],l=s.toDateString()===new Date().toDateString();return`
            <div class="forecast-card" data-date="${e.date}" data-expanded="${t}">
              <div class="forecast-day${l?" today":""}">${o}</div>
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
  `}(t,k,S,w,a),S&&(n+=function(e){if(!e||!e.list)return"";let t={};e.list.forEach(e=>{let a=e.dt_txt.split(" ")[0];t[a]||(t[a]=[]),t[a].push(e)});let a=Object.keys(t).map(e=>{let a=t[e].find(e=>e.dt_txt.includes("12:00:00"))||t[e][0];return{date:e,temp:Math.round(a.main.temp),humidity:a.main.humidity,wind:Math.round(10*a.wind.speed)/10,pressure:10*Math.round(a.main.pressure/10)}}).slice(0,5);if(a.length<2)return`<div class='forecast-chart-section' style='background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:40px 32px;box-shadow:0 12px 40px rgba(0,0,0,0.25),0 6px 20px rgba(0,0,0,0.2);max-width:720px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(10px);'>
      <div style='font-size:1.25rem;font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:12px;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);'>5-Day Weather Analytics</div>
      <div style='color:#fff;opacity:0.75;font-size:1.1rem;text-align:center;margin:32px 0;font-weight:500;letter-spacing:0.3px;'>Insufficient data to generate comprehensive chart.</div>
    </div>`;let i=window.innerWidth<=768,n=i?360:720,s=i?280:400,o=i?50:70,r=a.map(e=>e.temp),l=a.map(e=>e.humidity),d=a.map(e=>e.wind),c=a.map(e=>e.pressure),p=r.concat(l,d,c),u=Math.floor(.95*Math.min(...p)),y=Math.ceil(1.05*Math.max(...p));function h(e){return o+(y-e)/(y-u)*(s-2*o)}function m(e){return o+e*((n-2*o)/(a.length-1))}let f=r.map((e,t)=>({x:m(t),y:h(e)})),g=l.map((e,t)=>({x:m(t),y:h(e)})),v=d.map((e,t)=>({x:m(t),y:h(e)})),x=c.map((e,t)=>({x:m(t),y:h(e)}));function b(e){if(e.length<2)return"";let t=`M${e[0].x},${e[0].y}`;for(let a=1;a<e.length;a++){let i=e[a-1],n=e[a],s=(i.x+n.x)/2;t+=` C${s},${i.y} ${s},${n.y} ${n.x},${n.y}`}return t}let w=b(f),$=b(g),k=b(v),S=b(x),E=a.map(e=>{let t=new Date(e.date),a=t.getFullYear();if(i){let e=t.toLocaleDateString("en-US",{weekday:"short"}).substring(0,3);return`${e} '${a.toString().slice(-2)}`}{let e=t.toLocaleDateString("en-US",{weekday:"short"});return`${e} '${a.toString().slice(-2)}`}}),I=i?5:6,L=Array.from({length:I},(e,t)=>u+t*(y-u)/(I-1));return`
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
          ${L.map((e,t)=>`<line x1="${o}" y1="${o+t*(s-2*o)/(I-1)}" x2="${n-o}" y2="${o+t*(s-2*o)/(I-1)}" stroke="#fff" stroke-width="0.8" opacity="0.08" />`).join("")}
          ${f.map((e,t)=>`<line x1="${e.x}" y1="${o}" x2="${e.x}" y2="${s-o}" stroke="#fff" stroke-width="0.6" opacity="0.06" />`).join("")}
          
          <!-- X and Y axis lines -->
          <line x1="${o}" y1="${o}" x2="${n-o}" y2="${o}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          <line x1="${o}" y1="${o}" x2="${o}" y2="${s-o}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          
          <!-- Y axis labels -->
          ${L.map((e,t)=>`<text x="${o-24}" y="${o+t*(s-2*o)/(I-1)+3}" text-anchor="end" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${e.toFixed(0)}</text>`).join("")}
          
          <!-- X axis labels -->
          ${f.map((e,t)=>`<text x="${e.x}" y="${s-o+22}" text-anchor="middle" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${E[t]}</text>`).join("")}
          
          <!-- Temperature line with gradient -->
          <path d="${w}" fill="none" stroke="url(#tempGradient)" stroke-width="${i?"4":"5"}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${f.map(e=>`<circle class="chart-point" cx="${e.x}" cy="${e.y}" r="${i?"6":"8"}" fill="#26334d" stroke="url(#tempGradient)" stroke-width="3" filter="url(#glowEffect)" style="transition:all 0.2s ease;" />`).join("")}
          
          <!-- Humidity line with gradient -->
          <path d="${$}" fill="none" stroke="url(#humidityGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${g.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#humidityGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Wind line with gradient -->
          <path d="${k}" fill="none" stroke="url(#windGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="3 8" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${v.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#windGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Pressure line with gradient -->
          <path d="${S}" fill="none" stroke="url(#pressureGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${x.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#pressureGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
        </svg>
      </div>
    </div>
  `}(t))}else n='<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the forecast.</div></div>';let s="";if(e){let t=new Date,a=t.toLocaleString("en-US",{weekday:"short"}),i=t.getDate(),n=t.toLocaleString("en-US",{month:"long"}),o=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),r="",l="";e.sys&&e.sys.sunrise&&e.sys.sunset&&(r=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),l=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s=`
      <div class="date-time-section">
        <div class="date-big"><span class="date-num">${i}<sup>th</sup></span> <span class="date-day">${a}</span></div>
        <div class="date-month">${n}</div>
        <div class="date-time-row">
          <span class="date-time-clock">${o}</span>
          <span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>${r}</span>
          <span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>${l}</span>
        </div>
      </div>
    `}else s=`<div class="date-time-section"><div class="date-big"><span class="date-num">--<sup>th</sup></span> <span class="date-day">---</span></div><div class="date-month">------</div><div class="date-time-row"><span class="date-time-clock">--:--</span><span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>--:--</span><span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>--:--</span></div></div>`;let r=function(){let e=b[Math.floor(Math.random()*b.length)];return`<div class="quote-section">\u{201C}${e.text}\u{201D}<br><span class="quote-author">\u{2014} ${e.author}</span></div>`}(),l=document.getElementById("app");window.innerWidth,"fiveDays"===$?l.innerHTML=`
      <div id="header-root"></div>
      ${i}
      ${n}
    `:l.innerHTML=`
      <div id="header-root"></div>
      <div class="weather-right-group">
        ${a}
        ${i}
      </div>
      ${n}
      ${"today"===$?s:""}
      ${"today"===$?r:""}
    `;let d=document.querySelector(".today-weather-card"),c=document.getElementById("nav-buttons");"today"===$?(d&&d.classList.add("right-align"),c&&c.classList.add("right-align")):(d&&d.classList.remove("right-align"),c&&c.classList.remove("right-align")),o(async e=>{$="today",S=!1,await M(e)});let p=document.getElementById("header-root");p||((p=document.createElement("div")).id="header-root",document.querySelector(".header-searchbar-root").appendChild(p));let u=document.getElementById("btn-today"),y=document.getElementById("btn-five-days");if(u&&(u.onclick=()=>{"today"!==$&&($="today",S=!1,M(w))}),y&&(y.onclick=()=>{"fiveDays"!==$&&($="fiveDays",S=!1,M(w))}),"fiveDays"===$&&t){document.querySelectorAll(".more-info-btn").forEach(e=>{e.onclick=e=>{k=!k,M(w)}});let e=document.getElementById("show-chart-btn");e&&(e.onclick=t=>{let a=document.createElement("span");a.className="ripple";let i=e.getBoundingClientRect();a.style.width=a.style.height=Math.max(i.width,i.height)+"px",a.style.left=t.clientX-i.left-i.width/2+"px",a.style.top=t.clientY-i.top-i.height/2+"px",e.appendChild(a),setTimeout(()=>a.remove(),600),S=!S,M(w)})}}async function L(e,t,a){let i=document.querySelector(".background-overlay");if(!e){document.body.style.backgroundImage="",i&&(i.style.backgroundImage="",i.style.opacity="0");return}i&&(i.style.opacity="0.3",i.style.transition="opacity 0.5s ease-in-out");let n=await x(e,t,a);n?i?(i.style.display="block",i.style.backgroundImage=`url('${n}')`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.style.backgroundRepeat="no-repeat",i.style.opacity="0.6",i.style.transition="opacity 0.8s ease-in-out"):(document.body.style.backgroundImage=`url('${n}')`,document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat"):(i&&(i.style.display="none",i.style.backgroundImage="",i.style.opacity="0"),document.body.style.backgroundImage="")}async function M(e){w=e;let t=null,a=null;if(E="",B(!0),e)try{t=await g(e),a=await v(e);let i=t&&t.weather&&t.weather[0]?t.weather[0].main:"",n=t&&t.sys&&t.sys.country?t.sys.country:"";i=i?i.toLowerCase():"",L(e.split(",")[0],i,n)}catch(e){E="City or country not found. Please try another.",I(null,null),L(null,null,null),B(!1),function(e){let t=document.querySelector(".error-message-overlay");t&&t.remove();let a=document.createElement("div");a.className="error-message-overlay",a.innerHTML=`
    <div class="error-message-content">
      <div class="error-icon">\u{26A0}\u{FE0F}</div>
      <div class="error-text">${e}</div>
    </div>
  `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&(a.style.opacity="0",a.style.transform="translateY(-20px)",setTimeout(()=>{a.parentNode&&a.remove()},300))},3e3)}(E);return}else L(null,null,null);B(!1),I(t,a)}function B(e){let t=document.querySelector(".loading-overlay");e?(t||(t=function(){let e=document.createElement("div");return e.className="loading-overlay",e.innerHTML=`
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Searching weather data...</div>
    </div>
  `,document.body.appendChild(e),e}()),t.style.display="flex"):t&&(t.style.display="none")}window.addEventListener("DOMContentLoaded",()=>{M("Kyiv,UA"),o(async e=>{$="today",S=!1,await M(e)})});
//# sourceMappingURL=weather-app.266d61af.js.map
