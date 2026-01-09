import { useState, useCallback, useMemo } from 'react';

/**
 * Hook for managing search functionality
 * @param {Array} items - Array of items to search
 * @param {Function} searchFn - Custom search function (optional)
 * @returns {Object} Search state and filtered results
 */
export const useSearch = (items = [], searchFn = null) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    if (searchFn) {
      return searchFn(items, searchTerm);
    }

    // Default search: case-insensitive string matching
    const term = searchTerm.toLowerCase();
    return items.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(term);
      }
      if (typeof item === 'object') {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(term)
        );
      }
      return false;
    });
  }, [items, searchTerm, searchFn]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    clearSearch
  };
};

