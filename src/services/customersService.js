import api from './api';

/**
 * Customers service
 */
export const customersService = {
  /**
   * Get all customers with optional filtering
   * @param {Object} params - Query parameters
   * @param {string} params.source - Filter by source
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @returns {Promise<Object>} Customers data with pagination
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/customers?${queryString}` : '/customers';
    return await api.get(endpoint);
  },

  /**
   * Get a specific customer by ID
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Customer data
   */
  getById: async (customerId) => {
    return await api.get(`/customers/${customerId}`);
  },

  /**
   * Create a new customer
   * @param {Object} customerData - Customer data
   * @returns {Promise<Object>} Created customer data
   */
  create: async (customerData) => {
    return await api.post('/customers', customerData);
  },

  /**
   * Update an existing customer
   * @param {string} customerId - Customer ID
   * @param {Object} customerData - Updated customer data
   * @returns {Promise<Object>} Updated customer data
   */
  update: async (customerId, customerData) => {
    return await api.put(`/customers/${customerId}`, customerData);
  },

  /**
   * Delete a customer
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Success message
   */
  delete: async (customerId) => {
    return await api.delete(`/customers/${customerId}`);
  },
};

export default customersService;


