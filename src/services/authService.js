import api, { setAuthTokens, clearAuthTokens } from './api';

/**
 * Authentication service
 */
export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.first_name - User first name
   * @param {string} userData.last_name - User last name
   * @returns {Promise<Object>} User data and tokens
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.access_token && response.refresh_token) {
      setAuthTokens(response.access_token, response.refresh_token);
    }
    return response;
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} User data and tokens
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.access_token && response.refresh_token) {
      setAuthTokens(response.access_token, response.refresh_token);
    }
    return response;
  },

  /**
   * Logout user
   */
  logout: () => {
    clearAuthTokens();
  },

  /**
   * Refresh access token
   * @returns {Promise<Object>} New access token
   */
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    if (response.access_token) {
      setAuthTokens(response.access_token);
    }
    return response;
  },

  /**
   * Get current user information
   * @returns {Promise<Object>} Current user data
   */
  getCurrentUser: async () => {
    return await api.get('/auth/me');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if access token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};

export default authService;






