let e=["Kyiv","Paris","Vinnytsia","Warsaw"],t="Kyiv",a=[];const i=[{name:"Afghanistan",code:"AF",cities:["Kabul","Kandahar","Herat"]},{name:"Albania",code:"AL",cities:["Tirana","Durrës","Vlorë"]},{name:"Algeria",code:"DZ",cities:["Algiers","Oran","Constantine"]},{name:"Argentina",code:"AR",cities:["Buenos Aires","Córdoba","Rosario"]},{name:"Australia",code:"AU",cities:["Sydney","Melbourne","Brisbane"]},{name:"Austria",code:"AT",cities:["Vienna","Graz","Linz"]},{name:"Belgium",code:"BE",cities:["Brussels","Antwerp","Ghent"]},{name:"Brazil",code:"BR",cities:["São Paulo","Rio de Janeiro","Brasília"]},{name:"Canada",code:"CA",cities:["Toronto","Montreal","Vancouver"]},{name:"Chile",code:"CL",cities:["Santiago","Valparaíso","Concepción"]},{name:"China",code:"CN",cities:["Beijing","Shanghai","Guangzhou"]},{name:"Colombia",code:"CO",cities:["Bogotá","Medellín","Cali"]},{name:"Czech Republic",code:"CZ",cities:["Prague","Brno","Ostrava"]},{name:"Denmark",code:"DK",cities:["Copenhagen","Aarhus","Odense"]},{name:"Egypt",code:"EG",cities:["Cairo","Alexandria","Giza"]},{name:"Finland",code:"FI",cities:["Helsinki","Espoo","Tampere"]},{name:"France",code:"FR",cities:["Paris","Marseille","Lyon"]},{name:"Germany",code:"DE",cities:["Berlin","Hamburg","Munich"]},{name:"Greece",code:"GR",cities:["Athens","Thessaloniki","Patras"]},{name:"Hungary",code:"HU",cities:["Budapest","Debrecen","Szeged"]},{name:"India",code:"IN",cities:["Mumbai","Delhi","Bangalore"]},{name:"Indonesia",code:"ID",cities:["Jakarta","Surabaya","Bandung"]},{name:"Ireland",code:"IE",cities:["Dublin","Cork","Galway"]},{name:"Italy",code:"IT",cities:["Rome","Milan","Naples"]},{name:"Japan",code:"JP",cities:["Tokyo","Osaka","Nagoya"]},{name:"Kenya",code:"KE",cities:["Nairobi","Mombasa","Kisumu"]},{name:"Malaysia",code:"MY",cities:["Kuala Lumpur","George Town","Johor Bahru"]},{name:"Mexico",code:"MX",cities:["Mexico City","Guadalajara","Monterrey"]},{name:"Morocco",code:"MA",cities:["Casablanca","Rabat","Fez"]},{name:"Netherlands",code:"NL",cities:["Amsterdam","Rotterdam","The Hague"]},{name:"New Zealand",code:"NZ",cities:["Auckland","Wellington","Christchurch"]},{name:"Nigeria",code:"NG",cities:["Lagos","Kano","Ibadan"]},{name:"Norway",code:"NO",cities:["Oslo","Bergen","Trondheim"]},{name:"Philippines",code:"PH",cities:["Manila","Quezon City","Davao City"]},{name:"Poland",code:"PL",cities:["Warsaw","Kraków","Łódź"]},{name:"Portugal",code:"PT",cities:["Lisbon","Porto","Braga"]},{name:"Romania",code:"RO",cities:["Bucharest","Cluj-Napoca","Timișoara"]},{name:"Russia",code:"RU",cities:["Moscow","Saint Petersburg","Novosibirsk"]},{name:"Saudi Arabia",code:"SA",cities:["Riyadh","Jeddah","Mecca"]},{name:"Singapore",code:"SG",cities:["Singapore"]},{name:"South Africa",code:"ZA",cities:["Johannesburg","Cape Town","Durban"]},{name:"South Korea",code:"KR",cities:["Seoul","Busan","Incheon"]},{name:"Spain",code:"ES",cities:["Madrid","Barcelona","Valencia"]},{name:"Sweden",code:"SE",cities:["Stockholm","Gothenburg","Malmö"]},{name:"Switzerland",code:"CH",cities:["Zurich","Geneva","Basel"]},{name:"Thailand",code:"TH",cities:["Bangkok","Chiang Mai","Pattaya"]},{name:"Turkey",code:"TR",cities:["Istanbul","Ankara","Izmir"]},{name:"Ukraine",code:"UA",cities:["Kyiv","Kharkiv","Odesa"]},{name:"United Arab Emirates",code:"AE",cities:["Dubai","Abu Dhabi","Sharjah"]},{name:"United Kingdom",code:"GB",cities:["London","Birmingham","Manchester"]},{name:"United States",code:"US",cities:["New York","Los Angeles","Chicago"]},{name:"Vietnam",code:"VN",cities:["Ho Chi Minh City","Hanoi","Da Nang"]}];function n(n){let y=`
    <header class="header">
      
      <div class="header-searchbar">
        <div class="search-input-wrapper" style="width: 100%; max-width: 1000px; margin: 0 auto;">
          <span class="searchbar-icon-inside">\u{1F50D}</span>
          <input type="text" class="search-input-rounded" placeholder="Search for a city or country..." id="city-search" autocomplete="off" spellcheck="false" maxlength="100" style="position: relative; z-index: 9999; background: white !important; color: black !important; border: 1px solid #ccc !important; padding: 16px 20px !important; width: 100% !important; box-sizing: border-box !important; font-size: 16px !important; border-radius: 25px !important;">
          <button class="search-btn-inside" id="search-btn" style="background: #1976d2 !important; color: white !important; border: none !important; border-radius: 50% !important; width: 45px !important; height: 45px !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; margin-right: 8px !important; box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3) !important; transition: all 0.3s ease !important;">
            <span class="search-icon" style="color: white !important; font-size: 18px !important;">\u{1F50D}</span>
          </button>
        </div>
        
        <!-- Enhanced Country Dropdown Container -->
        <div class="country-dropdown-container" id="country-dropdown-container" style="display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: white; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 10000; max-height: 300px; overflow-y: auto; margin-top: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); width: 1000px; max-width: 90vw;">
          <!-- Country suggestions will be populated here -->
        </div>
        
        <!-- Search Button Row -->
        <div class="search-actions" style="display: flex; gap: 16px; margin-top: 20px; justify-content: center; align-items: center;">
          <button class="main-search-btn" id="main-search-btn" style="padding: 16px 32px; background: linear-gradient(135deg, #1976d2, #1565c0, #0d47a1); color: white; border: none; border-radius: 30px; cursor: pointer; font-size: 16px; font-weight: 700; box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; display: flex; align-items: center; gap: 12px; letter-spacing: 0.5px; text-transform: uppercase; min-width: 180px; justify-content: center;">
            <span style="font-size: 18px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">\u{1F50D}</span>
            Search
          </button>
          <button class="clear-search-btn" id="clear-search-btn" style="padding: 14px 28px; background: linear-gradient(135deg, #f5f5f5, #e0e0e0); color: #555; border: 1px solid #ddd; border-radius: 25px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            Clear
          </button>
        </div>
        
        <!-- Quick Country Access Buttons -->
        <div class="quick-countries" style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; justify-content: center;">
          <button class="quick-country-btn" data-country="US" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">\u{1F1FA}\u{1F1F8} USA</button>
          <button class="quick-country-btn" data-country="GB" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">\u{1F1EC}\u{1F1E7} UK</button>
          <button class="quick-country-btn" data-country="PH" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">\u{1F1F5}\u{1F1ED} Philippines</button>
          <button class="quick-country-btn" data-country="JP" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">\u{1F1EF}\u{1F1F5} Japan</button>
          <button class="quick-country-btn" data-country="AU" style="padding: 6px 12px; background: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s ease;">\u{1F1E6}\u{1F1FA} Australia</button>
        </div>
        
        <!-- Search Results Container - Hidden since we're not using real-time search -->
        <div class="search-results-container" id="search-results-container" style="display: none;">
          <!-- Search results functionality removed for better user experience -->
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
  `,m=document.querySelector(".header-searchbar-root");m||((m=document.createElement("div")).className="header-searchbar-root",document.body.insertBefore(m,document.body.firstChild)),m.innerHTML=y,function(n){let y=document.getElementById("city-search"),m=document.getElementById("search-btn"),h=document.getElementById("cities-chips"),f=document.getElementById("scroll-left"),g=document.getElementById("scroll-right"),x=document.getElementById("country-button");y&&(console.log("Found search input:",y),y.setAttribute("autocomplete","off"),y.setAttribute("spellcheck","false"),y.setAttribute("type","text"),y.setAttribute("inputmode","text"),y.removeAttribute("disabled"),y.removeAttribute("readonly"),y.style.pointerEvents="auto",y.style.userSelect="auto",y.style.caretColor="#000",y.form&&y.form.removeAttribute("autocomplete"),y.addEventListener("keypress",e=>{if("Enter"===e.key){let e=y.value.trim();e&&o(e,n,!0)}}),y.addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase();t.length>=2?function(e,t){let a=document.getElementById("country-dropdown-container");if(!a)return;let n=[];i.forEach(t=>{t.name.toLowerCase().includes(e)&&n.push({type:"country",name:t.name,code:t.code,display:`${t.name} (${t.code})`}),t.cities.forEach(a=>{a.toLowerCase().includes(e)&&n.push({type:"city",name:a,country:t.name,code:t.code,display:`${a}, ${t.name}`})})});let r=n.slice(0,10);r.length>0?(a.innerHTML=r.map(e=>`
      <div class="dropdown-item" data-type="${e.type}" data-name="${e.name}" data-country="${e.country||""}" data-code="${e.code}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">${e.display}</div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: ${"city"===e.type?"#e3f2fd":"#f3e5f5"}; color: ${"city"===e.type?"#1976d2":"#7b1fa2"}; border-radius: 12px; font-weight: 500; font-size: 11px;">
            ${"city"===e.type?"\uD83C\uDFD9️ City":"\uD83C\uDF0D Country"}
          </span>
        </div>
      </div>
    `).join(""),a.style.display="block",a.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{let a=e.dataset.name,i=e.dataset.country,n=e.dataset.code;"city"===e.dataset.type?(i?searchInput.value=`${i} - ${a}`:searchInput.value=a,t&&o(a,t,!0)):(searchInput.value=a,searchInput.placeholder=`Search cities in ${a}...`,searchInput.focus(),p(n,a,t)),c()}),e.addEventListener("mouseenter",()=>{if(e.style.backgroundColor="#f8f9fa",e.style.transform="translateX(4px)",e.style.boxShadow="0 2px 8px rgba(0,0,0,0.1)","country"===e.dataset.type){clearTimeout(e.hoverTimeout),e.style.borderLeft="4px solid #1976d2",e.style.paddingLeft="16px",e.style.backgroundColor="#e3f2fd",e.classList.add("country-hover");let a=document.createElement("div");a.className="auto-select-countdown",a.style.cssText="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: #1976d2; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; animation: countdown-pulse 0.5s ease-in-out infinite;",a.textContent="3",e.appendChild(a);let i=3,n=setInterval(()=>{a.textContent=--i,i<=0&&(clearInterval(n),a.remove())},167);e.hoverTimeout=setTimeout(()=>{let a=e.dataset.name,i=e.dataset.code;e.classList.add("auto-select"),searchInput.value=a,searchInput.placeholder=`Search cities in ${a}...`,searchInput.focus(),p(i,a,t),setTimeout(()=>{e.classList.remove("auto-select")},1e3)},500)}}),e.addEventListener("mouseleave",()=>{if(e.style.backgroundColor="white",e.style.transform="translateX(0)",e.style.boxShadow="none",e.hoverTimeout&&clearTimeout(e.hoverTimeout),"country"===e.dataset.type){e.style.borderLeft="none",e.style.paddingLeft="20px",e.style.backgroundColor="white",e.classList.remove("country-hover");let t=e.querySelector(".auto-select-countdown");t&&t.remove()}})})):c()}(t,n):0===t.length?u(n):c()}),y.addEventListener("focus",()=>{0===y.value.trim().length&&u(n)}),y.addEventListener("blur",()=>{setTimeout(()=>c(),200)}),setTimeout(()=>{y.focus(),console.log("Clean input field initialized and focused")},100)),m&&(m.addEventListener("click",()=>{let e=y.value.trim();if(e){let t=m.innerHTML;m.innerHTML='<span style="color: white !important; font-size: 16px !important;">⏳</span>',m.style.background="#666 !important",m.disabled=!0,o(e,n,!0),setTimeout(()=>{m.innerHTML=t,m.style.background="#1976d2 !important",m.disabled=!1},2e3)}}),m.addEventListener("mouseenter",()=>{m.style.transform="scale(1.05)",m.style.boxShadow="0 4px 16px rgba(25, 118, 210, 0.4)"}),m.addEventListener("mouseleave",()=>{m.style.transform="scale(1)",m.style.boxShadow="0 2px 8px rgba(25, 118, 210, 0.3)"})),document.querySelectorAll(".quick-country-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.country,a=i.find(e=>e.code===t);a&&(y.value=a.name,y.placeholder=`Search cities in ${a.name}...`,y.focus(),p(t,a.name,n),e.style.background="#1976d2",e.style.color="white",e.style.transform="scale(1.05)",e.style.boxShadow="0 4px 12px rgba(25, 118, 210, 0.4)",setTimeout(()=>{e.style.background="#e3f2fd",e.style.color="#1976d2",e.style.transform="scale(1)",e.style.boxShadow="none"},1e3))}),e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-2px)",e.style.boxShadow="0 4px 12px rgba(25, 118, 210, 0.3)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="none"})});let b=document.getElementById("main-search-btn"),v=document.getElementById("clear-search-btn");b&&(b.addEventListener("click",()=>{let e=y.value.trim();if(e){let t=b.innerHTML;b.innerHTML="<span>⏳</span> Searching...",b.style.background="linear-gradient(135deg, #666, #555)",b.disabled=!0,o(e,n,!0),setTimeout(()=>{b.innerHTML=t,b.style.background="linear-gradient(135deg, #1976d2, #1565c0)",b.disabled=!1},2e3)}else b.style.background="linear-gradient(135deg, #f44336, #d32f2f)",b.innerHTML="<span>❌</span> Enter a city/country",setTimeout(()=>{b.style.background="linear-gradient(135deg, #1976d2, #1565c0)",b.innerHTML="<span>\uD83D\uDD0D</span> Search"},2e3)}),b.addEventListener("mouseenter",()=>{b.style.transform="translateY(-3px) scale(1.02)",b.style.boxShadow="0 8px 25px rgba(25, 118, 210, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)",b.style.background="linear-gradient(135deg, #1565c0, #1976d2, #42a5f5)"}),b.addEventListener("mouseleave",()=>{b.style.transform="translateY(0) scale(1)",b.style.boxShadow="0 6px 20px rgba(25, 118, 210, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1)",b.style.background="linear-gradient(135deg, #1976d2, #1565c0, #0d47a1)"})),v&&(v.addEventListener("click",()=>{y.value="",y.placeholder="Search for a city or country...",c(),y.focus(),v.style.background="#4caf50",v.style.color="white",v.innerHTML="✓ Cleared",setTimeout(()=>{v.style.background="#f5f5f5",v.style.color="#666",v.innerHTML="Clear"},1e3)}),v.addEventListener("mouseenter",()=>{v.style.background="linear-gradient(135deg, #e0e0e0, #d0d0d0)",v.style.transform="translateY(-2px) scale(1.02)",v.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)",v.style.color="#333"}),v.addEventListener("mouseleave",()=>{v.style.background="linear-gradient(135deg, #f5f5f5, #e0e0e0)",v.style.transform="translateY(0) scale(1)",v.style.boxShadow="0 2px 8px rgba(0,0,0,0.1)",v.style.color="#555"})),h&&h.addEventListener("click",i=>{var s;i.target.classList.contains("header-city-chip")?o(i.target.dataset.city,n):i.target.classList.contains("chip-close")&&(s=i.target.dataset.city,e=e.filter(e=>e!==s),a=a.filter(e=>e!==s),t===s&&(t=e[0]||"Kyiv"),r())}),f&&f.addEventListener("click",()=>{console.log("Left scroll arrow clicked");let e=Math.min(200,h.scrollLeft);h.scrollBy({left:-e,behavior:"smooth"}),l()}),g&&g.addEventListener("click",()=>{console.log("Right scroll arrow clicked");let e=Math.min(200,h.scrollWidth-h.clientWidth-h.scrollLeft);h.scrollBy({left:e,behavior:"smooth"}),l()}),x&&(x.addEventListener("click",()=>{let e=t;e&&(alert(`Country information for ${e} would be displayed here.`),d())}),x.addEventListener("dblclick",()=>{!function(){let e=document.getElementById("cities-chips"),t=document.getElementById("country-button");if(!e)return;t&&(t.classList.add("scrolling"),setTimeout(()=>{t.classList.remove("scrolling")},1500));let a=e.querySelectorAll(".header-city-chip");if(0===a.length)return;let i=e.querySelector(".header-city-chip.selected");if(!i)return;let n=(Array.from(a).indexOf(i)+1)%a.length,o=a[n];o&&(o.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),o.dataset.city&&setTimeout(()=>{o.click()},300))}()})),s(),h.addEventListener("scroll",s),h.addEventListener("keydown",e=>{if("ArrowLeft"===e.key)e.preventDefault(),f.click();else if("ArrowRight"===e.key)e.preventDefault(),g.click();else if("Enter"===e.key&&e.target.classList.contains("header-city-chip")){let t=e.target.dataset.city;t&&o(t,n)}});let w=document.getElementById("pagination-prev"),k=document.getElementById("pagination-next");w&&w.addEventListener("click",()=>{console.log("Previous page clicked")}),k&&k.addEventListener("click",()=>{console.log("Next page clicked")});let $=0,D=!1;h.addEventListener("touchstart",e=>{$=e.touches[0].clientX,D=!0}),h.addEventListener("touchmove",e=>{if(!D)return;e.preventDefault();let t=e.touches[0].clientX,a=$-t;h.scrollLeft+=a,$=t}),h.addEventListener("touchend",()=>{D=!1})}(n)}function o(i,n,s=!1){t=i,d(),e.includes(i)||a.includes(i)?e.includes(i)&&((e=e.filter(e=>e!==i)).unshift(i),r()):(s?a.push(i):(e.unshift(i),e.length>10&&e.pop()),r());let l=document.getElementById("city-search");l&&!l.value.includes(" - ")&&(l.value=""),n&&n(i)}function r(){let i=document.getElementById("cities-chips");i&&(i.innerHTML=[...e.map(e=>`
      <button class="header-city-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `),...a.map(e=>`
      <button class="header-city-chip hidden-chip ${e===t?"selected":""}" data-city="${e}">
        ${e}
        <span class="chip-close" data-city="${e}">\xd7</span>
      </button>
    `)].join(""))}function s(){let e=document.getElementById("cities-chips"),t=document.getElementById("scroll-left"),a=document.getElementById("scroll-right");if(e&&t&&a){let i=e.scrollLeft<=5,n=e.scrollLeft>=e.scrollWidth-e.clientWidth-5,o=e.scrollWidth>e.clientWidth;t.style.display=i||!o?"none":"flex",a.style.display=n||!o?"none":"flex",t.style.opacity=i?"0.5":"1",a.style.opacity=n?"0.5":"1"}}function l(){let e=document.getElementById("country-button");e?(console.log("Showing country button"),e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(-50%) scale(1)",e.style.animation="fadeInScale 0.3s ease-out",e.style.zIndex="1000",e.title='Country Info - Double click or press "N" to scroll to next country',console.log("Country button styles applied:",{display:e.style.display,opacity:e.style.opacity,visibility:e.style.visibility})):console.log("Country button not found")}function d(){let e=document.getElementById("country-button");e&&(console.log("Hiding country button"),e.style.animation="fadeOutScale 0.3s ease-out",e.style.opacity="0",setTimeout(()=>{e.style.display="none",e.style.visibility="hidden"},300))}function c(){let e=document.getElementById("country-dropdown-container");e&&(e.style.display="none")}function u(e){let t=document.getElementById("country-dropdown-container");t&&(t.innerHTML=`
    <div style="padding: 16px 20px; border-bottom: 2px solid #e3f2fd; background: #f8f9fa;">
      <div style="font-weight: 700; color: #1976d2; font-size: 14px; margin-bottom: 12px; text-align: center;">\u{1F30D} Popular Countries</div>
    </div>
    ${[{name:"United States",code:"US",cities:["New York","Los Angeles","Chicago"]},{name:"United Kingdom",code:"GB",cities:["London","Birmingham","Manchester"]},{name:"Philippines",code:"PH",cities:["Manila","Quezon City","Davao City"]},{name:"Japan",code:"JP",cities:["Tokyo","Osaka","Nagoya"]},{name:"Australia",code:"AU",cities:["Sydney","Melbourne","Brisbane"]},{name:"Canada",code:"CA",cities:["Toronto","Montreal","Vancouver"]},{name:"Germany",code:"DE",cities:["Berlin","Hamburg","Munich"]},{name:"France",code:"FR",cities:["Paris","Marseille","Lyon"]}].map(e=>`
      <div class="dropdown-item popular-country" data-type="country" data-name="${e.name}" data-code="${e.code}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">${({US:"\uD83C\uDDFA\uD83C\uDDF8",GB:"\uD83C\uDDEC\uD83C\uDDE7",PH:"\uD83C\uDDF5\uD83C\uDDED",JP:"\uD83C\uDDEF\uD83C\uDDF5",AU:"\uD83C\uDDE6\uD83C\uDDFA",CA:"\uD83C\uDDE8\uD83C\uDDE6",DE:"\uD83C\uDDE9\uD83C\uDDEA",FR:"\uD83C\uDDEB\uD83C\uDDF7",IT:"\uD83C\uDDEE\uD83C\uDDF9",ES:"\uD83C\uDDEA\uD83C\uDDF8",NL:"\uD83C\uDDF3\uD83C\uDDF1",SE:"\uD83C\uDDF8\uD83C\uDDEA",NO:"\uD83C\uDDF3\uD83C\uDDF4",DK:"\uD83C\uDDE9\uD83C\uDDF0",FI:"\uD83C\uDDEB\uD83C\uDDEE",CH:"\uD83C\uDDE8\uD83C\uDDED",AT:"\uD83C\uDDE6\uD83C\uDDF9",BE:"\uD83C\uDDE7\uD83C\uDDEA"})[e.code]||"\uD83C\uDF0D"}</span>
          ${e.name} (${e.code})
        </div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: #f3e5f5; color: #7b1fa2; border-radius: 12px; font-weight: 500; font-size: 11px;">
            \u{1F30D} Country
          </span>
          <span style="color: #666;">${e.cities.length} major cities</span>
        </div>
      </div>
    `).join("")}
  `,t.style.display="block",t.querySelectorAll(".popular-country").forEach(t=>{t.addEventListener("click",()=>{let a=t.dataset.name,i=t.dataset.code;searchInput.value=a,searchInput.focus(),p(i,a,e)}),t.addEventListener("mouseenter",()=>{t.style.backgroundColor="#f8f9fa",t.style.transform="translateX(4px)",t.style.boxShadow="0 2px 8px rgba(0,0,0,0.1)",clearTimeout(t.hoverTimeout),t.style.borderLeft="4px solid #1976d2",t.style.paddingLeft="16px",t.style.backgroundColor="#e3f2fd",t.classList.add("country-hover");let a=document.createElement("div");a.className="auto-select-countdown",a.style.cssText="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: #1976d2; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; animation: countdown-pulse 0.5s ease-in-out infinite;",a.textContent="3",t.appendChild(a);let i=3,n=setInterval(()=>{a.textContent=--i,i<=0&&(clearInterval(n),a.remove())},167);t.hoverTimeout=setTimeout(()=>{let a=t.dataset.name,i=t.dataset.code;t.classList.add("auto-select"),searchInput.value=a,searchInput.placeholder=`Search cities in ${a}...`,searchInput.focus(),p(i,a,e),setTimeout(()=>{t.classList.remove("auto-select")},1e3)},500)}),t.addEventListener("mouseleave",()=>{t.style.backgroundColor="white",t.style.transform="translateX(0)",t.style.boxShadow="none",t.hoverTimeout&&clearTimeout(t.hoverTimeout),t.style.borderLeft="none",t.style.paddingLeft="20px",t.style.backgroundColor="white",t.classList.remove("country-hover");let e=t.querySelector(".auto-select-countdown");e&&e.remove()})}))}function p(e,t,a){let n=i.find(t=>t.code===e);if(!n)return;let r=document.getElementById("country-dropdown-container");if(!r)return;r.innerHTML=`
    <div style="padding: 16px 20px; border-bottom: 2px solid #e3f2fd; background: #f8f9fa;">
      <div style="font-weight: 700; color: #1976d2; font-size: 14px; margin-bottom: 12px; text-align: center; display: flex; align-items: center; justify-content: space-between;">
        <span>\u{1F3D9}\u{FE0F} Cities in ${t}</span>
        <button class="back-to-countries" style="padding: 4px 8px; background: #1976d2; color: white; border: none; border-radius: 6px; font-size: 11px; cursor: pointer; font-weight: 500;">\u{2190} Back</button>
      </div>
    </div>
    ${n.cities.map(a=>`
      <div class="dropdown-item" data-type="city" data-name="${a}" data-country="${t}" data-code="${e}" style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; background: white;">
        <div style="font-weight: 600; color: #333; font-size: 14px; margin-bottom: 4px;">${a}</div>
        <div style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 8px;">
          <span style="padding: 4px 8px; background: #e3f2fd; color: #1976d2; border-radius: 12px; font-weight: 500; font-size: 11px;">
            \u{1F3D9}\u{FE0F} City in ${t}
          </span>
        </div>
      </div>
    `).join("")}
  `,r.style.display="block";let s=r.querySelector(".back-to-countries");s&&s.addEventListener("click",()=>{u(a)}),r.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.name,i=e.dataset.country;searchInput.value=`${i} - ${t}`,a&&o(t,a,!0),c()}),e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#f8f9fa",e.style.transform="translateX(4px)",e.style.boxShadow="0 2px 8px rgba(0,0,0,0.1)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="white",e.style.transform="translateX(0)",e.style.boxShadow="none"})})}const y="ccac33176c75e16a3b3c977b0ca6365c",m="https://api.openweathermap.org/data/2.5/";async function h(e){let t=`${m}weather?q=${encodeURIComponent(e)}&appid=${y}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function f(e){let t=`${m}forecast?q=${encodeURIComponent(e)}&appid=${y}&units=metric`,a=await fetch(t);if(!a.ok)throw Error("City not found");return a.json()}async function g(e,t,a){for(let i of[`${e} ${a||""} ${t||""} cityscape skyline`.trim(),`${e} ${a||""} cityscape skyline`.trim(),`${e} ${t||""} cityscape`.trim(),`${e} cityscape skyline`,`${e} city`]){if(!i.trim())continue;let e=`https://pixabay.com/api/?key=51325887-dff4e6da46d9f05f769d357a1&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&category=places&per_page=5&safesearch=true&min_width=1200&min_height=800`;try{let t=await fetch(e);if(!t.ok)continue;let a=await t.json();if(a.hits&&a.hits.length>0){let e=a.hits.find(e=>e.largeImageURL&&e.imageWidth>=1200&&e.imageHeight>=800)||a.hits[0];return e.largeImageURL||e.webformatURL}}catch(e){continue}}return null}const x=[{text:"Wherever you go, no matter what the weather, always bring your own sunshine.",author:"Anthony J. D'Angelo"},{text:"Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating.",author:"John Ruskin"},{text:"There is no such thing as bad weather, only different kinds of good weather.",author:"John Ruskin"},{text:"Some people feel the rain. Others just get wet.",author:"Bob Marley"},{text:"To appreciate the beauty of a snowflake it is necessary to stand out in the cold.",author:"Aristotle"},{text:"Climate is what we expect, weather is what we get.",author:"Mark Twain"},{text:"The sound of the rain needs no translation.",author:"Alan Watts"}];let b="",v="today",w=!1,k=!1,$="";function D(e,t){let a="",i="";"today"===v?e?(a=function(e){if(!e)return'<div class="error">No weather data available.</div>';let{name:t,main:a,weather:i,sys:n}=e,o=Math.round(a.temp),r=Math.round(a.temp_min),s=Math.round(a.temp_max),l=i[0].description,d=i[0].icon,c=n&&n.country?n.country:"",u={TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand"}[c]||c,p=window.innerWidth<=768;return`
    <section class="today-weather-card">
      <div class="weather-card-overlay">
        <div class="weather-card-header">
          <div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;">
            <span class="weather-city">${t}</span>
            ${u?`<span style="font-size:${p?"0.85rem":"0.95rem"};color:#ffd54f;font-weight:500;opacity:0.9;letter-spacing:0.3px;">${u}</span>`:""}
          </div>
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${d}@2x.png" alt="${l}" />
        </div>
        <div class="weather-temp-main">${o}&deg;C</div>
        <div class="weather-minmax">min <b>${r}&deg;</b> &nbsp; max <b>${s}&deg;</b></div>
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
    `);let o="";if("today"===v)o=e?"":'<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the weather.</div></div>';else if("fiveDays"===v)if(t){let a="";if(e&&e.sys&&e.sys.country){let t=e.sys.country;a=({TH:"Thailand",US:"United States",GB:"United Kingdom",FR:"France",UA:"Ukraine",PL:"Poland",AU:"Australia",CA:"Canada",DE:"Germany",IT:"Italy",ES:"Spain",JP:"Japan",CN:"China",IN:"India",BR:"Brazil",MX:"Mexico",RU:"Russia",KR:"South Korea",NL:"Netherlands",SE:"Sweden",NO:"Norway",DK:"Denmark",FI:"Finland",CH:"Switzerland",AT:"Austria",BE:"Belgium",PT:"Portugal",GR:"Greece",IE:"Ireland",NZ:"New Zealand",VN:"Vietnam",SG:"Singapore",MY:"Malaysia",ID:"Indonesia",PH:"Philippines",TR:"Turkey",SA:"Saudi Arabia",AE:"United Arab Emirates",EG:"Egypt",ZA:"South Africa",NG:"Nigeria",KE:"Kenya",MA:"Morocco",TN:"Tunisia",DZ:"Algeria",LY:"Libya",SD:"Sudan",ET:"Ethiopia",GH:"Ghana",CI:"Ivory Coast",SN:"Senegal",ML:"Mali",BF:"Burkina Faso",NE:"Niger",TD:"Chad",CF:"Central African Republic",CM:"Cameroon",GQ:"Equatorial Guinea",GA:"Gabon",CG:"Republic of the Congo",CD:"Democratic Republic of the Congo",AO:"Angola",ZM:"Zambia",ZW:"Zimbabwe",BW:"Botswana",NA:"Namibia",SZ:"Eswatini",LS:"Lesotho",MG:"Madagascar",MU:"Mauritius",SC:"Seychelles",KM:"Comoros",DJ:"Djibouti",SO:"Somalia",ER:"Eritrea",SS:"South Sudan",RW:"Rwanda",BI:"Burundi",TZ:"Tanzania",UG:"Uganda",MZ:"Mozambique",MW:"Malawi"})[t]||t}o=function(e,t=!1,a=!1,i="",n=""){if(!e||!e.list)return'<div class="error">No forecast data available.</div>';let o={};e.list.forEach(e=>{let t=e.dt_txt.split(" ")[0];o[t]||(o[t]=[]),o[t].push(e)});let r=Object.keys(o).map(e=>{let t=o[e].find(e=>e.dt_txt.includes("12:00:00"))||o[e][0],a=o[e].map(e=>e.main.temp),i=Math.round(Math.min(...a)),n=Math.round(Math.max(...a));return{date:e,...t,min:i,max:n,all:o[e]}}).slice(0,5);r=r.sort((e,t)=>{let a=e=>new Date(e).getDay(),i=a(e.date),n=a(t.date);return 0===i&&0!==n?-1:0!==i&&0===n?1:i-n});let s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=i?`
    <div class="forecast-location-header" style="text-align:center; margin-bottom:24px; padding:0 16px;">
      <div class="forecast-city-name" style="font-size:1.4rem; font-weight:700; color:#fff; margin-bottom:4px; letter-spacing:0.5px;">${i}</div>
      ${n?`<div class="forecast-country-name" style="font-size:1rem; color:#ffd54f; font-weight:500; opacity:0.9; letter-spacing:0.3px;">${n}</div>`:""}
    </div>
  `:"";return`
    <section class="five-days-forecast">
      ${l}
      <div class="forecast-cards">
        ${r.map((e,a)=>{e.main.temp;let i=e.weather[0].description,n=e.weather[0].icon,o=new Date(e.date),r=s[o.getDay()],l=o.toDateString()===new Date().toDateString();return`
            <div class="forecast-card" data-date="${e.date}" data-expanded="${t}">
              <div class="forecast-day${l?" today":""}">${r}</div>
              <div class="forecast-date">${e.date.slice(8,10)} ${o.toLocaleString("default",{month:"short"})}</div>
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
  `}(t,w,k,b,a),k&&(o+=function(e){if(!e||!e.list)return"";let t={};e.list.forEach(e=>{let a=e.dt_txt.split(" ")[0];t[a]||(t[a]=[]),t[a].push(e)});let a=Object.keys(t).map(e=>{let a=t[e].find(e=>e.dt_txt.includes("12:00:00"))||t[e][0];return{date:e,temp:Math.round(a.main.temp),humidity:a.main.humidity,wind:Math.round(10*a.wind.speed)/10,pressure:10*Math.round(a.main.pressure/10)}}).slice(0,5);if(a.length<2)return`<div class='forecast-chart-section' style='background:linear-gradient(135deg,#1a2332 0%,#26334d 50%,#202a3a 100%);border-radius:20px;padding:40px 32px;box-shadow:0 12px 40px rgba(0,0,0,0.25),0 6px 20px rgba(0,0,0,0.2);max-width:720px;width:100%;margin:32px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(10px);'>
      <div style='font-size:1.25rem;font-weight:700;color:#fff;letter-spacing:0.8px;text-align:center;margin-bottom:12px;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.3);'>5-Day Weather Analytics</div>
      <div style='color:#fff;opacity:0.75;font-size:1.1rem;text-align:center;margin:32px 0;font-weight:500;letter-spacing:0.3px;'>Insufficient data to generate comprehensive chart.</div>
    </div>`;let i=window.innerWidth<=768,n=i?360:720,o=i?280:400,r=i?50:70,s=a.map(e=>e.temp),l=a.map(e=>e.humidity),d=a.map(e=>e.wind),c=a.map(e=>e.pressure),u=s.concat(l,d,c),p=Math.floor(.95*Math.min(...u)),y=Math.ceil(1.05*Math.max(...u));function m(e){return r+(y-e)/(y-p)*(o-2*r)}function h(e){return r+e*((n-2*r)/(a.length-1))}let f=s.map((e,t)=>({x:h(t),y:m(e)})),g=l.map((e,t)=>({x:h(t),y:m(e)})),x=d.map((e,t)=>({x:h(t),y:m(e)})),b=c.map((e,t)=>({x:h(t),y:m(e)}));function v(e){if(e.length<2)return"";let t=`M${e[0].x},${e[0].y}`;for(let a=1;a<e.length;a++){let i=e[a-1],n=e[a],o=(i.x+n.x)/2;t+=` C${o},${i.y} ${o},${n.y} ${n.x},${n.y}`}return t}let w=v(f),k=v(g),$=v(x),D=v(b),C=a.map(e=>{let t=new Date(e.date),a=t.getFullYear();if(i){let e=t.toLocaleDateString("en-US",{weekday:"short"}).substring(0,3);return`${e} '${a.toString().slice(-2)}`}{let e=t.toLocaleDateString("en-US",{weekday:"short"});return`${e} '${a.toString().slice(-2)}`}}),E=i?5:6,S=Array.from({length:E},(e,t)=>p+t*(y-p)/(E-1));return`
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
        <svg width="100%" height="${o}" viewBox="0 0 ${n} ${o}" class="forecast-chart" style="background:none;max-width:100%;display:block;margin:0 auto;">
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
          <rect x="0" y="0" width="${n}" height="${o}" fill="url(#chartBg)" rx="20"/>
          
          <!-- Grid lines -->
          ${S.map((e,t)=>`<line x1="${r}" y1="${r+t*(o-2*r)/(E-1)}" x2="${n-r}" y2="${r+t*(o-2*r)/(E-1)}" stroke="#fff" stroke-width="0.8" opacity="0.08" />`).join("")}
          ${f.map((e,t)=>`<line x1="${e.x}" y1="${r}" x2="${e.x}" y2="${o-r}" stroke="#fff" stroke-width="0.6" opacity="0.06" />`).join("")}
          
          <!-- X and Y axis lines -->
          <line x1="${r}" y1="${r}" x2="${n-r}" y2="${r}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          <line x1="${r}" y1="${r}" x2="${r}" y2="${o-r}" stroke="#fff" stroke-width="1.2" opacity="0.2" />
          
          <!-- Y axis labels -->
          ${S.map((e,t)=>`<text x="${r-24}" y="${r+t*(o-2*r)/(E-1)+3}" text-anchor="end" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${e.toFixed(0)}</text>`).join("")}
          
          <!-- X axis labels -->
          ${f.map((e,t)=>`<text x="${e.x}" y="${o-r+22}" text-anchor="middle" font-size="5" font-weight="700" fill="#fff" opacity="0.9" font-family='Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif stroke="#000" stroke-width="1" letter-spacing="0.3" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${C[t]}</text>`).join("")}
          
          <!-- Temperature line with gradient -->
          <path d="${w}" fill="none" stroke="url(#tempGradient)" stroke-width="${i?"4":"5"}" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${f.map(e=>`<circle class="chart-point" cx="${e.x}" cy="${e.y}" r="${i?"6":"8"}" fill="#26334d" stroke="url(#tempGradient)" stroke-width="3" filter="url(#glowEffect)" style="transition:all 0.2s ease;" />`).join("")}
          
          <!-- Humidity line with gradient -->
          <path d="${k}" fill="none" stroke="url(#humidityGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${g.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#humidityGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Wind line with gradient -->
          <path d="${$}" fill="none" stroke="url(#windGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="3 8" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${x.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#windGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
          
          <!-- Pressure line with gradient -->
          <path d="${D}" fill="none" stroke="url(#pressureGradient)" stroke-width="${i?"3":"4"}" stroke-dasharray="2 6" stroke-linecap="round" stroke-linejoin="round" filter="url(#chartDropShadow)" />
          ${b.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="${i?"5":"6"}" fill="#26334d" stroke="url(#pressureGradient)" stroke-width="2.5" filter="url(#glowEffect)" />`).join("")}
        </svg>
      </div>
    </div>
  `}(t))}else o='<div class="welcome-centered"><div class="welcome-message">Please search for a city to see the forecast.</div></div>';let r="";if(e){let t=new Date,a=t.toLocaleString("en-US",{weekday:"short"}),i=t.getDate(),n=t.toLocaleString("en-US",{month:"long"}),o=t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),s="",l="";e.sys&&e.sys.sunrise&&e.sys.sunset&&(s=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),l=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),r=`
      <div class="date-time-section">
        <div class="date-big"><span class="date-num">${i}<sup>th</sup></span> <span class="date-day">${a}</span></div>
        <div class="date-month">${n}</div>
        <div class="date-time-row">
          <span class="date-time-clock">${o}</span>
          <span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>${s}</span>
          <span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>${l}</span>
        </div>
      </div>
    `}else r=`<div class="date-time-section"><div class="date-big"><span class="date-num">--<sup>th</sup></span> <span class="date-day">---</span></div><div class="date-month">------</div><div class="date-time-row"><span class="date-time-clock">--:--</span><span class="date-sunrise"><span class="sun-icon">\u{1F305}</span>--:--</span><span class="date-sunset"><span class="sunset-icon">\u{1F307}</span>--:--</span></div></div>`;let s=function(){let e=x[Math.floor(Math.random()*x.length)];return`<div class="quote-section">\u{201C}${e.text}\u{201D}<br><span class="quote-author">\u{2014} ${e.author}</span></div>`}(),l=document.getElementById("app");window.innerWidth,"fiveDays"===v?l.innerHTML=`
      <div id="header-root"></div>
      ${i}
      ${o}
    `:l.innerHTML=`
      <div id="header-root"></div>
      <div class="weather-right-group">
        ${a}
        ${i}
      </div>
      ${o}
      ${"today"===v?r:""}
      ${"today"===v?s:""}
    `;let d=document.querySelector(".today-weather-card"),c=document.getElementById("nav-buttons");"today"===v?(d&&d.classList.add("right-align"),c&&c.classList.add("right-align")):(d&&d.classList.remove("right-align"),c&&c.classList.remove("right-align")),n(async e=>{v="today",k=!1,await E(e)});let u=document.getElementById("header-root");u||((u=document.createElement("div")).id="header-root",document.querySelector(".header-searchbar-root").appendChild(u));let p=document.getElementById("btn-today"),y=document.getElementById("btn-five-days");if(p&&(p.onclick=()=>{"today"!==v&&(v="today",k=!1,E(b))}),y&&(y.onclick=()=>{"fiveDays"!==v&&(v="fiveDays",k=!1,E(b))}),"fiveDays"===v&&t){document.querySelectorAll(".more-info-btn").forEach(e=>{e.onclick=e=>{w=!w,E(b)}});let e=document.getElementById("show-chart-btn");e&&(e.onclick=t=>{let a=document.createElement("span");a.className="ripple";let i=e.getBoundingClientRect();a.style.width=a.style.height=Math.max(i.width,i.height)+"px",a.style.left=t.clientX-i.left-i.width/2+"px",a.style.top=t.clientY-i.top-i.height/2+"px",e.appendChild(a),setTimeout(()=>a.remove(),600),k=!k,E(b)})}}async function C(e,t,a){let i=document.querySelector(".background-overlay");if(!e){document.body.style.backgroundImage="",i&&(i.style.backgroundImage="",i.style.opacity="0");return}i&&(i.style.opacity="0.3",i.style.transition="opacity 0.5s ease-in-out");let n=await g(e,t,a);n?i?(i.style.display="block",i.style.backgroundImage=`url('${n}')`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.style.backgroundRepeat="no-repeat",i.style.opacity="0.6",i.style.transition="opacity 0.8s ease-in-out"):(document.body.style.backgroundImage=`url('${n}')`,document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat"):(i&&(i.style.display="none",i.style.backgroundImage="",i.style.opacity="0"),document.body.style.backgroundImage="")}async function E(e){b=e;let t=null,a=null;if($="",S(!0),e)try{t=await h(e),a=await f(e);let i=t&&t.weather&&t.weather[0]?t.weather[0].main:"",n=t&&t.sys&&t.sys.country?t.sys.country:"";i=i?i.toLowerCase():"",C(e.split(",")[0],i,n)}catch(e){$="City or country not found. Please try another.",D(null,null),C(null,null,null),S(!1),function(e){let t=document.querySelector(".error-message-overlay");t&&t.remove();let a=document.createElement("div");a.className="error-message-overlay",a.innerHTML=`
    <div class="error-message-content">
      <div class="error-icon">\u{26A0}\u{FE0F}</div>
      <div class="error-text">${e}</div>
    </div>
  `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&(a.style.opacity="0",a.style.transform="translateY(-20px)",setTimeout(()=>{a.parentNode&&a.remove()},300))},3e3)}($);return}else C(null,null,null);S(!1),D(t,a)}function S(e){let t=document.querySelector(".loading-overlay");e?(t||(t=function(){let e=document.createElement("div");return e.className="loading-overlay",e.innerHTML=`
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Searching weather data...</div>
    </div>
  `,document.body.appendChild(e),e}()),t.style.display="flex"):t&&(t.style.display="none")}window.addEventListener("DOMContentLoaded",()=>{E("Kyiv,UA"),n(async e=>{v="today",k=!1,await E(e)})});
//# sourceMappingURL=weather-app.a398f837.js.map
