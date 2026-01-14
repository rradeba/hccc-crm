import { useState, useCallback } from 'react';

/**
 * Hook for managing collapsible section state
 * @param {boolean} initialCollapsed - Initial collapsed state
 * @returns {Object} Collapsed state and toggle function
 */
export const useCollapsible = (initialCollapsed = true) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggle = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const expand = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const collapse = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  return {
    isCollapsed,
    toggle,
    expand,
    collapse,
    setIsCollapsed
  };
};






