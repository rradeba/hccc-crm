/**
 * City search service
 */

import { api } from './api';

const cityService = {
  /**
   * Search for cities
   * @param {string} query - Search query (city name)
   * @returns {Promise<Array>} Array of city objects with name and state
   */
  search: async (query) => {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const endpoint = `/utilities/cities/search?q=${encodeURIComponent(query)}`;
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const fullUrl = `${API_BASE_URL}${endpoint}`;
      console.log('Searching cities:', {
        endpoint,
        fullUrl,
        query
      });
      
      const response = await api.get(endpoint);
      console.log('City search response:', response);
      return response.cities || [];
    } catch (error) {
      console.error('City search error:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        data: error.data,
        stack: error.stack
      });
      
      // Check if backend might be down
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      console.warn(`Backend API URL: ${API_BASE_URL}`);
      console.warn('If "Failed to fetch", ensure backend server is running and accessible');
      
      // Return empty array instead of throwing to prevent UI errors
      return [];
    }
  },
};

export default cityService;

