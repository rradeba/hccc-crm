import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook for managing dropdown state
 * @param {string|number|null} initialOpenId - Initial open dropdown ID
 * @returns {Object} Dropdown state and control functions
 */
export const useDropdown = (initialOpenId = null) => {
  const [openId, setOpenId] = useState(initialOpenId);

  const toggle = useCallback((id) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);

  const open = useCallback((id) => {
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
  }, []);

  const isOpen = useCallback((id) => {
    return openId === id;
  }, [openId]);

  return {
    openId,
    toggle,
    open,
    close,
    isOpen,
    setOpenId
  };
};

/**
 * Hook for managing multiple dropdowns
 * @returns {Object} Dropdown state and control functions
 */
export const useMultipleDropdowns = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggle = useCallback((id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const open = useCallback((id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: true
    }));
  }, []);

  const close = useCallback((id) => {
    setOpenDropdowns(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, []);

  const closeAll = useCallback(() => {
    setOpenDropdowns({});
  }, []);

  const isOpen = useCallback((id) => {
    return !!openDropdowns[id];
  }, [openDropdowns]);

  return {
    openDropdowns,
    toggle,
    open,
    close,
    closeAll,
    isOpen,
    setOpenDropdowns
  };
};






