import { useState, useCallback } from 'react';

/**
 * Hook for managing boolean toggle state
 * @param {boolean} initialValue - Initial boolean value
 * @returns {Array} [value, toggle, setValue]
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setValue, setTrue, setFalse];
};


