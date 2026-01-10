/**
 * Base API client configuration
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

/**
 * Get refresh token from localStorage
 */
const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

/**
 * Set authentication tokens in localStorage
 */
export const setAuthTokens = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
};

/**
 * Clear authentication tokens from localStorage
 */
export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

/**
 * Base fetch wrapper with authentication and error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  // Add body if provided
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && getRefreshToken()) {
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        });

        if (refreshResponse.ok) {
          const { access_token } = await refreshResponse.json();
          setAuthTokens(access_token);
          
          // Retry original request with new token
          config.headers.Authorization = `Bearer ${access_token}`;
          const retryResponse = await fetch(url, config);
          return handleResponse(retryResponse);
        } else {
          // Refresh failed, clear tokens and redirect to login
          clearAuthTokens();
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
      } catch (refreshError) {
        clearAuthTokens();
        window.location.href = '/login';
        throw refreshError;
      }
    }

    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let errorData = null;

    try {
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        errorMessage = await response.text() || errorMessage;
      }
    } catch (e) {
      // If parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  // Handle empty responses
  if (response.status === 204 || response.status === 201 && !contentType) {
    return null;
  }

  // Parse JSON response
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  // Return text response
  return await response.text();
};

/**
 * API request methods
 */
export const api = {
  get: (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'GET' });
  },

  post: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  },

  put: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  },

  patch: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: data,
    });
  },

  delete: (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'DELETE' });
  },
};

export default api;


