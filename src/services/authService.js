import api from './api';

/**
 * Service to execute Authentication tasks against the backend API.
 * Unwraps Axios response payloads to return server JSON data directly.
 */
const authService = {
  /**
   * Registers a new user account.
   * 
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Response data containing user profile and token
   */
  async register(name, email, password) {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Authenticates user credentials.
   * 
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Response data containing user profile and token
   */
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Logs out the user by deleting the local storage JWT credential.
   * Stateless server logout.
   */
  logout() {
    localStorage.removeItem('crm-token');
  },

  /**
   * Retrieves the currently logged-in user profile details.
   * 
   * @returns {Promise<Object>} Response data containing user object
   */
  async getProfile() {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Updates user profile fields (e.g. name, password).
   * 
   * @param {Object} data - Update payload containing name, oldPassword, newPassword
   * @returns {Promise<Object>} Response data containing updated user details
   */
  async updateProfile(data) {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};

export default authService;
