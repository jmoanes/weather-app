// Weather Icon Mapping System
// Maps OpenWeatherMap weather codes to realistic weather icons

export const weatherIcons = {
  // Clear sky
  800: {
    day: '☀️',
    night: '🌙',
    description: 'clear sky'
  },
  
  // Clouds
  801: {
    day: '🌤️',
    night: '🌤️',
    description: 'few clouds'
  },
  802: {
    day: '⛅',
    night: '⛅',
    description: 'scattered clouds'
  },
  803: {
    day: '☁️',
    night: '☁️',
    description: 'broken clouds'
  },
  804: {
    day: '☁️',
    night: '☁️',
    description: 'overcast clouds'
  },
  
  // Rain
  200: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with light rain'
  },
  201: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with rain'
  },
  202: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with heavy rain'
  },
  210: {
    day: '⚡',
    night: '⚡',
    description: 'light thunderstorm'
  },
  211: {
    day: '⚡',
    night: '⚡',
    description: 'thunderstorm'
  },
  212: {
    day: '⚡',
    night: '⚡',
    description: 'heavy thunderstorm'
  },
  221: {
    day: '⚡',
    night: '⚡',
    description: 'ragged thunderstorm'
  },
  230: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with light drizzle'
  },
  231: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with drizzle'
  },
  232: {
    day: '⛈️',
    night: '⛈️',
    description: 'thunderstorm with heavy drizzle'
  },
  
  // Drizzle
  300: {
    day: '🌦️',
    night: '🌦️',
    description: 'light intensity drizzle'
  },
  301: {
    day: '🌦️',
    night: '🌦️',
    description: 'drizzle'
  },
  302: {
    day: '🌦️',
    night: '🌦️',
    description: 'heavy intensity drizzle'
  },
  310: {
    day: '🌦️',
    night: '🌦️',
    description: 'light intensity drizzle rain'
  },
  311: {
    day: '🌦️',
    night: '🌦️',
    description: 'drizzle rain'
  },
  312: {
    day: '🌦️',
    night: '🌦️',
    description: 'heavy intensity drizzle rain'
  },
  313: {
    day: '🌦️',
    night: '🌦️',
    description: 'shower rain and drizzle'
  },
  314: {
    day: '🌦️',
    night: '🌦️',
    description: 'heavy shower rain and drizzle'
  },
  321: {
    day: '🌦️',
    night: '🌦️',
    description: 'shower drizzle'
  },
  
  // Rain
  500: {
    day: '🌦️',
    night: '🌦️',
    description: 'light rain'
  },
  501: {
    day: '🌦️',
    night: '🌦️',
    description: 'moderate rain'
  },
  502: {
    day: '🌧️',
    night: '🌧️',
    description: 'heavy intensity rain'
  },
  503: {
    day: '🌧️',
    night: '🌧️',
    description: 'very heavy rain'
  },
  504: {
    day: '🌧️',
    night: '🌧️',
    description: 'extreme rain'
  },
  511: {
    day: '🌨️',
    night: '🌨️',
    description: 'freezing rain'
  },
  520: {
    day: '🌦️',
    night: '🌦️',
    description: 'light intensity shower rain'
  },
  521: {
    day: '🌦️',
    night: '🌦️',
    description: 'shower rain'
  },
  522: {
    day: '🌧️',
    night: '🌧️',
    description: 'heavy intensity shower rain'
  },
  531: {
    day: '🌧️',
    night: '🌧️',
    description: 'ragged shower rain'
  },
  
  // Snow
  600: {
    day: '🌨️',
    night: '🌨️',
    description: 'light snow'
  },
  601: {
    day: '🌨️',
    night: '🌨️',
    description: 'snow'
  },
  602: {
    day: '❄️',
    night: '❄️',
    description: 'heavy snow'
  },
  611: {
    day: '🌨️',
    night: '🌨️',
    description: 'sleet'
  },
  612: {
    day: '🌨️',
    night: '🌨️',
    description: 'light shower sleet'
  },
  613: {
    day: '🌨️',
    night: '🌨️',
    description: 'shower sleet'
  },
  615: {
    day: '🌨️',
    night: '🌨️',
    description: 'light rain and snow'
  },
  616: {
    day: '🌨️',
    night: '🌨️',
    description: 'rain and snow'
  },
  620: {
    day: '🌨️',
    night: '🌨️',
    description: 'light shower snow'
  },
  621: {
    day: '🌨️',
    night: '🌨️',
    description: 'shower snow'
  },
  622: {
    day: '❄️',
    night: '❄️',
    description: 'heavy shower snow'
  },
  
  // Atmosphere
  701: {
    day: '🌫️',
    night: '🌫️',
    description: 'mist'
  },
  711: {
    day: '🌫️',
    night: '🌫️',
    description: 'smoke'
  },
  721: {
    day: '🌫️',
    night: '🌫️',
    description: 'haze'
  },
  731: {
    day: '🌫️',
    night: '🌫️',
    description: 'sand/dust whirls'
  },
  741: {
    day: '🌫️',
    night: '🌫️',
    description: 'fog'
  },
  751: {
    day: '🌫️',
    night: '🌫️',
    description: 'sand'
  },
  761: {
    day: '🌫️',
    night: '🌫️',
    description: 'dust'
  },
  762: {
    day: '🌫️',
    night: '🌫️',
    description: 'volcanic ash'
  },
  771: {
    day: '💨',
    night: '💨',
    description: 'squalls'
  },
  781: {
    day: '🌪️',
    night: '🌪️',
    description: 'tornado'
  }
};

// Get weather icon based on weather code and time of day
export function getWeatherIcon(weatherCode, isDay = true) {
  const weather = weatherIcons[weatherCode];
  if (!weather) {
    return '🌤️'; // Default icon
  }
  
  // Use day icon for day, night icon for night
  return isDay ? weather.day : weather.night;
}

// Get weather description
export function getWeatherDescription(weatherCode) {
  const weather = weatherIcons[weatherCode];
  return weather ? weather.description : 'unknown';
}

// Enhanced weather icon with better visual representation
export function getEnhancedWeatherIcon(weatherCode, isDay = true, temperature = null) {
  const baseIcon = getWeatherIcon(weatherCode, isDay);
  
  // Add temperature-based enhancements
  if (temperature !== null) {
    if (temperature < 0) {
      // Cold weather enhancements
      if (weatherCode >= 200 && weatherCode < 600) {
        return '🌨️'; // Snow for cold rain
      }
    } else if (temperature > 30) {
      // Hot weather enhancements
      if (weatherCode === 800) {
        return '🔥'; // Hot sun
      }
    }
  }
  
  return baseIcon;
}

// Get weather icon for specific time periods
export function getTimeBasedWeatherIcon(weatherCode, hour) {
  const isDay = hour >= 6 && hour <= 18;
  return getWeatherIcon(weatherCode, isDay);
}

// Get weather icon with intensity
export function getIntensityWeatherIcon(weatherCode, intensity = 'normal') {
  const baseIcon = getWeatherIcon(weatherCode, true);
  
  switch (intensity) {
    case 'light':
      return baseIcon + '💧';
    case 'moderate':
      return baseIcon + '💧💧';
    case 'heavy':
      return baseIcon + '💧💧💧';
    default:
      return baseIcon;
  }
}
