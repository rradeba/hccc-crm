import { useState, useEffect } from 'react';
import { weatherService } from '../services';

/**
 * Hook for fetching weather data based on address
 * @param {string} address - Address string containing zip code
 * @returns {Object} Weather data and loading/error states
 */
export const useWeather = (address) => {
  const [weather, setWeather] = useState({ 
    temperature: null, 
    description: '', 
    icon: '', 
    location: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) {
      setWeather({ temperature: null, description: '', icon: '', location: '' });
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const weatherData = await weatherService.getWeatherByAddress(address);
        
        if (!cancelled) {
          setWeather(weatherData);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Weather unavailable');
          setWeather(prev => ({ ...prev, temperature: null, description: '', icon: '' }));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [address]);

  return { weather, isLoading, error };
};

