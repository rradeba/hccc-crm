/**
 * City/Location search service
 * Uses embedded database - no network required
 */

import US_CITIES from './usCities';

const cityService = {
  search: async (query) => {
    if (!query || query.length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    // Search the local database
    const results = US_CITIES
      .filter(city => {
        const cityLower = city.name.toLowerCase();
        const stateLower = city.state.toLowerCase();
        const combined = `${cityLower}, ${stateLower}`;

        return cityLower.includes(searchTerm) ||
               stateLower.includes(searchTerm) ||
               combined.includes(searchTerm) ||
               cityLower.startsWith(searchTerm);
      })
      // Sort by best match (starts with query first)
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(searchTerm);
        const bStarts = b.name.toLowerCase().startsWith(searchTerm);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 15)
      .map(city => ({
        name: city.name,
        state: city.state,
        county: city.county || ''
      }));

    return results;
  },

  // Kept for compatibility
  searchTeleport: async (query) => {
    return cityService.search(query);
  }
};

export default cityService;
