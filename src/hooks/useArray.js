import { useState, useCallback } from 'react';

/**
 * Hook for managing array state with common operations
 * @param {Array} initialArray - Initial array value
 * @returns {Object} Array state and manipulation functions
 */
export const useArray = (initialArray = []) => {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((item) => {
    setArray(prev => [...prev, item]);
  }, []);

  const remove = useCallback((index) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removeById = useCallback((id) => {
    setArray(prev => prev.filter(item => item.id !== id));
  }, []);

  const update = useCallback((index, newItem) => {
    setArray(prev => prev.map((item, i) => i === index ? newItem : item));
  }, []);

  const updateById = useCallback((id, updater) => {
    setArray(prev => prev.map(item => 
      item.id === id ? (typeof updater === 'function' ? updater(item) : updater) : item
    ));
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const reset = useCallback(() => {
    setArray(initialArray);
  }, [initialArray]);

  return {
    array,
    setArray,
    push,
    remove,
    removeById,
    update,
    updateById,
    clear,
    reset
  };
};

