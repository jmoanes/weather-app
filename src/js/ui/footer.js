import { getTranslation, getCurrentLanguage, getAvailableLanguages, getLanguageName, getLanguageFlag } from '../i18n.js';

export function renderFooter() {
  const currentLang = getCurrentLanguage();
  const availableLanguages = getAvailableLanguages();
  
  const footerHTML = `
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-main">
          <div class="footer-section">
            <h3 class="footer-title">Weather Dashboard Pro</h3>
            <p class="footer-description">Your comprehensive weather companion providing real-time forecasts, detailed analytics, and beautiful visualizations. Stay informed with accurate weather data powered by advanced meteorological technology.</p>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">${getTranslation('language')}</h4>
            <div class="language-selector">
              <button class="language-btn current" data-lang="${currentLang}">
                ${getLanguageFlag(currentLang)} ${getLanguageName(currentLang)}
              </button>
              <div class="language-dropdown">
                ${availableLanguages.map(lang => 
                  lang !== currentLang ? 
                    `<button class="language-option" data-lang="${lang}">
                      ${getLanguageFlag(lang)} ${getLanguageName(lang)}
                    </button>` : ''
                ).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-info">
            <span class="footer-text">Made with ❤️ by Weather Dashboard Team</span>
            <span class="footer-version">Version 2.0 • Powered by OpenWeatherMap API</span>
          </div>
        </div>
      </div>
    </footer>
  `;
  
  return footerHTML;
}

export function initFooter() {
  // Add event listeners for language switching
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('language-option')) {
      const lang = e.target.dataset.lang;
      if (lang) {
        // Import and call setLanguage function
        import('../i18n.js').then(({ setLanguage }) => {
          setLanguage(lang);
        });
      }
    }
  });
  
  // Add event listener for language dropdown toggle
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('language-btn')) {
      const dropdown = e.target.nextElementSibling;
      if (dropdown && dropdown.classList.contains('language-dropdown')) {
        dropdown.classList.toggle('show');
      }
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
      const dropdowns = document.querySelectorAll('.language-dropdown');
      dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }
  });
}
