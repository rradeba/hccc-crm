import { useState } from 'react';

/**
 * Hook for managing modal state
 * @returns {Object} Modal state and control functions
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType('');
    setEditingItem(null);
  };

  return {
    isOpen,
    modalType,
    editingItem,
    openModal,
    closeModal,
    setIsOpen,
    setModalType,
    setEditingItem
  };
};






