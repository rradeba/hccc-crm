import api from './api';

/**
 * Leads service
 */
export const leadsService = {
  /**
   * Get all leads with optional filtering
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status
   * @param {string} params.source - Filter by source
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @returns {Promise<Object>} Leads data with pagination
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/leads?${queryString}` : '/leads';
    return await api.get(endpoint);
  },

  /**
   * Get a specific lead by ID
   * @param {string} leadId - Lead ID
   * @returns {Promise<Object>} Lead data
   */
  getById: async (leadId) => {
    return await api.get(`/leads/${leadId}`);
  },

  /**
   * Create a new lead
   * @param {Object} leadData - Lead data
   * @returns {Promise<Object>} Created lead data
   */
  create: async (leadData) => {
    return await api.post('/leads', leadData);
  },

  /**
   * Update an existing lead
   * @param {string} leadId - Lead ID
   * @param {Object} leadData - Updated lead data
   * @returns {Promise<Object>} Updated lead data
   */
  update: async (leadId, leadData) => {
    return await api.put(`/leads/${leadId}`, leadData);
  },

  /**
   * Delete a lead
   * @param {string} leadId - Lead ID
   * @returns {Promise<Object>} Success message
   */
  delete: async (leadId) => {
    return await api.delete(`/leads/${leadId}`);
  },
};

export default leadsService;

