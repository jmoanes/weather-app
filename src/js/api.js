// OpenWeatherMap API logic
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

const API_KEY = 'ccac33176c75e16a3b3c977b0ca6365c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

/**
 * Fetch current weather data for a city
 * @param {string} cityName
 * @returns {Promise<Object>} Weather data
 */
export async function fetchCurrentWeather(cityName) {
  const url = `${BASE_URL}weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('City not found');
  return response.json();
}

/**
 * Fetch 5-day forecast data for a city
 * @param {string} cityName
 * @returns {Promise<Object>} Forecast data
 */
export async function fetchFiveDayForecast(cityName) {
  const url = `${BASE_URL}forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('City not found');
  return response.json();
}

// Pixabay API logic
const PIXABAY_API_KEY = '51325887-dff4e6da46d9f05f769d357a1'; // <-- Replace with your Pixabay API key
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

/**
 * Fetch a cityscape image from Pixabay for a given city and weather
 * @param {string} cityName
 * @param {string} [weatherDesc] - Optional weather description (e.g., 'cloudy', 'rainy')
 * @returns {Promise<string|null>} Image URL or null if not found
 */
export async function fetchCityscapeImage(cityName, weatherDesc, countryName) {
  // Try multiple search strategies for better results
  const searchQueries = [
    // Primary search with country and weather
    `${cityName} ${countryName || ''} ${weatherDesc || ''} cityscape skyline`.trim(),
    // City with country
    `${cityName} ${countryName || ''} cityscape skyline`.trim(),
    // Just city with weather
    `${cityName} ${weatherDesc || ''} cityscape`.trim(),
    // Simple city search
    `${cityName} cityscape skyline`,
    // Fallback to just city
    `${cityName} city`
  ];

  for (const query of searchQueries) {
    if (!query.trim()) continue;
    
    const url = `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&category=places&per_page=5&safesearch=true&min_width=1200&min_height=800`;
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        // Prefer high-quality images
        const bestImage = data.hits.find(hit => 
          hit.largeImageURL && 
          hit.imageWidth >= 1200 && 
          hit.imageHeight >= 800
        ) || data.hits[0];
        
        return bestImage.largeImageURL || bestImage.webformatURL;
      }
    } catch (e) {
      continue;
    }
  }
  
  return null;
} 