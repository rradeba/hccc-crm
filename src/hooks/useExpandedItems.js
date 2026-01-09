import { useState, useCallback } from 'react';

/**
 * Hook for managing expanded/collapsed items (leads, customers, etc.)
 * @param {Array} initialItems - Initial array of item IDs
 * @returns {Object} Expanded state and control functions
 */
export const useExpandedItems = (initialItems = []) => {
  const [expandedItems, setExpandedItems] = useState(new Set(initialItems));

  const toggleItem = useCallback((id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const expandItem = useCallback((id) => {
    setExpandedItems(prev => new Set([...prev, id]));
  }, []);

  const collapseItem = useCallback((id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const expandAll = useCallback((ids) => {
    setExpandedItems(new Set(ids));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  const isExpanded = useCallback((id) => {
    return expandedItems.has(id);
  }, [expandedItems]);

  return {
    expandedItems,
    toggleItem,
    expandItem,
    collapseItem,
    expandAll,
    collapseAll,
    isExpanded,
    setExpandedItems
  };
};

