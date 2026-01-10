import api from './api';

/**
 * AI service
 */
export const aiService = {
  /**
   * Send a chat message to AI
   * @param {Object} chatData - Chat data
   * @param {string} chatData.prompt - User prompt
   * @param {Object} chatData.context - Optional context data
   * @returns {Promise<Object>} AI response
   */
  chat: async (chatData) => {
    return await api.post('/ai/chat', chatData);
  },

  /**
   * Generate an estimate using AI
   * @param {Object} estimateData - Estimate generation data
   * @returns {Promise<Object>} Generated estimate
   */
  generateEstimate: async (estimateData) => {
    return await api.post('/ai/generate-estimate', estimateData);
  },
};

export default aiService;


