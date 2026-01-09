import { useEffect, useRef } from 'react';

/**
 * Hook for detecting clicks outside an element
 * @param {Function} handler - Callback function when click outside occurs
 * @param {boolean} isEnabled - Whether the listener should be active
 * @returns {Object} Ref to attach to the element
 */
export const useClickOutside = (handler, isEnabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, isEnabled]);

  return ref;
};

