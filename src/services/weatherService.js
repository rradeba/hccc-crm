/**
 * Weather service for external weather API calls
 */

const WEATHER_API_BASE = 'https://api.open-meteo.com/v1';
const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1';

const weatherCodeMap = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌧️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
};

/**
 * Extract zip code from address string
 * @param {string} address - Address string
 * @returns {string|null} Zip code or null
 */
const extractZipFromAddress = (address) => {
  const match = String(address || '').match(/\b\d{5}\b/);
  return match ? match[0] : null;
};

/**
 * Weather service
 */
export const weatherService = {
  /**
   * Get weather data for an address
   * @param {string} address - Address containing zip code
   * @returns {Promise<Object>} Weather data
   */
  getWeatherByAddress: async (address) => {
    const zip = extractZipFromAddress(address);
    if (!zip) {
      throw new Error('No zip code found in address');
    }

    // Get coordinates from zip code
    const geoResponse = await fetch(
      `${GEOCODING_API_BASE}/search?name=${zip}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData?.results?.length) {
      throw new Error('Location not found');
    }

    const { latitude, longitude, name, admin1 } = geoData.results[0];

    // Get weather data
    const weatherResponse = await fetch(
      `${WEATHER_API_BASE}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
    );
    const weatherData = await weatherResponse.json();

    const temperature = weatherData?.current?.temperature_2m ?? null;
    const code = weatherData?.current?.weather_code ?? 0;
    const meta = weatherCodeMap[code] || { label: 'Conditions', icon: '🌤️' };

    return {
      temperature: temperature != null ? Math.round(temperature) : null,
      description: meta.label,
      icon: meta.icon,
      location: name ? `${name}${admin1 ? `, ${admin1}` : ''}` : '',
    };
  },
};

export default weatherService;








