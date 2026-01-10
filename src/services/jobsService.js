import api from './api';

/**
 * Jobs service
 */
export const jobsService = {
  /**
   * Get all jobs with optional filtering
   * @param {Object} params - Query parameters
   * @param {string} params.customer_id - Filter by customer ID
   * @param {string} params.status - Filter by status
   * @param {string} params.date_from - Filter by start date (ISO format)
   * @param {string} params.date_to - Filter by end date (ISO format)
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @returns {Promise<Object>} Jobs data with pagination
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';
    return await api.get(endpoint);
  },

  /**
   * Get a specific job by ID
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Job data
   */
  getById: async (jobId) => {
    return await api.get(`/jobs/${jobId}`);
  },

  /**
   * Create a new job
   * @param {Object} jobData - Job data
   * @returns {Promise<Object>} Created job data
   */
  create: async (jobData) => {
    return await api.post('/jobs', jobData);
  },

  /**
   * Update an existing job
   * @param {string} jobId - Job ID
   * @param {Object} jobData - Updated job data
   * @returns {Promise<Object>} Updated job data
   */
  update: async (jobId, jobData) => {
    return await api.put(`/jobs/${jobId}`, jobData);
  },

  /**
   * Delete a job
   * @param {string} jobId - Job ID
   * @returns {Promise<Object>} Success message
   */
  delete: async (jobId) => {
    return await api.delete(`/jobs/${jobId}`);
  },
};

export default jobsService;


